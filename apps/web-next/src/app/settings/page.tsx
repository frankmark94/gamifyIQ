import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsDashboard } from "@/components/settings/settings-dashboard"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsDashboard />
    </DashboardLayout>
  )
}