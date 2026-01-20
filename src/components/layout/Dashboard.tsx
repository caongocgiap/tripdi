import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../sidebar/app-sidebar";
import { SiteHeader } from "../sidebar/side-header";

const Dashboard = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default Dashboard;