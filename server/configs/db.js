// import mongoose from "mongoose";

// const connectDB = async ()=>{
//     try{
//         mongoose.connection.on('connected', ()=> console.log("Database Connected"));
//         await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)

//     }
//     catch( error) {
//         console.log(error.message);
//     }
// }

// export default connectDB;



import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database Connected");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);

    } catch (error) {
        console.error("MongoDB Connection Error:");
        console.error(error);
    }
};

export default connectDB;