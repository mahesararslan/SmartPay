import Link from "next/link";
import { DashboardCard } from "../../../components/DashboardCard";
import { MoneyIcon } from "../../../components/MoneyIcon";
import { InfoCard } from "../../../components/InfoCard";
import { BankCard } from "../../../components/BankCard";

export default function() {
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold mx-5 sm:mx-0">
                Dashboard
        </div>
        <div className="pt-10 flex flex-col items-center lg:grid lg:grid-cols-2">
            <div>
                <DashboardCard>
                    <div >
                        <h2 className="font-bold text-4xl" >PKR 10000 Rs</h2>
                        <div className="pt-8 pb-2 lg:flex lg:justify-between lg:gap-20">
                            <Link href={"/transfer"} >
                                <div className="flex gap-2 lg:flex-none lg:gap-0 xl:flex xl:gap-2">
                                    <MoneyIcon />
                                    <p>Add Money {">"}</p>    
                                </div> 
                            </Link>
                            <p className="mt-3 lg:mt-0">Last Transaction Date: 20 Aug 2024</p>
                        </div>
                    </div>
                </DashboardCard>
                <div className="mt-10">
                    <InfoCard name={"Arslan Mahesar"} number={"0302050505"} />
                </div>
            </div>
            <div className="mt-10 lg:mt-0">
                <BankCard name={"Arslan M"}/>
            </div>
        </div>
    </div>  
}