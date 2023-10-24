export const currentCompetionStanding = ( type, arrScores ) => {
    // console.log(' In currentCompetionStanding(): ', type , arrScores)
    let currOverAllScore = 0
    const workingScoresArray = [...arrScores]

    if (type === 'medal') {
        const MAX_MEDAL_SCORE = 200
        const MAX_MEDAL_GAMES = 6
        
        for (let i=0;i<MAX_MEDAL_GAMES;i++) {
            let arrMinValue = MAX_MEDAL_SCORE
            let targetIndex = -1

            for (let j=0; j<workingScoresArray.length; j++) {
                //console.log( j, workingScoresArray[j], arrMinValue )
                if (workingScoresArray[j] < arrMinValue) {
                    arrMinValue = workingScoresArray[j]
                    targetIndex = j
                }
            }
            //console.log('MEDAL: Adding to score total...', arrMinValue )
            currOverAllScore += arrMinValue
            workingScoresArray[targetIndex] = MAX_MEDAL_SCORE
        }
    } else if (type === 'stableford') {
        const MIN_IPS_SCORE = 0
        const MAX_IPS_GAMES = 3
        
        for (let i=0;i<MAX_IPS_GAMES;i++) {
            let arrMaxValue = MIN_IPS_SCORE
            let targetIndex = -1

            for (let j=0; j<workingScoresArray.length; j++) {
                //console.log( j, workingScoresArray[j], arrMaxValue )
                if (workingScoresArray[j] > arrMaxValue) {
                    arrMaxValue = workingScoresArray[j]
                    targetIndex = j
                }
            }
            //console.log('IPS: Adding to score total...', arrMaxValue)
            currOverAllScore += arrMaxValue
            workingScoresArray[targetIndex] = MIN_IPS_SCORE
        } 
    }
    return currOverAllScore
}