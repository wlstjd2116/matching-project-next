'use client'
import MatchingBtn from "@/clientComponents/matchingBtn";
import SummonerInfo from "@/clientComponents/SummonerInfo";
import axios from "axios";
import { useEffect, useState } from "react"

export default function Home() {

  const [userName, setUserName] = useState('');
  const [tier, setTier] = useState('');
  
  let apiKey = process.env.NEXT_PUBLIC_RIOT_APIKEY;
  let userTier = '';
  let encId = '';
  let userTempName = '';

  useEffect(()=>{
    axios({
      method:"get",
      url: "api/summoner-name",
      headers : "application/json"
    }).then((res)=>{
      if (res.data == null){
        console.log(res.data);
      } else {
        userTempName = res.data;
        axios({
          method : "get",
          url : 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ res.data +'?api_key='+apiKey,
          headers : "application/json"
        }).then((result)=>{
          encId = result.data.id
          axios({
            method : "get",
            url : insertEncId(encId, apiKey),
            headers : "application/json"
          }).then((result)=>{
    
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
        })
      }
        // then end 
    });
  }, []); // useEffect end

    

  return (
    <div className="main-info">
      <div className="sub-info">
        <SummonerInfo userName={userName} tier={tier}/>
        <MatchingBtn userName={userName} userTier={tier}/></div>
    </div>
  )
}


let insertEncId = (encId, apiKey) => {
  let val = 'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ encId +'?api_key=' + apiKey;
  return val;
}
