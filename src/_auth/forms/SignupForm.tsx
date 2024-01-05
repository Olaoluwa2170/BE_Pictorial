// import { Button } from "@/components/ui/button"
import Loading from "@/components/shared/Loading"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuthContext } from "@/context/AuthContext"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queryAndMutation"
import { SignUpSchema } from "@/lib/types"
import { SignUpValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ToastAction } from "@radix-ui/react-toast"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"




const SignupForm = () => {
  const {toast} = useToast()
  const {checkAuthUser} = useAuthContext()
  const navigate = useNavigate()
   // 1. Define your form.
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""

    },
  })
 
   const { mutateAsync: createUserAccount, isPending : isCreatingUser } = useCreateUserAccount()
   const { mutateAsync: signInAccount} = useSignInAccount()

  // 2. Define a submit handler.
  async function onSubmit(values: SignUpSchema) {
    const newUser = await createUserAccount(values) 
    if (!newUser) {
      return toast({
        variant: "destructive",
        title: "Sign in failed. Please try again Yeah.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    const session = await signInAccount(
      {
        email: values.email,
        password: values.password,
      }
    )

    if (!session) {
      return toast({
        variant: "destructive",
        title: "Sign in failed. Please try again.",
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
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="logo" />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Sign up for an account</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} className="shad-button_primary">
                  {isCreatingUser ? <Loading/> : 'Sign Up'}
                  </Button>
              </form>
            </div>
            </Form>
            <p className="mt-4 font-thin mr-2">Already have an account? <Link to={'/sign-in'} className="text-purple-500">Sign in</Link></p>
        </>
  )
}

export default SignupForm