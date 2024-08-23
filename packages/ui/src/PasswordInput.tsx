import { useState } from "react";

export const PasswordInput = ({ label, onChange, placeholder }: {
    label: string;
    onChange: (value: string) => void;  // Update the onChange prop to accept a string value
    placeholder: string;
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value); // Pass only the value to the parent component
    };

    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <div className="relative">
                <input
                    onChange={handleChange}  // Use handleChange to manage the input's value
                    id="hs-toggle-password"
                    type={isPasswordVisible ? "text" : "password"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-gray-800"
                >
                    <svg
                        className="shrink-0 size-3.5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            className={!isPasswordVisible ? "" : "hidden"}
                            d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                        />
                        <path
                            className={!isPasswordVisible ? "" : "hidden"}
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        />
                        <path
                            className={!isPasswordVisible ? "" : "hidden"}
                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        />
                        <line
                            className={!isPasswordVisible ? "" : "hidden"}
                            x1="2"
                            x2="22"
                            y1="2"
                            y2="22"
                        />
                        <path
                            className={isPasswordVisible ? "" : "hidden"}
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        />
                        <circle
                            className={isPasswordVisible ? "" : "hidden"}
                            cx="12"
                            cy="12"
                            r="3"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
