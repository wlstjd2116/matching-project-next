import { connectDB } from "@/util/database";

export default async function handler (req, res){
    
    const client = await connectDB;
    const db = client.db("matching");
    
    let matchingSeq = await db.collection('sequences').findOneAndUpdate(
        {_id: "matchingID"}, 
        {
            $inc: {
                seq: 1
            }
        },
        { returnOriginal : false}
    );

    let insertValue = {
        matchNumber : matchingSeq.value.seq,
        summoner : '노란후추',
        tier : 'DIAMOND3'
    }
    let insertResult = await db.collection('matchTable').insertOne(insertValue);
    
}

