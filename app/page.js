'use client'
import MatchingBtn from "@/clientComponents/matchingBtn";
import axios from "axios";
import { useEffect, useState } from "react"

export default function Home() {

  const [userName, setUserName] = useState('');
  const [tier, setTier] = useState('');
  
  let apiKey = "RGAPI-eb5b8658-daa1-4119-b44c-9fc72fcadb44";
  let userTier = '';
  let encId = '';
  let userTempName = '';

  useEffect(()=>{
    axios({
      method:"get",
      url: "api/summoner-name",
      headers : "application/json"
    }).then((res)=>{
      userTempName = res.data;
      axios({
        method : "get",
        url : 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ res.data +'?api_key='+apiKey,
        headers : "application/json"
      }).then((result)=>{
        console.log("왜이리 많이 호출되지3");
        encId = result.data.id
        axios({
          method : "get",
          url : insertEncId(encId, apiKey),
          headers : "application/json"
        }).then((result)=>{
          console.log("왜이리 많이 호출되지4");
  
          const res = result.data;
  
          for(let i=0; i<res.length; i++){
            if (res[i].queueType == "RANKED_SOLO_5x5"){
              userTier = res[i].tier + ' '+ res[i].rank;
              setUserName(userTempName);
              setTier(userTier);
            } else {
              userTier = "UnRanked";
              setUserName(userTempName);
              setTier(userTier);
            }
          } // for end
        }) // then end 
      })  // then end 
    });
  }, []); // useEffect end

    

  return (
    <div className="main-info">
      <div className="sub-info">
        <span>소환사 이름 : {userName}</span><br/>
        <span>티어 : {tier}</span><br/>
        <MatchingBtn userName={userName} userTier={userTier}/></div>
    </div>
  )
}


let insertEncId = (encId, apiKey) => {
  let val = 'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ encId +'?api_key=' + apiKey;
  return val;
}
