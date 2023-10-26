'use client'
import axios from "axios";
import { useEffect, useState } from "react"

export default function Home() {
  let apiKey = "RGAPI-4bf6d170-f04e-495e-9651-46dbf051126d";
  let userTier = '';
  let userSummonerName = '노란후추';
  let encId = '';
  let getSummonerNameUrlByName = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ userSummonerName+'?api_key='+apiKey;
  useEffect(()=>{
    axios({
      method : "get",
      url : getSummonerNameUrlByName,
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
          } else {
            userTier = "UnRanked";
          }
        } // for end
      }) // then end 
    })  // then end 
  }); // useEffect end

  return (
    <div>
      <form action="/api/matching-start" method='POST'>
        <button className='main-btn'>Matching Start</button>
      </form>
    </div>
  )
}


let insertEncId = (encId, apiKey) => {
  let val = 'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ encId +'?api_key=' + apiKey;
  return val;
}
