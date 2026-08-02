import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { axios, getToken, user } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32">

      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />

      <div className="max-w-7xl mx-auto mt-10 text-gray-800">

        {/* Header */}
        <div className="hidden md:grid grid-cols-[3fr_2fr_1fr] border-b border-gray-300 pb-4 font-medium text-lg">
          <p>Hotels</p>
          <p>Date & Timings</p>
          <p>Payment</p>
        </div>

        {/* Bookings */}
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-8 border-b border-gray-200 py-6"
          >
            {/* Hotel Details */}
            <div className="flex gap-5">

              <img
                src={booking.room.images[0]}
                alt="hotel"
                className="w-40 h-28 rounded-md object-cover flex-shrink-0 shadow"
              />

              <div className="flex flex-col justify-between">

                <div>
                  <h2 className="font-playfair text-3xl">
                    {booking.hotel.name}
                    <span className="text-base font-inter text-gray-500">
                      {" "}
                      ({booking.room.roomType})
                    </span>
                  </h2>

                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <img
                      src={assets.locationIcon}
                      alt=""
                      className="w-4 h-4"
                    />
                    <span className="text-sm">
                      {booking.hotel.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-gray-500">
                    <img
                      src={assets.guestsIcon}
                      alt=""
                      className="w-4 h-4"
                    />
                    <span className="text-sm">
                      Guests: {booking.guests}
                    </span>
                  </div>
                </div>

                <p className="font-semibold text-lg">
                  Total: ${booking.totalPrice}
                </p>

              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-10">

              <div>
                <p className="font-medium">Check-In:</p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>

              <div>
                <p className="font-medium">Check-Out:</p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>

            </div>

            {/* Payment */}
            <div className="flex flex-col justify-center">

              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    booking.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>

                <span
                  className={`text-sm font-medium ${
                    booking.isPaid
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>

              {!booking.isPaid && (
                <button className="mt-4 w-fit px-5 py-1.5 border border-gray-400 rounded-full text-sm hover:bg-gray-100 transition-all">
                  Pay Now
                </button>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MyBookings;