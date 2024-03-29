import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import Topbar from "@/components/shared/Topbar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <>
      <div className="w-full md:flex h-full overflow-hidden">
        <Topbar/>
        <div className="custom-scrollbar overflow-auto">
          <LeftSidebar />
        </div>

        <section className="flex-col overflow-auto custom-scrollbar h-[80%] flex-1 md:h-full">
          <Outlet/>
        </section>

        <Bottombar />
      </div>      
    </>
  )
}

export default RootLayout