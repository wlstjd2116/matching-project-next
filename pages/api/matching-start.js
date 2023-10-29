import { connectDB } from "@/util/database";
import { NextResponse } from "next/server";

export default async function handler (req, res){
    
    try{
        const client = await connectDB;
        const db = client.db("matching");
        const userName = req.body.name;

        let matchedUsers = {};

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
            summoner : userName,
            tier : req.body.tier
        }
        
        let matchFinder = await db.collection('matchTable').findOne({
            tier : req.body.tier
        });

        // matchFinder  == user라면 기존 user Delete
        if (matchFinder == userName){
            let matcherName = await db.collection('matchTable').deleteMany({
                summoner : userName
           });
        } 
        // 매칭 상대가 있다면 매칭테이블에 올리지 않고 바로 return, 기존 매칭 상대 remove
        else if (matchFinder != null && matchFinder != userName) {
            // matchedUsers = {
            //     player1 : matchFinder.summoner,
            //     player2 : userName
            // }

            console.log(matchFinder.summoner, '님과 ', userName, '님 매칭 완료');
            await db.collection('matched').insertOne({
                player1 : matchFinder.summoner,
                player2 : userName
            })

            let matcherName = await db.collection('matchTable').deleteMany(
                {summoner : matchFinder.summoner}
            );
            
            console.log(matchFinder.summoner, '님과 ', userName, '님 매칭 완료');

            return res.status(200).json(matchedUsers);
        }
        
        
        let insertResult = await db.collection('matchTable').insertOne(insertValue);
        
        console.log(userName+'님이 정상적으로 MatchingTable에 올랐습니다.');

        return res.status(200).json('success');

    }catch(er) {
        console.log(userName+ '님 매칭 중 오류 발생')
        return res.status(500).send('실패')
        
    }
    
   


    
}

