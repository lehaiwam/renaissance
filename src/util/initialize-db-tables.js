import { db } from '../firebaseConfig'
import { collection, doc, setDoc, query, getDocs } from "firebase/firestore"; 

export const createDbTables = async (newTable) => {
    
    const tablesArray = [
        'medal-1', 'medal-2', 'medal-3', 'medal-4', 'medal-5', 'medal-6', 'medal-7', 'medal-8', 'coc', 'ips-1', 'ips-2', 'ips-3', 'ips-4', 'tubs-memorial'
    ]


    // read all data from migs
    const golfersArray = []
    const sourceTable = 'migs'
    const q = query(collection(db, sourceTable))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
        console.log('MIGS table is empty? This can never be!!!')
        setErrorMessage('MIGS table is empty? This can never be!!!')
        return
    } else {
        querySnapshot.forEach( async (docket) => {
            // docket.data() is never undefined for query doc snapshots
            // console.log(docket.id, " => ", docket.data().firstName, docket.data().lastName )
            golfersArray.push({
                id: docket.id, 
                firstName: docket.data().firstName,
                lastName: docket.data().lastName,
            })
        })
    }

    // console.log('Golfers: ', golfersArray)

    
    tablesArray.forEach( (tab) => {

        let initScore
        if (tab.slice(0,3) === 'med' || tab.slice(0,3) === 'tub') {
            initScore = 200
        } else {
            initScore = 0
        }
        console.log('\n   Creating table : ', tab, ", InitScore: ", initScore )
        
        const newTableRef = collection(db, tab)

        golfersArray.forEach( async (golfer) => {
            console.log("      for golfer: ", golfer)

            // create a record in the newTable for each golfer in MIGS
            await setDoc( doc(newTableRef, golfer.id), {
                firstName: golfer.firstName, 
                lastName: golfer.lastName,
                confirmed: false,
                score: initScore,
            });

        })
    })  
}