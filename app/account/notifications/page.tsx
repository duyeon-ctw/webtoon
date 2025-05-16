"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationSettings } from "@/components/notifications/notification-settings"
import { NotificationList } from "@/components/notifications/notification-list"
import { Bell, Settings } from "lucide-react"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("notifications")

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full sm:w-auto border-b bg-transparent p-0">
          <div className="flex overflow-x-auto">
            <TabsTrigger 
              value="notifications" 
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent"
            >
              <Settings className="h-4 w-4 mr-2" />
              Notification Settings
            </TabsTrigger>
          </div>
        </TabsList>
        
        <TabsContent value="notifications" className="border-none p-0 pt-4">
          <NotificationList />
        </TabsContent>
        
        <TabsContent value="settings" className="border-none p-0 pt-4">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
} 