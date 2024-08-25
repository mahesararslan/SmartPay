"use client";

import { TextInput } from "@repo/ui/textinput";
import { PasswordInput } from "@repo/ui/passwordinput";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../logo.png";

export default function Page() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSignIn = async () => {
        if (!mounted) return;

        setLoading(true);
        setError(""); // Clear any previous error messages

        const res = await signIn("credentials", {
            redirect: false, // Prevent automatic redirect
            phone,
            password,
        });

        setLoading(false);

        if (res?.error) {
            setError("Invalid credentials. Please try again.");
        } else {
            router.push("/dashboard"); // Redirect to dashboard or any other page
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col items-center bg-[#ebe6e6]">
            <div className="flex justify-center bg-white rounded-xl px-10 py-10">
                <div>
                <a href="#" className="flex justify-center items-center mb-6 text-4xl pb-4 border-b-2 font-semibold text-gray-900">
                    <Image src={logo} alt="Flowbite" width={50} height={50} />
                    SmartPay
                </a>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold text-black">
                            Sign in
                        </div>
                    </div>
                    <div className="pt-8">
                        <TextInput
                            label={"Phone Number"}
                            placeholder={"03202864727"}
                            onChange={(val) => setPhone(val)}
                        />
                        <PasswordInput
                            label={"Password"}
                            placeholder={"password"}
                            onChange={(val) => setPassword(val)}
                        />
                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}
                        <button
                            onClick={handleSignIn}
                            type="button"
                            className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                        <div className="mt-4 text-center">
                            <Link href="/signup" className="text-gray-500 hover:underline">
                                Don't have an account? Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
