import axios from "axios";
import { useEffect, useState } from "react";

export default function MatchingBtn(props){

    const [status, setStatus] = useState(false);
    const [cssVal, setCssVal] = useState(false);
    let matchingCount = 0;
    let data; 
    let getUserList = setInterval(callback, 2000);

    function callback() {

        axios.post('api/matching', {
            user : props.userName
        }).then((res)=>{
            console.log(res.data);
        });

    }
    useEffect(()=>{
        if(status  == true){
            console.log('if : ',getUserList);
            //getUserList;
        }else if (status == false){
            console.log('else if : ',getUserList);
            clearInterval(getUserList);
        }
    }, [status]);

    return (
        // Match Start & Match End
            <button className="main-btn" onClick={()=>{
                if (status == false) {
                    axios.post('api/matching-start', {
                        name : props.userName,
                        tier : props.userTier
                    }).then((res)=>{
                        setStatus(true)
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

            }} disabled={cssVal}>
            {
                status ?
                <p>StopMatching</p> : <p>matchingStart</p>
            }       
            </button>
    )
        
            
}