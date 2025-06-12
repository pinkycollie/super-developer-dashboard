import { DashboardHeader } from "@/components/dashboard-header"
import { ProjectsList } from "@/components/projects-list"
import { Sidebar } from "@/components/sidebar"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <ProjectsList />
        </main>
      </div>
    </div>
  )
}

