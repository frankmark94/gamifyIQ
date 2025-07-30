import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsCards } from "@/components/overview/stats-cards"
import { RecentActivity } from "@/components/overview/recent-activity"
import { QuickActions } from "@/components/overview/quick-actions"
import { DocumentStatus } from "@/components/overview/document-status"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome to your GamifyIQ admin dashboard. Monitor training progress and manage your content.
          </p>
        </div>
        
        {/* Key Metrics */}
        <StatsCards />
        
        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Left column - Recent Activity */}
          <div className="lg:col-span-4">
            <RecentActivity />
          </div>
          
          {/* Right column - Quick Actions */}
          <div className="lg:col-span-3">
            <QuickActions />
          </div>
        </div>
        
        {/* Document Status */}
        <DocumentStatus />
      </div>
    </DashboardLayout>
  )
}
