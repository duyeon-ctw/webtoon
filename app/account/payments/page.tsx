"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentManagement } from "@/components/payment/payment-management"
import { CoinPurchase } from "@/components/payment/coin-purchase"
import { SubscriptionPlans } from "@/components/payment/subscription-plans"

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("payment-methods")

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Payments & Subscriptions</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full border-b bg-transparent p-0">
          <div className="flex overflow-x-auto">
            <TabsTrigger 
              value="payment-methods" 
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent"
            >
              Payment Methods
            </TabsTrigger>
            <TabsTrigger 
              value="coins" 
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent"
            >
              Purchase Coins
            </TabsTrigger>
            <TabsTrigger 
              value="subscriptions" 
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent"
            >
              Subscription Plans
            </TabsTrigger>
          </div>
        </TabsList>
        
        <TabsContent value="payment-methods" className="border-none p-0 pt-4">
          <PaymentManagement />
        </TabsContent>
        
        <TabsContent value="coins" className="border-none p-0 pt-4">
          <CoinPurchase />
        </TabsContent>
        
        <TabsContent value="subscriptions" className="border-none p-0 pt-4">
          <SubscriptionPlans />
        </TabsContent>
      </Tabs>
    </div>
  )
} 