"use client"
import logger from '@/lib/logger';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import loginImg from '../../assests/popcorn.png';
import Image from 'next/image';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const invalidPassErr = `Enter a valid password:
- Must have an Uppercase letter
- Must have a Lowercase letter`;

    const handleEmailLogin = async (formData) => {
        logger.debug({ formData })

        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password
        })
        // logger.debug(result)
        if (result.ok) {
            toast.success('Log in successful');
            router.push('/')
        } else {
            toast.error('Invalid email or password');
            console.debug('Login Failed ')

        }
    };

    const handleGoogleLogin = async () => {
        const result = await signIn('google')
        if (result.ok) {
            toast.success('New user found! Registered in System.');
            router.push('/')
        } else {
            toast.error('Error occurred while logging in');
            console.debug('Login Failed ')
        }
    };

    return (
        <div className="md:min-h-[calc(75vh)] lg:min-h-[calc(100vh-90px)] flex flex-col">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary mt-8 mb-6">
                Login
            </h1>

            <div className="lg:flex-1 bg-base-200 flex items-center justify-center px-4">
                <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-10">

                    {/* Image (desktop only) */}
                    <div className="hidden lg:block">
                        <Image height={400} width={400} src={loginImg} className="max-w-md" alt="Login" />
                    </div>

                    {/* Login Card */}
                    <div className="card bg-base-100 w-full max-w-md shadow-2xl">
                        <div className="card-body">
                            <form
                                onSubmit={handleSubmit(handleEmailLogin)}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="label">Email</label>
                                    <input
                                        type="email"
                                        className="input input-bordered w-full"
                                        {...register('email', {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Enter a valid email address"
                                            }
                                        })}
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-sm">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label">Password</label>
                                    <input
                                        type="password"
                                        className="input input-bordered w-full"
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                                message: invalidPassErr
                                            }
                                        })}
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <p className="text-red-600 text-sm">{errors.password.message}</p>
                                    )}
                                </div>

                                <div className="text-right">
                                    <Link
                                        href="/recover-password"
                                        className="text-sm link link-hover text-primary"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <button className="btn btn-primary w-full">
                                    Login
                                </button>
                            </form>
                            <button
                                className="btn btn-primary w-full"
                                onClick={() => handleEmailLogin({
                                    email: process.env.NEXT_PUBLIC_admin_email,
                                    password: process.env.NEXT_PUBLIC_admin_pass,
                                })}
                            >
                                Demo Admin Login
                            </button>
                            <button
                                className="btn btn-primary w-full"
                                onClick={() => handleEmailLogin({
                                    email: process.env.NEXT_PUBLIC_user_email,
                                    password: process.env.NEXT_PUBLIC_user_pass,
                                })}
                            >
                                Demo User Login
                            </button>
                            <button
                                onClick={handleGoogleLogin}
                                className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff">
                                    </path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341">
                                        </path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                    </g></svg>
                                Login with Google
                            </button>

                            <p className="text-center mt-4 text-sm">
                                Don’t have an account?{' '}
                                <Link href="/signup" className="text-primary font-semibold">
                                    Register now
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
