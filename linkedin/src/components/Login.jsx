import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full py-8 px-4 sm:px-0'>
        <div className={`mx-auto w-full max-w-lg bg-brandDark rounded-2xl p-6 md:p-10 shadow-2xl border border-gray-100`}>
            
            <div className="mb-6 flex justify-center">
                <span className="inline-block w-full max-w-[80px]">
                    <Logo width="100%" className="rounded-lg" />
                </span>
            </div>
            
            <h2 className="text-center text-2xl font-bold leading-tight text-gray-400">Sign in to your account</h2>
            
            <p className="mt-2 text-center text-base text-gray-400">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-brandBlue transition-all duration-200 hover:underline hover:text-blue-700"
                >
                    Sign Up
                </Link>
            </p>
            
            {error && <p className="text-red-600 mt-8 text-center bg-red-50 p-2 rounded">{error}</p>}
            
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-6'>
                    <Input
                        label="Email : "
                        placeholder="Enter your email"
                        type="email"
                        className="focus:ring-brandBlue focus:border-brandBlue " 
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    
                    <Input
                        label="Password : "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-brandBlue hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login