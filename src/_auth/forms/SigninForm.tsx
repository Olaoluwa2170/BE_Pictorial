// import { Button } from "@/components/ui/button"
import Loading from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuthContext } from "@/context/AuthContext"
import { useSignInAccount } from "@/lib/react-query/queryAndMutation"
import { SignInSchema } from "@/lib/types"
import { SignInValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ToastAction } from "@radix-ui/react-toast"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"




const SignupForm = () => {
  const {toast} = useToast()
  const {checkAuthUser} = useAuthContext()
  const navigate = useNavigate()
   // 1. Define your form.
  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
   const { mutateAsync: signInAccount, isPending : isSigningIn} = useSignInAccount()

  // 2. Define a submit handler.
  async function onSubmit(values: SignInSchema) {
    const session = await signInAccount(
      {
        email: values.email,
        password: values.password,
      }
    )

    if (!session) {
      return toast({
        variant: "destructive",
        title: "Invalid Credentials.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn) {
        form.reset()
        navigate('/')
    } else return(
      toast({
        variant: "destructive",
        title : 'sign up failed please try again',
      })
    )
  }

  return (
        <>
          <Form {...form}>
            <div className="sm:w-420 px-10 flex-center flex-col">
                <p className="text-purple-300 text-center mt-2">Amateurs seek the sun. and Get eaten. but Power stays in the shadows</p>
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Sign in to your account</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" className="shad-input" {...field} /> 
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

               <Button type="submit" disabled={form.formState.isSubmitting} className="shad-button_primary">
                  {isSigningIn ? <Loading/> : 'Sign In'}
                </Button>
              </form>
            </div>
            </Form>
            <p className="mt-4 font-thin mr-2">Don't have an account? <Link to={'/sign-up'} className="text-purple-500">Sign up</Link></p>
        </>
  )
}

export default SignupForm