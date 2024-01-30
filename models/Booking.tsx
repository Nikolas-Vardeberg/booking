import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
    {
        title: String,
        description: String,
        link: String,
        number: String,
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
