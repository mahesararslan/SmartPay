import Link from "next/link";
import { DashboardCard } from "../../../components/DashboardCard";
import { MoneyIcon } from "../../../components/MoneyIcon";
import { InfoCard } from "../../../components/InfoCard";
import { BankCard } from "../../../components/BankCard";
import GetBalance from "../../lib/actions/getBalance";
import GetUser from "../../lib/actions/getUser";

export default async function() {
    const { balance, lastTransaction } = await GetBalance();
    const { name, email, number } = await GetUser();
    const currBalance = balance || 0;
    const lastTransactionDate = lastTransaction
        ? new Date(lastTransaction).toLocaleDateString()
        : "";

    return <div className="w-screen h-full py-5">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold mx-5 sm:mx-0">
                Dashboard
        </div>
        <div className="pt-10 flex flex-col items-center lg:grid lg:grid-cols-2">
            <div>
                <DashboardCard>
                    <div >
                        <h2 className="font-bold text-4xl" >PKR {currBalance/100} Rs</h2>
                        <div className="pt-8 pb-2 lg:flex lg:justify-between lg:gap-20">
                            <Link href={"/transfer"} >
                                <div className="flex gap-2 lg:flex-none lg:gap-0 xl:flex xl:gap-2">
                                    <MoneyIcon />
                                    <p>Add Money {">"}</p>    
                                </div> 
                            </Link>
                            <p className="mt-3 lg:mt-0">Last Transaction Date: {lastTransactionDate}</p>
                        </div>
                    </div>
                </DashboardCard>
                <div className="mt-10">
                    <InfoCard name={name || ""} email={email || ""} number={number || ""} />
                </div>
            </div>
            <div className="mt-10 lg:mt-0">
                <BankCard name={name || ""}/>
            </div>
        </div>
    </div>  
}