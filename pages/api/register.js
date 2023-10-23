import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req, res){

    if (req.method == "POST") {
        try{
            const client = await connectDB;
            const db1 = client.db("test");
            const db2 = client.db("matching");
            
            console.log(JSON.parse(req.body))
            // const userEmail = await db1.collection('users').findOne({
            //     email : JSON.parse(req).body.user.email
            // });
        
            // await db2.collection('userInfo').insertOne({
            //     userEmail : userEmail, 
            //     summonerName : JSON.parse(req).body.user.summonerName
            // });
            
        }catch(error) {
            console.log('에러발생', error)
        }
        
    }
    
    
}

