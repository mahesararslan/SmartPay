"use client"

import { Avatar } from "@repo/ui/Avatar";
import { Button } from "@repo/ui/button";
import { PasswordInput } from "@repo/ui/passwordinput";
import { useState } from "react";


export default function () {
    const [name, setName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    

    function handler() {
        alert("Got Clicked")
    }
    

    return <div>
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold mx-5 sm:mx-0">
                Account
        </div>
        <div className="md:grid md:grid-cols-12" >
            <div className="p-10 flex flex-col justify-center items-center border shadow-md  md:p-5 md:max-w-64 md:mr-5 md:col-span-4 lg:col-span-3">
                <Avatar name={"Arslan"} />
                <div className="text-xl pt-2 text-slate-600">Arslan Mahesar</div>
                <div className="text-lg text-slate-500 md:flex-wrap">arslan@gmail.com</div>
            </div>
            <div className="mt-5 md:col-span-8 lg:col-span-9 md:border md:shadow-md md:mt-0">
                <div className="text-xl text-slate-600 text-left p-2 pb-6" >Profile Details</div>
                <div className="flex flex-col justify-center items-center  md:grid md:grid-cols-12 md:gap-x-1 lg:gap-x-10 md:px-5">
                    <div className="px-5 lg:px-8 md:px-2 pb-2 w-screen  md:col-span-6 md:w-auto">
                        <Input label={"Name"} defaultValue={"Arslan Mahesar"} onChange={(e: any) => {
                            setName(e.target.value)
                        }}/>
                    </div>
                    <div className="px-5 lg:px-8 md:px-2 pb-2 w-screen md:col-span-6 md:w-auto">
                        <PasswordInput label={"Current Password"} placeholder={"******"} onChange={(e:any) => {
                            setNewPassword(e.target.value);
                        }} />
                    </div>
                    <div className="px-5 lg:px-8 md:px-2 pb-5 w-screen md:col-span-6 md:w-auto">
                        <ReadOnlyInput label={"Email"} placeholder={"arslan@gmail.com"} />
                    </div>
                    <div className="px-5 lg:px-8 md:px-2 pb-5 w-screen md:col-span-6 md:w-auto">
                        <PasswordInput label={"Current Password"} placeholder={"******"} onChange={(e:any) => {
                            setCurrentPassword(e.target.value);
                        }} />
                    </div>
                    <div className="px-8 pb-2 w-screen md:col-span-12 md:px-0 md:pb-0 md:w-auto md:flex md:justify-end pt-3 mb-5 md:mr-6">
                        <div className="flex justify-end">
                            <Button onClick={handler}>
                                SAVE CHANGES
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


function Input({ label, onChange, defaultValue } : { label: string, onChange: any, defaultValue?: string }) {

    const handleInputChange = (e:any) => {
        onChange(e); // Call the handleChange function passed as props
    };

    return (
        <div>
        <label className="block mb-2 text-sm  text-black pt-4 text-left">
            {label}
        </label>
        <input defaultValue={defaultValue} onChange={handleInputChange} type="text" className=" border-b rounded-lg border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
    </div>
    );
}


function ReadOnlyInput({ label, placeholder }: { label: string, placeholder: string }) {

    return <div>
        <label className="block mb-2 text-sm font-medium text-black text-bold pt-4 text-left">
            {label}
        </label>
        <input readOnly type="text" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
        placeholder={placeholder} required/>
    </div>
    
}
