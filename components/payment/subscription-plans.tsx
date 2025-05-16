"use client"

import { useState } from "react"
import { useAuth } from "../auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select"
import { Badge } from "../ui/badge"
import { Check, AlertCircle, CheckCircle2, Sparkles } from "lucide-react"
import { PaymentService } from "../../lib/services/payment-service"
import { formatCurrency } from "../../lib/utils"

export function SubscriptionPlans() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [userSubscriptions, setUserSubscriptions] = useState<any[]>([])

  const subscriptionPlans = PaymentService.getSubscriptionPlans()

  // Load payment methods and active subscriptions when component mounts
  const loadUserData = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      const [methods, subs] = await Promise.all([
        PaymentService.getUserPaymentMethods(user.id),
        PaymentService.getUserSubscriptions(user.id)
      ])
      
      setPaymentMethods(methods)
      setUserSubscriptions(subs)
      
      // Set default payment method if available
      const defaultMethod = methods.find(m => m.isDefault)
      if (defaultMethod) {
        setSelectedPaymentMethod(defaultMethod.id)
      } else if (methods.length > 0) {
        setSelectedPaymentMethod(methods[0].id)
      }
    } catch (err) {
      setError("Failed to load payment methods and subscriptions.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle subscribe button click
  const handleSubscribe = async () => {
    if (!user || !selectedPlan || !selectedPaymentMethod) {
      setError("Please select a plan and payment method.")
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      await PaymentService.subscribeToPlan(
        user.id,
        selectedPlan,
        selectedPaymentMethod
      )
      
      setSuccess(true)
    } catch (err) {
      setError("Failed to complete subscription. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Check if user has an active subscription
  const hasActiveSubscription = () => {
    return userSubscriptions.some(sub => sub.status === 'active');
  }

  // Get active subscription plan ID
  const getActiveSubscriptionPlanId = () => {
    const activeSub = userSubscriptions.find(sub => sub.status === 'active');
    return activeSub ? activeSub.planId : null;
  }

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          Please sign in to view and manage subscription plans.
        </AlertDescription>
      </Alert>
    )
  }

  if (success) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Subscription Successful!</AlertTitle>
        <AlertDescription className="text-green-700">
          Your subscription is now active. Enjoy premium access to all content!
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Choose Your Subscription</h1>
        <p className="text-muted-foreground">
          Get unlimited access to premium webtoons and exclusive features
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Check for active subscriptions */}
      {hasActiveSubscription() && !isLoading && (
        <Alert className="mb-6">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Active Subscription</AlertTitle>
          <AlertDescription>
            You already have an active subscription. You can manage your subscription in the account settings.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map(plan => {
          const isActive = plan.id === getActiveSubscriptionPlanId();
          const isSelected = plan.id === selectedPlan;
          
          return (
            <Card 
              key={plan.id}
              className={`
                ${isActive ? 'border-green-400 bg-green-50' : ''}
                ${isSelected && !isActive ? 'border-primary bg-primary/5' : ''}
                ${!isActive && !hasActiveSubscription() ? 'cursor-pointer hover:border-primary' : ''}
              `}
              onClick={() => {
                if (!isActive && !hasActiveSubscription()) {
                  setSelectedPlan(plan.id);
                }
              }}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.isPopular && (
                    <Badge variant="secondary" className="bg-primary/20">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {isActive && (
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      <Check className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  {formatCurrency(plan.price, plan.currency)} per month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isActive ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : hasActiveSubscription() ? (
                  <Button variant="outline" className="w-full" disabled>
                    Change Plan
                  </Button>
                ) : (
                  <Button 
                    variant={isSelected ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {selectedPlan && !hasActiveSubscription() && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Complete Your Subscription</CardTitle>
            <CardDescription>
              Choose a payment method to start your subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                {paymentMethods.length === 0 ? (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">No payment methods available</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={loadUserData}
                    >
                      Add Payment Method
                    </Button>
                  </div>
                ) : (
                  <Select 
                    value={selectedPaymentMethod} 
                    onValueChange={setSelectedPaymentMethod}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map(method => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.details.nickname}
                          {method.isDefault && " (Default)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Subscription Details</h3>
                <p className="text-sm text-muted-foreground">
                  You will be charged {formatCurrency(
                    subscriptionPlans.find(p => p.id === selectedPlan)?.price || 0,
                    'USD'
                  )} monthly. You can cancel anytime.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleSubscribe}
              disabled={isLoading || !selectedPaymentMethod}
            >
              {isLoading ? "Processing..." : "Start Subscription"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  )
} 