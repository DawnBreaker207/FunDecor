import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { User } from "../interfaces/User"
import { signupSchema } from "../schemaValid/authSchema."
import instance from "../services/api"
import { useNavigate } from "react-router-dom"





const Register = () => {
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm<User>({ resolver: zodResolver(signupSchema) })
  const onSubmit = (res: User) => {
    (async () => {
      try {
        await instance.post('/signup', res)

        if (confirm(`Sign Up success, to to log in ?`)) {
          navigate('/login')
        }

      } catch (error) {
        console.log(error);

      }
    })()

  }
  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="my-5">
        <h1 className="my-5 text-3xl font-bold text-center">Sign Up</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="md:max-w-2xl md:mx-auto">
          <div className="mb-3">
            <label className="form-label" htmlFor="Name">Name</label>
            <input className="form-control" type="text" placeholder="Name" {...register("name", { required: true, minLength: 5 })} />
            <div className="font-bold text-red-600">{errors.name && <p>{errors.name?.message}</p>}</div>
          </div>
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

export default Register