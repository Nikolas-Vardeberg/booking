import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";
import Booking from "@/../../models/Booking";


export async function POST(request) {
    const { service, date, duration, phone, time } = await request.json();
    await connectMongoDB();
    await Booking.create({ service, date, duration, phone, time });
    return NextResponse.json({ message: "Booking Created"}, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const bookings = await Booking.find();
    return NextResponse.json({bookings});
}
