import { Button } from "@repo/ui/button";
import { Sidebar } from "./Sidebar";
import Image from "next/image";
import logo from "../app/logo.png";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 border-slate-300">
        <div className="text-lg flex flex justify-center items-center gap-2">
            <div>
                <a href="#" className="mt-3 flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <Image src={logo} alt="Flowbite" width={50} height={50} />
                    SmartPay
                </a>
            </div>
            <div className="pb-3 md:hidden"><Sidebar /></div>
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}