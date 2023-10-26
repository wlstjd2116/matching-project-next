'use client'
export default function matchingBtn(){
    return (
        <form aciton="api/matching-start" method="POST">
            <button type="submit">
                    MatchingStart
            </button>
        </form>
        
    )
    
}