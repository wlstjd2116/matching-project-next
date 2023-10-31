import axios from "axios";
import { useEffect, useState } from "react";

export default function MatchingBtn(props){

    const [status, setStatus] = useState(false);
    const [cssVal, setCssVal] = useState(false);
    const [UserList, setUserList] = useState(null);

    let matchingCount = 0;
    let data; 

    useEffect(()=>{
        if(status){
            const intervalId = setInterval(()=>{
                axios.post('api/matching', {
                    user : props.userName
                }).then((res)=>{
                    console.log(res.data);
                })
            }, 2000);

            setUserList(intervalId);
        }else {
            // when status == false => clearInterval
            clearInterval(UserList);
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