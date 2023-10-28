import axios from "axios";
import { useState } from "react";

export default function MatchingBtn(userName, userTier){

    const [status, setStatus] = useState(false);



        
    return (
            <button className="main-btn" onClick={()=>{
                console.log('test1')
                if (status == false) {
                    console.log('test2')
                    
                    axios({
                        method : "post",
                        url : 'api/matching-start',
                        headers : "application/json",
                        body : [{
                            name : userName,
                            tier : userTier
                        }]
                      }).then(()=>{
                        setStatus(true);
                      })
                }
                else if (status == true) {
                    console.log('test3')
                    axios({
                        method : "post",
                        url : 'api/matching-end',
                        headers : "application/json",
                        body : userName
                      }).then(()=>{
                        setStatus(false);
                      })
                }
            }}>
            {
                status ?
                <p>StopMatching</p> : <p>matchingStart</p>
            }       
            
            </button>
    )
        
            
}