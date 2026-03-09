"use client"
import { toast } from 'react-toastify';
import signupImg from '../../assests/film.png';
import { useForm } from "react-hook-form";
import { postUser } from '@/actions/server/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const router = useRouter()

  const invalidPassErr = `Enter a valid password:
  - Must have an Uppercase letter
  - Must have a Lowercase letter`;

  const handleRegister = async (formData) => {
    const { email } = formData;
    // logger.debug('formData', formData);

    const result = await postUser(formData)
    // logger.debug({result});

    if (result.acknowledged) {
      toast.success('Registration successful');
      router.push('/')
    } else {
      toast.error('Incorrect information');
      console.debug('Registration failed')
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signIn('google')
    // console.log(2322);
    if (result.ok) {
      // const userExists = await isUserExist(email);
      // if (userExists) {
      //   toast.success('User already exists. Logged in');
      //   router.push('/');
      //   return;
      // }

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
        Signup now!
      </h1>

      <div className="lg:flex-1 bg-base-200 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-10">

          {/* Image (desktop only) */}
          <div className="hidden lg:block">
            <Image height={400} width={400} src={signupImg} className="max-w-md" alt="Signup" />
          </div>

          {/* Signup Card */}
          <div className="card bg-base-100 w-full max-w-md shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">

                <div>
                  <label className="label">Name</label>
                  <input className="input input-bordered w-full"
                    {...register('name', {
                      required: 'Name is required'
                    })}
                    placeholder="Name"
                  />
                  {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="label">Email</label>
                  <input className="input input-bordered w-full"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    placeholder="Email"
                  />
                  {errors.email?.message && (
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
                        message: 'Password must be atleast 6 characters'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                        message: invalidPassErr
                      }
                    })}
                    placeholder="Password"
                  />
                  {errors.password?.message && (
                    <p className="text-red-600 text-sm">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Photo URL</label>
                  <input
                    className="input input-bordered w-full"
                    {...register('photoUrl')}
                    placeholder="abc.jpg"
                  />
                </div>

                <button className="btn btn-primary w-full mt-4">
                  Signup
                </button>
              </form>


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
                Signup with Google
              </button>

              <p className="text-center mt-3 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-semibold">
                  Login now
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
