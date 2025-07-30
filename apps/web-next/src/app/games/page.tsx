import { DashboardLayout } from "@/components/dashboard-layout"
import { GameManagement } from "@/components/games/game-management"

export default function GamesPage() {
  return (
    <DashboardLayout>
      <GameManagement />
    </DashboardLayout>
  )
}