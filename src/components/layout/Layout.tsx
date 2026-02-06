import { Header } from "./Header";
import { Footer } from "./Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <SpeedInsights />
    </>
  )
}

export default Layout;