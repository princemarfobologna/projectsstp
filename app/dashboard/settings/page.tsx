"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  CreditCard,
  Bell,
  Plug,
  Users,
  FileText,
  Globe,
} from "lucide-react"
import { GeneralSettings } from "@/components/settings/general-settings"
import { TariffSettings } from "@/components/settings/tariff-settings"
import { PaymentSettings } from "@/components/settings/payment-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { OcppSettings } from "@/components/settings/ocpp-settings"
import { RolesSettings } from "@/components/settings/roles-settings"
import { ReportsSettings } from "@/components/settings/reports-settings"
import { LocalizationSettings } from "@/components/settings/localization-settings"

const tabs = [
  { value: "general", label: "General", icon: Building2 },
  { value: "tariffs", label: "Tariffs", icon: CreditCard },
  { value: "payment", label: "Payment", icon: CreditCard },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "ocpp", label: "OCPP", icon: Plug },
  { value: "roles", label: "Roles & Access", icon: Users },
  { value: "reports", label: "Reports", icon: FileText },
  { value: "localization", label: "Localization", icon: Globe },
]

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "general"
  const [activeTab, setActiveTab] = useState(initialTab)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your platform configuration and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-6">
        <TabsList className="h-auto w-full justify-start gap-1 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="gap-2 rounded-lg border border-transparent px-4 py-2 data-[state=active]:border-border data-[state=active]:bg-card"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general" className="mt-0">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="tariffs" className="mt-0">
          <TariffSettings />
        </TabsContent>

        <TabsContent value="payment" className="mt-0">
          <PaymentSettings />
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="ocpp" className="mt-0">
          <OcppSettings />
        </TabsContent>

        <TabsContent value="roles" className="mt-0">
          <RolesSettings />
        </TabsContent>

        <TabsContent value="reports" className="mt-0">
          <ReportsSettings />
        </TabsContent>

        <TabsContent value="localization" className="mt-0">
          <LocalizationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
