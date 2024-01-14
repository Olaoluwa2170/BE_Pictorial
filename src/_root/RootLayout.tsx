import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import Topbar from "@/components/shared/Topbar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <>
      <div className="w-full md:flex overflow-hidden">
        <Topbar/>
        <LeftSidebar />

        <section className="flex-col overflow-auto flex-1 h-full">
          <Outlet/>
        </section>

        <Bottombar />
      </div>      
    </>
  )
}

export default RootLayout