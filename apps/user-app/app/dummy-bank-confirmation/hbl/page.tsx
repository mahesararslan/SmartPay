// @ts-nocheck
"use client";

import React, { useState } from 'react';
import logo from '../../HBL Logo.png';
import Image from 'next/image';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { BadAlert, GoodAlert } from '../../../components/BadAlert';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('email');
  const token = searchParams.get('token');
  const amount = searchParams.get('amount');
  const number = searchParams.get('number');

  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  if (!id || !token || !amount) {
    return <div className='text-center text-4xl text-red-400 '>Invalid Request</div>;
  }

  const handleSendMoney = async () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    setPasswordError(''); // Clear error message if validation passes
    setIsLoading(true); // Start loading
    const userId = Number(id);
    const Amount = Number(amount);
    try {
      const res = await axios.post('http://localhost:3003/api/webhook', {
        token,
        Amount,
        userId,
      });
      console.log(res.data);

      if (res.data.message === "Success") {
        setIsSuccess(true);
        setAlertMessage(res.data.message);
      } else {
        setIsSuccess(false);
        setAlertMessage(res.data.message);
      }

      setTimeout(() => {
        setAlertMessage("");
        setIsSuccess(null);
        window.location.href = '/dashboard';
      }, 3000);
    } catch (e) {
      console.error(e);
      alert('Payment Failed');
    } finally {
      setIsLoading(false); // Stop loading after the request
    }
  };

  return (
    <section className="bg-[#ebe6e6]">
      {isSuccess !== null && (
          isSuccess ? <div className='w-screen mb-8 p-5' ><GoodAlert message={alertMessage} /></div> : <div className='w-screen mb-8 p-5' > <BadAlert message={alertMessage} /> </div>
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <a href="#" className="flex justify-center items-center mb-6 text-4xl font-semibold text-gray-900">
              <Image src={logo} alt="SmartPay" width={180} height={180} />
            </a>
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Send to your SmartPay Account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-md font-medium text-gray-900">
                  Amount
                </label>
                <input
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" // @ts-ignore
                  placeholder={Number(amount) || 0}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-md font-medium text-gray-900">
                  Account Number
                </label>
                <input
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder={number || ''}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-md font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="******"
                  required
                />
                {passwordError && <p className="text-red-500 text-sm font-bold mt-1">{passwordError}</p>}
              </div>
              <Button onClick={handleSendMoney} isLoading={isLoading}>
                {isLoading ? 'Processing...' : 'Send Money'}
              </Button>
              <p className="text-sm font-light text-gray-500">
                Go back to Dashboard?{' '}
                <a href="/dashboard" className="font-medium text-primary-600 hover:underline">
                  Dashboard
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isLoading: boolean; // Add isLoading to props
}

const Button = ({ onClick, children, isLoading }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={isLoading} // Disable button while loading
      className={`text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};
