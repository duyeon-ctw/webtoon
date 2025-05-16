"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Coins, AlertCircle, CheckCircle2, Sparkles, Tag } from "lucide-react"
import { PaymentService, CoinPackage } from "@/lib/services/payment-service"
import { formatCurrency } from "@/lib/utils"

export function CoinPurchase() {
  const { user } = useAuth()
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [promoCode, setPromoCode] = useState("")
  const [promoCodeStatus, setPromoCodeStatus] = useState<{
    valid: boolean;
    message?: string;
    discount?: number;
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const coinPackages = PaymentService.getCoinPackages()

  // Load payment methods when user is logged in
  const loadPaymentMethods = async () => {
    if (!user) return
    
    try {
      const methods = await PaymentService.getUserPaymentMethods(user.id)
      setPaymentMethods(methods)
      
      // Set default payment method if available
      const defaultMethod = methods.find(m => m.isDefault)
      if (defaultMethod) {
        setSelectedPaymentMethod(defaultMethod.id)
      } else if (methods.length > 0) {
        setSelectedPaymentMethod(methods[0].id)
      }
    } catch (err) {
      setError("Failed to load payment methods.")
      console.error(err)
    }
  }

  // Check promo code validity
  const checkPromoCode = async () => {
    if (!promoCode.trim()) return
    
    try {
      const result = await PaymentService.validatePromoCode(promoCode)
      setPromoCodeStatus(result)
    } catch (err) {
      setPromoCodeStatus({
        valid: false,
        message: "Error validating promo code. Please try again."
      })
      console.error(err)
    }
  }

  // Handle purchase submission
  const handlePurchase = async () => {
    if (!user || !selectedPackage || !selectedPaymentMethod) {
      setError("Please select a coin package and payment method.")
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      await PaymentService.purchaseCoins(
        user.id,
        selectedPackage.id,
        selectedPaymentMethod,
        promoCodeStatus?.valid ? promoCode : undefined
      )
      
      setSuccess(true)
      // In a real app, you would update the user's coin balance here
    } catch (err) {
      setError("Failed to complete purchase. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate discounted price if promo code is applied
  const calculateFinalPrice = (price: number): number => {
    if (promoCodeStatus?.valid && promoCodeStatus.discount) {
      return price * (1 - promoCodeStatus.discount)
    }
    return price
  }

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          Please sign in to purchase coins.
        </AlertDescription>
      </Alert>
    )
  }

  if (success) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Purchase Successful!</AlertTitle>
        <AlertDescription className="text-green-700">
          Your coin purchase was successful. The coins have been added to your account.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Purchase Coins</h1>
        <p className="text-muted-foreground">
          Buy coins to unlock premium episodes and support your favorite creators
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coinPackages.map(pkg => (
          <Card 
            key={pkg.id}
            className={`cursor-pointer hover:border-primary transition-colors ${
              selectedPackage?.id === pkg.id ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                {pkg.isPopular && (
                  <Badge variant="secondary" className="bg-primary/20">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex items-center justify-center mb-2">
                <Coins className="h-6 w-6 text-amber-500 mr-2" />
                <span className="text-2xl font-bold">{pkg.coins}</span>
                {pkg.bonusCoins && (
                  <Badge variant="outline" className="ml-2 bg-amber-50">
                    +{pkg.bonusCoins} Bonus
                  </Badge>
                )}
              </div>
              <div className="text-center text-xl font-medium">
                {formatCurrency(pkg.price, pkg.currency)}
              </div>
              {pkg.bonusCoins && (
                <div className="text-center text-xs text-muted-foreground mt-1">
                  {formatCurrency(pkg.price / (pkg.coins + pkg.bonusCoins), pkg.currency)} per coin
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                variant={selectedPackage?.id === pkg.id ? "default" : "outline"} 
                className="w-full"
                onClick={() => setSelectedPackage(pkg)}
              >
                {selectedPackage?.id === pkg.id ? "Selected" : "Select"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPackage && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="font-medium">Selected Package</div>
              <div className="flex items-center">
                <Coins className="h-5 w-5 text-amber-500 mr-2" />
                <span className="font-medium">{selectedPackage.name}:</span>
                <span className="ml-2">{selectedPackage.coins} coins</span>
                {selectedPackage.bonusCoins && (
                  <Badge variant="outline" className="ml-2 bg-amber-50">
                    +{selectedPackage.bonusCoins} Bonus
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="font-medium">Payment Method</div>
              {paymentMethods.length === 0 ? (
                <div className="flex justify-between items-center">
                  <div className="text-muted-foreground">No payment methods available</div>
                  <Dialog onOpenChange={() => loadPaymentMethods()}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>
                          Add a new payment method to your account.
                        </DialogDescription>
                      </DialogHeader>
                      {/* Payment method form would go here */}
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button>Add Payment Method</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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

            <Separator />

            <div className="space-y-2">
              <div className="font-medium">Promo Code</div>
              <div className="flex space-x-2">
                <Input 
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value)
                    setPromoCodeStatus(null)
                  }}
                  placeholder="Enter promo code"
                />
                <Button 
                  variant="outline" 
                  onClick={checkPromoCode}
                  disabled={!promoCode.trim()}
                >
                  Apply
                </Button>
              </div>
              {promoCodeStatus && (
                <div className={`text-sm ${promoCodeStatus.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {promoCodeStatus.message}
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="font-medium">Order Summary</div>
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>{formatCurrency(selectedPackage.price, selectedPackage.currency)}</span>
              </div>
              
              {promoCodeStatus?.valid && (
                <div className="flex justify-between items-center text-green-600">
                  <span className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Discount ({promoCodeStatus.discount && (promoCodeStatus.discount * 100)}%)
                  </span>
                  <span>-{formatCurrency(
                    selectedPackage.price * (promoCodeStatus.discount || 0),
                    selectedPackage.currency
                  )}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center font-bold text-lg pt-1">
                <span>Total</span>
                <span>{formatCurrency(
                  calculateFinalPrice(selectedPackage.price),
                  selectedPackage.currency
                )}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handlePurchase}
              disabled={
                isSubmitting || 
                !selectedPackage || 
                !selectedPaymentMethod
              }
            >
              {isSubmitting 
                ? "Processing..." 
                : `Complete Purchase (${formatCurrency(
                    calculateFinalPrice(selectedPackage.price),
                    selectedPackage.currency
                  )})`
              }
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Need help? Contact our support team at support@webtoonapp.com</p>
      </div>
    </div>
  )
} 