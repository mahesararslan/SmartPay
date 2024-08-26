import express from "express";
import cors from 'cors';
import db from "@repo/db/client";
import z from "zod";

const app = express();
app.use(cors());

const PaymentInfoValidation = z.object({
    token: z.string(),
    userId: z.number(),
    amount: z.number()
});

app.use(express.json())
app.post("/api/webhook", async (req, res) => {

    console.log("Received webhook request");
    // Extract payment information from the request body
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.Amount
    };

    // Validate the payment information
    const { success } = PaymentInfoValidation.safeParse(paymentInformation);
    if(!success) {
        res.status(400).json({
            message: "Invalid payment information"
        });
        return;
    }

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount) * 100
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Success"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Error while processing webhook"
        });
    }
});


app.listen(3003, () => {
    console.log("Server listening on port 3003");
})