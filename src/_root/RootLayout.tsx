import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <>
      <section>
        Rootlayout
      </section>
      <Outlet/>
    </>
  )
}

export default RootLayout