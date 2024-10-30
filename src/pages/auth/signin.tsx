import { useClientSideRequest } from "../../hooks/useRestClient";
import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form";
import { Loading } from "../../components/Loading";
import { RequestMethods } from "../../enums";

import '../../App.css'
import { SignInProps } from "../../models";

const Signin = () => {
  const navigate = useNavigate();
  const { formState: { errors }, register, handleSubmit } = useForm<SignInProps>();
  const { request, loading, error } = useClientSideRequest({
    onSuccessCallback: () => navigate('/shift/list', { replace: true }),
    method: RequestMethods.SIGN_IN
  })

  const onSubmit: SubmitHandler<SignInProps> = async (data) => await request({...data});

  if(loading) {
    return <Loading/>
  }

  return (
    <div>
      <h1>Ingresar</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form"> 
        <input
          {...register('email', { required: true })}
          className="input"
          type="email"
          name="email"
          placeholder="maria@email.com"
        />
        {errors.email && <p>Email is required.</p>}
        <input
          {...register('password', { required: true })}
          className="input"
          type="password"
          name="password"
          placeholder="********"

        />
        {errors.password && <p>Password is required.</p>}
        <button type="submit">Submit</button>
      </form>
      {error && (<div>{error}</div>)}
    </div>
  )
}

export default Signin
