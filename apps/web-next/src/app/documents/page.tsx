import { DashboardLayout } from "@/components/dashboard-layout"
import { DocumentManagement } from "@/components/documents/document-management"

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <DocumentManagement />
    </DashboardLayout>
  )
}