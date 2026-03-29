import mongoose from "mongoose";

export async function dbConnection(){
    try{
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDb connected Successfully");
        })

        connection.on('error',(error)=>{
            console.log("MongoDd connection failed",error);
        })

    }
    catch(error){
        console.log("Something went wrong");
        console.log(error);
    }
}