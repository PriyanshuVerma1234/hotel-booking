
import stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (request, response) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log("Webhook Error:", err.message);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Payment successful
    if (event.type === "checkout.session.completed") {

        const session = event.data.object;

        const bookingId = session.metadata?.bookingId;

        console.log("Payment successful");
        console.log("Session ID:", session.id);
        console.log("Booking ID:", bookingId);

        if (!bookingId) {
            console.log("Booking ID not found in metadata");
            return response.json({ received: true });
        }

        try {
            await Booking.findByIdAndUpdate(
                bookingId,
                {
                    isPaid: true,
                    paymentMethod: "Stripe"
                }
            );

            console.log("Booking marked as paid");
        } catch (error) {
            console.log("MongoDB update error:", error.message);

            return response.status(500).json({
                success: false,
                message: error.message
            });
        }

    } else {
        console.log("Unhandled event type:", event.type);
    }

    response.json({ received: true });
};