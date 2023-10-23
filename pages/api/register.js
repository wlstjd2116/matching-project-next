import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req, res){

    if (req.method == "POST") {
        try{
            const client = await connectDB;
            const db1 = client.db("test");
            const db2 = client.db("matching");
            let session = await getServerSession(req, res, authOptions);

            
            const userEmail = await db1.collection('users').findOne({
                email : session.user.email
            });
            
            let summonerName = JSON.parse(JSON.stringify(req.body)).summonerName;

            await db2.collection('userInfo').insertOne({
                userEmail : userEmail.email, 
                summonerName : summonerName
            });

            // find 유저 값
            // const testValue = await db2.collection('userInfo').findOne({
            //     userEmail : userEmail.email
            // });

            
        }catch(error) {
            console.log('에러발생', error)
        }
        
    }
    
    
}

