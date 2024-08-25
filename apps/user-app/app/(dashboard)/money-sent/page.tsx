"use client"
import doneImg from "../../verify.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation"; // Correct import
import Link from "next/link";

export default function MoneySent() {
    const searchParams = useSearchParams();
    const amount = searchParams.get('amount');
    const number = searchParams.get('number');
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    return (
        <div className="w-screen flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow ">
                <Image src={doneImg} alt="done-img" width={80} height={80} className="mb-4" />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                    Amount Sent: ${amount}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Date: {date} <br /> Time: {time} <br /> Money Sent to {number}
                </p>
                <Link href={"/dashboard"}>
                    <button 
                        type="button" 
                        className="mt-5 w-60 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onClick={() => window.location.reload()}
                    >
                        Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
}
