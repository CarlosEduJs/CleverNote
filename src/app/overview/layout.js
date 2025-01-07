import Header from "@/components/ui/header";
import AppSidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppBreadcrumb from "@/components/breadcrumb";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-w-full min-h-screen  py-14 px-2">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-1">
            <main className="flex py-6 gap-6">
              <SidebarTrigger />
              <div className="flex flex-col gap-3">
                <AppBreadcrumb />
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
