import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { User } from "../interfaces/User"

import instance from "../services/api"
import { signinSchema } from "../schemaValid/authSchema."
import { useNavigate } from "react-router-dom"




const LogIn = () => {
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm<User>({ resolver: zodResolver(signinSchema) })
  const onSubmit = (res: User) => {
    (async () => {
      try {
        const { data } = await instance.post('/login', res)
        localStorage.setItem('token', data?.accessToken)
        if (confirm(`Log in success, to to dashboard ?`)) {
          navigate('/admin')
        }
      } catch (error) {
        console.log(error);

      }
    })()

  }
  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="my-5">
        <h1 className="my-5 text-3xl font-bold text-center">Sign In</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="md:max-w-2xl md:mx-auto">

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
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default LogIn