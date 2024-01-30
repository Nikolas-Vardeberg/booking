import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        service: String,
        date: String,
        duration: String,
        phone: String,
        time: String,
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
