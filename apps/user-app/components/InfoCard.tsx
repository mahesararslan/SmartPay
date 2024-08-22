import { Card } from "@repo/ui/card";

export const InfoCard = ({ name, number }: {
    name: string;
    number: string;
}) => {
    return <Card title={"Account Information"}>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Name
            </div>
            <div>
                {name}
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
                Location
            </div>
            <div>
                Pakistan
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                City
            </div>
            <div>
                Islamabad
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Account No.
            </div>
            <div>
                {number}
            </div>
        </div>
    </Card>
}