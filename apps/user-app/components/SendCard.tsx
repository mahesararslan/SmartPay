"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";
import { BadAlert } from "./BadAlert";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleSend = async () => {
        const res = await p2pTransfer(number, Number(amount) * 100);
        if (res.message !== "Success") {
            setErrorMessage(res.message);
        } else {
            setErrorMessage(null); // Clear any previous errors
            router.push(`/money-sent?amount=${amount}&number=${number}`);
        }
    };

    return (
        <div className="h-[90vh]">
            {/* Render BadAlert at the top if there's an error message */}
            {errorMessage && <BadAlert message={errorMessage} />}

            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput placeholder="Number" label="Number" onChange={(value) => setNumber(value)} />
                        <TextInput placeholder="Amount" label="Amount" onChange={(value) => setAmount(value)} />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend}>Send</Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}
