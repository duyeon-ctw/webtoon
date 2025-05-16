"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  PlusCircle, 
  Trash2, 
  Clock, 
  Star, 
  CreditCardIcon, 
  Receipt
} from "lucide-react"
import { PaymentService, PaymentMethod, Transaction, Subscription } from "@/lib/services/payment-service"
import { formatCurrency, formatDate } from "@/lib/utils"

export function PaymentManagement() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("payment-methods")
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchPaymentData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [methods, txs, subs] = await Promise.all([
          PaymentService.getUserPaymentMethods(user.id),
          PaymentService.getUserTransactions(user.id),
          PaymentService.getUserSubscriptions(user.id)
        ])
        
        setPaymentMethods(methods)
        setTransactions(txs)
        setSubscriptions(subs)
      } catch (err) {
        setError("Failed to load payment information. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPaymentData()
  }, [user])

  const handleSetDefaultPaymentMethod = async (methodId: string) => {
    if (!user) return
    
    try {
      const updatedMethods = await PaymentService.setDefaultPaymentMethod(user.id, methodId)
      setPaymentMethods(updatedMethods)
    } catch (err) {
      setError("Failed to update default payment method.")
      console.error(err)
    }
  }

  const handleDeletePaymentMethod = async (methodId: string) => {
    if (!user) return
    
    try {
      await PaymentService.deletePaymentMethod(user.id, methodId)
      setPaymentMethods(prevMethods => prevMethods.filter(m => m.id !== methodId))
    } catch (err) {
      setError("Failed to delete payment method.")
      console.error(err)
    }
  }

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!user) return
    
    try {
      const updatedSubscription = await PaymentService.cancelSubscription(user.id, subscriptionId)
      setSubscriptions(prevSubs => 
        prevSubs.map(s => s.id === subscriptionId ? updatedSubscription : s)
      )
    } catch (err) {
      setError("Failed to cancel subscription.")
      console.error(err)
    }
  }

  // Helper function to render payment method details
  const renderPaymentMethodDetails = (method: PaymentMethod) => {
    switch (method.type) {
      case 'credit_card':
        return (
          <div className="flex items-center">
            <CreditCardIcon className="h-5 w-5 mr-2" />
            <span>
              {method.details.cardType} •••• {method.details.lastFour}
              {method.details.expiryDate && ` (Expires: ${method.details.expiryDate})`}
            </span>
          </div>
        )
      case 'paypal':
        return (
          <div className="flex items-center">
            {/* You could use a PayPal icon here */}
            <span className="h-5 w-5 mr-2 font-bold text-blue-600">P</span>
            <span>PayPal - {method.details.accountEmail}</span>
          </div>
        )
      default:
        return <div>{method.details.nickname}</div>
    }
  }

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          Please sign in to manage your payment methods and subscriptions.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Payment & Subscription Management</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        {/* Payment Methods Tab */}
        <TabsContent value="payment-methods" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Payment Methods</h2>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading payment methods...</div>
          ) : paymentMethods.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CreditCard className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">You don't have any payment methods yet.</p>
                  <Button className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Your First Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <Card key={method.id}>
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-medium">
                        {method.details.nickname}
                        {method.isDefault && (
                          <Badge variant="secondary" className="ml-2">Default</Badge>
                        )}
                      </CardTitle>
                      <div className="text-xs text-muted-foreground">
                        Added on {formatDate(method.createdAt)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    {renderPaymentMethodDetails(method)}
                  </CardContent>
                  <CardFooter className="py-3 flex justify-end space-x-2">
                    {!method.isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetDefaultPaymentMethod(method.id)}
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Set as Default
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => handleDeletePaymentMethod(method.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <h2 className="text-xl font-semibold">Transaction History</h2>

          {isLoading ? (
            <div className="text-center py-8">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Receipt className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">You don't have any transactions yet.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-medium">
                        {transaction.description}
                      </CardTitle>
                      <Badge 
                        variant={
                          transaction.status === 'completed' ? 'default' : 
                          transaction.status === 'pending' ? 'outline' : 
                          transaction.status === 'refunded' ? 'secondary' : 
                          'destructive'
                        }
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>
                      {formatDate(transaction.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Amount</div>
                        <div className="font-medium">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Payment Method</div>
                        <div className="font-medium">
                          {paymentMethods.find(m => m.id === transaction.paymentMethodId)?.details.nickname || 'Unknown'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Transaction ID</div>
                        <div className="font-medium text-xs">{transaction.id}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Subscriptions</h2>
            {subscriptions.length === 0 || !subscriptions.some(s => s.status === 'active') ? (
              <Button>
                View Subscription Plans
              </Button>
            ) : null}
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading subscriptions...</div>
          ) : subscriptions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <AlertCircle className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">You don't have any subscriptions yet.</p>
                  <p className="text-muted-foreground mb-4">Subscribe to get premium features and content.</p>
                  <Button>View Subscription Plans</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id}>
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-medium">
                        {subscription.planName}
                      </CardTitle>
                      <Badge 
                        variant={
                          subscription.status === 'active' ? 'default' : 
                          subscription.status === 'canceled' ? 'destructive' : 
                          subscription.status === 'paused' ? 'outline' : 
                          'secondary'
                        }
                      >
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>
                      {formatCurrency(subscription.amount, subscription.currency)} per month
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Billing period:</span>
                        <span>
                          {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Payment method:</span>
                        <span>
                          {paymentMethods.find(m => m.id === subscription.paymentMethodId)?.details.nickname || 'Unknown'}
                        </span>
                      </div>
                      {subscription.cancelAtPeriodEnd && (
                        <div className="flex items-center mt-2 text-amber-600 text-sm">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Your subscription will end on {formatDate(subscription.currentPeriodEnd)}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="py-3">
                    {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
                      <Button 
                        variant="outline" 
                        className="text-destructive"
                        onClick={() => handleCancelSubscription(subscription.id)}
                      >
                        Cancel Subscription
                      </Button>
                    )}
                    {subscription.status === 'active' && subscription.cancelAtPeriodEnd && (
                      <Button variant="outline">
                        Resume Subscription
                      </Button>
                    )}
                    {subscription.status === 'canceled' && (
                      <Button>
                        Resubscribe
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 