import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"


import { AuthType } from "../../common/types/Auth"
import { SignInSchema, SignUpSchema } from "../../validations/authSchema."



type Props = {
  isRegister?: boolean
}

const AuthForm = ({ isRegister }: Props) => {

  const { Login, Register } = useAuth()
  const { register, formState: { errors }, handleSubmit } = useForm<AuthType>({ resolver: zodResolver(isRegister ? SignUpSchema : SignInSchema) })
  const onSubmit = (res: AuthType) => {
    (async () => {
      try {
        if (isRegister) {
          await Register(res)
        } else {
          await Login(res)
        }
      } catch (error) {
        alert(error || 'Failed')
        console.log(error);

      }
    })()

  }
  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="my-5">
        <form action="" onSubmit={handleSubmit(onSubmit)} className="md:max-w-2xl md:mx-auto">
          <h1 className="my-5 text-3xl font-bold text-center">{isRegister ? "Sign Up" : "Sign In"}</h1>

          <div className="mb-3">
            <label className="form-label" htmlFor="Email">Email</label>
            <input className="form-control" type="email" placeholder="Email" {...register("email", { required: true })} />
            <div className="font-bold text-red-600">{errors.email && <p>{errors.email?.message}</p>}</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Password">Password</label>
            <input className="form-control" type="password" placeholder="Password" {...register("password", { required: true, minLength: 5 })} />
            <div className="font-bold text-red-600">{errors.password && <p>{errors.password?.message}</p>}</div>
          </div>
          {isRegister && (
            <>

              <div className="mb-3">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <input className="form-control" placeholder="Confirm" type="password" {...register("confirmPass", { required: true, minLength: 5 })} />
                <div className="font-bold text-red-600">{errors.confirmPass && <p>{errors.confirmPass?.message}</p>}</div>
              </div></>
          )}
          <button className="btn btn-primary" type="submit">{isRegister ? 'Register' : 'Login'}</button>
          {isRegister && <p>Already have account, change to <Link className="text-blue-500" to={'/login'}>Log in</Link>!</p>}
        </form>
      </div>
    </section>
  )
}

export default AuthForm