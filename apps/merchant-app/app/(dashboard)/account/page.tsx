"use client";

import { BadAlert, GoodAlert } from "../../../components/BadAlert";
import { Avatar } from "@repo/ui/Avatar";
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import GetInfo from "../../lib/actions/GetInfo";
import UpdateProfile from "../../lib/actions/updateProfile";

export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [location, setLocation] = useState("");
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [alertMessage, setAlertMessage] = useState("");

    // States to handle validation errors
    const [errors, setErrors] = useState({
        name: "",
        businessName: "",
        location: "",
    });

    useEffect(() => {
        GetInfo().then((res) => {
            setName(res?.name || "");
            setEmail(res?.email || "");
            setBusinessName(res?.businessName || "");
            setLocation(res?.location || "");
        });
    }, []);

    async function handleSaveChanges (){
        let validationErrors = {
            name: "",
            businessName: "",
            location: "",
        };
        let hasError = false;

        if (!name) {
            validationErrors.name = "Name cannot be empty";
            hasError = true;
        }
        if (!businessName) {
            validationErrors.businessName = "Business name cannot be empty";
            hasError = true;
        }
        if (!location) {
            validationErrors.location = "Location cannot be empty";
            hasError = true;
        }

        setErrors(validationErrors);

        if (!hasError) {
            const res = await UpdateProfile(name, businessName, location);

            if (res.message === "Profile updated successfully") {
                setIsSuccess(true);
                setAlertMessage(res.message);
            } else {
                setIsSuccess(false);
                setAlertMessage(res.message);
            }
    
            setTimeout(() => {
                setAlertMessage("");
                setIsSuccess(null);
            }, 10000);

            // Proceed with save logic
            // Call an API or perform any other action as needed
        }
    };

    return (
        <div>
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold mx-5 sm:mx-0 flex justify-center md:block md:ml-10">
                Account
            </div>
            {isSuccess !== null && (
                isSuccess ? <GoodAlert message={alertMessage} /> : <BadAlert message={alertMessage} />
            )}
            <div className="md:grid md:grid-cols-12">
                <div className="p-10 flex flex-col justify-center items-center border shadow-md md:p-5 md:max-w-64 md:mr-5 md:col-span-4 lg:col-span-3">
                    <Avatar name={businessName} />
                    <div className="text-xl pt-2 text-slate-600">{businessName}</div>
                    <div className="text-lg text-slate-500 md:flex-wrap">{email}</div>
                </div>
                <div className="mt-5 md:col-span-8 lg:col-span-9 md:border md:shadow-md md:mt-0">
                    <div className="text-xl text-slate-600 text-left p-2 pb-6">Profile Details</div>
                    <div className="flex flex-col justify-center items-center md:grid md:grid-cols-12 md:gap-x-1 lg:gap-x-10 md:px-5">
                        <div className="px-5 lg:px-8 md:px-2 pb-2 w-screen md:col-span-6 md:w-auto">
                            <Input label="Owner's Name" value={name} onChange={(e: any) => setName(e.target.value)} error={errors.name} />
                        </div>
                        <div className="px-5 lg:px-8 md:px-2 pb-2 w-screen md:col-span-6 md:w-auto">
                            <Input label="Business Name" value={businessName} onChange={(e: any) => setBusinessName(e.target.value)} error={errors.businessName} />
                        </div>
                        <div className="px-5 lg:px-8 md:px-2 pb-5 w-screen md:col-span-6 md:w-auto">
                            <ReadOnlyInput label="Email" placeholder={email} />
                        </div>
                        <div className="px-5 lg:px-8 md:px-2 pb-2 w-screen md:col-span-6 md:w-auto">
                            <Input label="Location" value={location} onChange={(e: any) => setLocation(e.target.value)} error={errors.location} />
                        </div>
                        <div className="px-8 pb-2 w-screen md:col-span-12 md:px-0 md:pb-0 md:w-auto md:flex md:justify-end pt-3 mb-5 md:mr-6">
                            <div className="flex justify-end">
                                <Button onClick={handleSaveChanges}>
                                    SAVE CHANGES
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Input({ label, onChange, value, error }: { label: string, onChange: any, value: string, error?: string }) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black pt-4 text-left">
                {label}
            </label>
            <input
                value={value}
                onChange={onChange}
                type="text"
                className={`border-b rounded-lg border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 font-bold text-xs mt-2">{error}</p>}
        </div>
    );
}

function ReadOnlyInput({ label, placeholder }: { label: string, placeholder: string }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-black text-bold pt-4 text-left">
                {label}
            </label>
            <input
                readOnly
                type="text"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
