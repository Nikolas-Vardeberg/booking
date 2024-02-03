import Link from "next/link";

const getBookings = async (): Promise<{ bookings: Booking[] }> => {
    try {
        const res = await fetch("http://localhost:3000/api/booking", {
            cache: "no-store", 
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return res.json();
    } catch (error) {
        console.error("Error loading topics", error);
        throw error;
    }
};

interface Booking {
    _id: number;
    service: string;
    date: string;
    duration: string;
    phone: string;
    time: string;
}

const Bookings  = async () => {
    const { bookings } = await getBookings();

    return (
        <>
            {bookings.map((t) => (
                <div>
                    <h2>{t._id}</h2>
                    <h2>{t.service}</h2>
                    <h2>{t.date}</h2>
                    <h2>{t.duration}</h2>
                    <h2>{t.phone}</h2>
                    <h2>{t.time}</h2>
                </div>
            ))}
        </>
    );
};

export default Bookings;