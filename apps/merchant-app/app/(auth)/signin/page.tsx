"use client"
import React from 'react';
import logo from '../../logo.png';
import Image from 'next/image';
import { signIn} from 'next-auth/react';
import GoogleButton from '../../../components/GoogleButton';

export default function page() {

  // const { status } = useSession();
  // const router = useRouter();

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }
  // if (status === "authenticated") {
  //   router.push("/dashboard");
  // }

  return (
    <section className="bg-[#ebe6e6]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <a href="#" className="flex justify-center items-center mb-6 text-4xl pb-4 border-b-2 font-semibold text-gray-900">
          <Image src={logo} alt="SmartPay" width={50} height={50} />
          SmartPay
        </a>
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your Merchant Account
            </h1>
            <div className="space-y-4 md:space-y-6" >
              
              <GoogleButton onClick={async () => {
                try {
                  await signIn("google", {
                    callbackUrl: `${process.env.NEXTAUTH_URL}/dashboard`
                  });
                } catch (error) {
                  console.error("Error during sign-in:", error);
                }
              }} />
              {/* <GithubButton /> */}
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{' '}
                <a href="/signup" className="font-medium text-primary-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
