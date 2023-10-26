import { connectDB } from "@/util/database";

export default async function handler (req, res){
    
    const client = await connectDB;
    const db = client.db("matching");
    
    let matcherName = await db.collection('matchTable').deleteOne({
         summoner : '노란후추'
    });

    
}

