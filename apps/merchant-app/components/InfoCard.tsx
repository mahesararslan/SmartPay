"use server"
import { Card } from "@repo/ui/card";


async function InfoCard({ name, email, location} : {name: string, email: string, location: string}) {
    

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
                Email
            </div>
            <div>
                {email}
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Location
            </div>
            <div>
                {location}
            </div>
        </div>
    </Card>
}

export default InfoCard;