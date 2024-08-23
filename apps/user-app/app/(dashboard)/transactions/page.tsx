import { HistoryCard } from "../../../components/HistoryCard";
import GetTransactions from "../../lib/actions/getTransactions";

export default async function () {
    const { transactions } : any = await GetTransactions(); 

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold mx-5 sm:mx-0">
                Transactions
        </div>
        <div className="flex flex-col px-5 md:grid md:grid-cols-2 md:gap-10 mb-10 ">
                {transactions.map((transaction: any) => (
                    <HistoryCard
                    key={transaction.id}
                    name={transaction.otherPersonName || "Unknown"}
                    number={transaction.otherPersonNumber}
                    amount={transaction.amount}
                    date={new Date(transaction.timestamp).toLocaleDateString()}
                    type={transaction.type}
                    />
                ))}
        </div>
    </div>
}