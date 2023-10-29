import axios from "axios";
import { useState } from "react";

export default function MatchingBtn(props){

    const [status, setStatus] = useState(false);
    const [cssVal, setCssVal] = useState(false);
    let matchingCount = 0;
    let data; 

    return (
        // Match Start & Match End
            <button className="main-btn" onClick={()=>{
                if (status == false) {
                    axios.post('api/matching-start', {
                        name : props.userName,
                        tier : props.userTier
                    }).then((res)=>{
                        setStatus(true)
                        data = res;
                        console.log(data);
                    });
                        setCssVal(true);
                        setTimeout(()=>{setCssVal(false)}, 2000)
                }
                else if (status == true) {
                    axios.post('api/matching-end', {
                        name : props.userName,
                    }).then(setStatus(false));
                    setCssVal(true);
                    setTimeout(()=>{
                        setCssVal(false);
                    }, 2000)

                }
                console.log(status);
                console.log('cssval ; ',cssVal);
            }} disabled={cssVal}>
            {
                status ?
                <p>StopMatching</p> : <p>matchingStart</p>
            }       
            </button>
    )
        
            
}