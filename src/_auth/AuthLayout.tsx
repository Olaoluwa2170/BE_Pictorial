import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
  const isAuth = false

  return (
    
    <>
      {
        isAuth ? (
          <Navigate to={'/'}/>
          ) :
          (
          <>

            <section className="flex flex-col justify-center items-center flex-1 py-10">
              <Outlet/>
            </section> 
            <img src='/assets/images/side-img.svg' className="bg-no-repeat object-cover hidden xl:block h-screen w-1/2" alt="" />

          </>
        
        )
      }
    </>
    
  )
} 

export default AuthLayout