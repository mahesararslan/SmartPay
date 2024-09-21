"use client"

import React, { useState } from 'react';
import logo from '../../logo.png';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function page() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  return (
    <section className="bg-[#ebe6e6]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <a href="#" className="flex justify-center items-center mb-6 text-4xl font-semibold text-gray-900">
          <Image src={logo} alt="SmartPay" width={50} height={50} />
          SmartPay
        </a>
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create a new account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-md font-medium text-gray-900">
                    Business Name
                </label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="ABC Business"
                    required
                />
              </div>
              <div>
                <label className="block mb-2 text-md font-medium text-gray-900">
                    Location
                </label>
                <input
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="country"
                    required
                />
              </div>
              <GoogleButton onClick={async () => {
                try {

                  sessionStorage.setItem('businessName', name);
                  sessionStorage.setItem('location', location);

                  await signIn("google", {
                    callbackUrl: `${process.env.NEXTAUTH_URL}/dashboard`,
                    redirect: false,
                    state: {
                      name: name,
                      location: location
                    }
                  });
                } catch (error) {
                  console.error("Error during sign-in:", error);
                }
              }} />
              {/* <GithubButton /> */}
              <p className="text-sm font-light text-gray-500">
                Already have an account?{' '}
                <a href="/signin" className="font-medium text-primary-600 hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleButton({ onClick } : {onClick: () => void}) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center bg-white border border-gray-300 rounded-lg shadow-md w-full px-6 py-4 text-center text-base font-semibold text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <svg
        className="h-6 w-6 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="-0.5 0 48 48"
        version="1.1"
      >
        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Color-" transform="translate(-401.000000, -860.000000)">
            <g id="Google" transform="translate(401.000000, 860.000000)">
              <path
                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                id="Fill-1"
                fill="#FBBC05"
              ></path>
              <path
                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                id="Fill-2"
                fill="#EB4335"
              ></path>
              <path
                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                id="Fill-3"
                fill="#34A853"
              ></path>
              <path
                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                id="Fill-4"
                fill="#4285F4"
              ></path>
            </g>
          </g>
        </g>
      </svg>
      <span className=''>Sign up with Google</span>
    </button>
  );
}