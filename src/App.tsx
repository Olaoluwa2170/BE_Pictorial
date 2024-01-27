import { Route, Routes } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import { SigninForm, SignupForm } from "./_auth/forms"
import RootLayout from "./_root/RootLayout"
import { AllUsers, CreatePost, EditPost, Home, PostDetail, Profile, Saved, UpdateProfile } from "./_root/pages"
import Explore from "./_root/pages/Explore"
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
          <Route path="/sign-in" index element={<SigninForm />} />
        </Route>
        
        {/* Private */}
        <Route element = {<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/saved" element={<Saved/>}/>
          <Route path="/all-users" element={<AllUsers/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:id" element={<EditPost/>}/>
          <Route path="/posts/:id" element={<PostDetail/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
        </Route>

      </Routes>

      <Toaster />
      {/* <Appwrite /> */}
    </main>
    </>
  )
}

export default App
