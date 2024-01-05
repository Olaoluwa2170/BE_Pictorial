import { Route, Routes } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import { SigninForm, SignupForm } from "./_auth/forms"
import RootLayout from "./_root/RootLayout"
import { Home } from "./_root/pages"
import { Toaster } from "./components/ui/toaster"
// import Appwrite from './lib/apprite/Appwrite'

function App() {

  return (
    <>
      <main className="flex h-screen">
      <Routes>
        {/* Public */}
        <Route element = {<AuthLayout />}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>
        
        {/* Private */}
        <Route element = {<RootLayout />}>
          <Route index element= {<Home />} />
        </Route>

      </Routes>

      <Toaster />
      {/* <Appwrite /> */}
    </main>
    </>
  )
}

export default App
