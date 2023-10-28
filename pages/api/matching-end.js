import { connectDB } from "@/util/database";

export default async function handler (req, res){
    
    const client = await connectDB;
    const db = client.db("matching");

    console.log("end data: ",req);

    
    let matcherName = await db.collection('matchTable').deleteMany({
         summoner : '노란후추'
    });

    
}

