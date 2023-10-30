import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req, res){

        try{
            // DB, session 정보 가져오기
            const client = await connectDB;
            const db = client.db("matching");

        const userListFinder = await db.collection('matched').find({
                players : {$in : [req.body.user]}
            });
            return res.status(200).json(userListFinder);
        }catch(error) {
            console.log('에러발생', error)
        }
}

