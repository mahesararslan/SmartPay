import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string, // TODO: Can the type of `status` be more specific?
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
        );
    }

    // Slice the array to get only the latest 5 transactions
    const latestTransactions = transactions.slice(-5);

    return (
        <Card title="Recent Transactions">
            <div className="pt-2">
                {latestTransactions.map((t, index) => (
                    <div className="flex justify-between" key={index}>
                        <div>
                            <div className="text-sm">Received PKR</div>
                            <div className="text-slate-600 text-xs">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
