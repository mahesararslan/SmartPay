"use client";

import { PasswordInput } from "@repo/ui/passwordinput";
import { TextInput } from "@repo/ui/textinput";
import Link from "next/link";
import { useState } from "react";
import Signup from "../../lib/actions/Signup";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../../logo.png";
import { useRouter } from "next/navigation";

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            setLoading(true); // Set loading to true before starting the signup process

            await Signup(name, email, phone, password);

            const result = await signIn("credentials", {
                redirect: false, // Prevent automatic redirect
                phone,
                password,
            });

            if (result?.ok) {
                // Redirect manually if signIn is successful
                router.push("/dashboard");
            } else {
                // Handle error (e.g., show error message)
                console.error(result?.error || "Sign in failed");
            }
        } catch (error) {
            console.error("Signup or sign-in error:", error);
        } finally {
            setLoading(false); // Set loading to false after the process is complete
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col items-center bg-[#ebe6e6] pt-10">
            <div className="flex justify-center bg-white rounded-xl px-10 py-10">
                <div>
                    <a href="#" className="flex justify-center items-center mb-6 text-4xl pb-4 border-b-2 font-semibold text-gray-900">
                        <Image src={logo} alt="Flowbite" width={50} height={50} />
                        SmartPay
                    </a>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold text-black text-center">
                            Create a new account
                        </div>
                    </div>
                    <div className="pt-8">
                        <div className="md:grid md:grid-cols-2 md:gap-5">
                            <div>
                                <TextInput label={"Full Name"} placeholder={"Sheldon Cooper"} onChange={(val) => setName(val)} />
                                <TextInput label={"Email"} placeholder={"sheldon@gmail.com"} onChange={(val) => setEmail(val)} />
                            </div>
                            <div>
                                <TextInput label={"Phone Number"} placeholder={"03202864727"} onChange={(val) => setPhone(val)} />
                                <PasswordInput label={"Password"} placeholder={"password"} onChange={(val) => setPassword(val)} />
                            </div>
                        </div>
                        <button
                            onClick={handleSignUp}
                            type="button"
                            className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                        <div className="mt-4 text-center">
                            <Link href="/signin" className="text-gray-500 hover:underline">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
