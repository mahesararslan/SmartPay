import Link from "next/link";
import InfoCard from "../../../components/InfoCard";
import RevenueComponent from "../../../components/RevenueCard";
import { DashboardCard } from "../../../components/DashboardCard";
import GetInfo from "../../lib/actions/GetInfo";


export default async function DashboardPage() { // @ts-ignore
  const { name, email, businessName, location } = await GetInfo();

    return (
        <div className="flex justify-center w-screen">
            <div className="pt-10 flex flex-col items-center lg:grid lg:grid-cols-2 gap-5">
                <div className="text-4xl text-[#6a51a6] pt-8 mb-8 col-span-2 font-bold mx-5 sm:mx-0">
                    Merchant Dashboard: {businessName}
                </div>
                <DashboardCard>
                    <div className="py-1">
                        <h2 className="font-bold text-4xl">$ 54000</h2>
                        <div className="pt-8 pb-2 lg:flex lg:justify-between lg:gap-20">
                            <Link href={"/transfer"}>
                                <div className="flex gap-2 lg:flex-none lg:gap-0 xl:flex xl:gap-2">
                                    <MoneyIcon />
                                    <p>Transfer {">"}</p>
                                </div>
                            </Link>
                            <div className="flex gap-2">
                                <p className="mt-3 lg:mt-0">See Order Payments</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </DashboardCard>
                <div className="mt-10 md:mt-0">
                    {/* Pass the InfoCard server component directly */}
                    <InfoCard name={name || ""} email={email || ""} location={location || ""} />
                </div>
                <div className="mt-10 col-span-2 w-full">
                    <RevenueComponent />
                </div>
            </div>
        </div>
    );
}

function MoneyIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
        </svg>
    );
}
