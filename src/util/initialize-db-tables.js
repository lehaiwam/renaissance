import { db } from '../firebaseConfig'
import { collection, doc, setDoc, query, getDocs, getDoc } from "firebase/firestore"; 

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

    console.log('Golfers: ', golfersArray)

    // create a record for each golfer in each of the competition games table
    tablesArray.forEach( (tab) => {
        let initScore = 0
        if (tab.slice(0,3) === 'med' || tab.slice(0,3) === 'coc') {
            initScore = 200
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
            })
        })
    }) 

    console.log("\n     Done creating the different competition tables, now creating all-scores record for each golfer...")
    // we now need to create the all scores record for each golfer, one table that contains all the golfer's scores, e.g.
    // qewert324ds, chippa, ndenga, scores[{title:'ips-1, score:0}, {title:'medal-1, score:200, {etc...} ]
    const allScoresTableRef = collection(db, 'all-scores')
    golfersArray.forEach( async (golfer) => {
        console.log("\n         creating all-scores for golfer: ", golfer)
        // create a record in the newTable for each golfer in MIGS
        await setDoc( doc(allScoresTableRef, golfer.id), {
            firstName: golfer.firstName, 
            lastName: golfer.lastName,
            scores : [
                {title: 'ips-1', score: 0},
                {title: 'ips-2', score: 0},
                {title: 'ips-3', score: 0},
                {title: 'ips-4', score: 0},
                {title: 'medal-1', score: 200},
                {title: 'medal-2', score: 200},
                {title: 'medal-3', score: 200},
                {title: 'medal-4', score: 200},
                {title: 'medal-5', score: 200},
                {title: 'medal-6', score: 200},
                {title: 'medal-7', score: 200},
                {title: 'medal-8', score: 200},
                {title: 'coc', score: 0},
                {title: 'tubs', score: 200}, 
            ]
        })
    })
    console.log("\n     Done with all-scores table!!!")
}


//
import { storage } from '../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export const uploadProfileImage = async (imageFile, newFileName) => {
    console.log('\n\n  1. Inside uploadProfileImage() ... ')
    console.log('\n    1.1 imageFile: ', imageFile)
    console.log('\n    1.2 newFileName: ', newFileName)

    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `profile-images/${newFileName}`);
    const uploadTask = uploadBytes(storageRef, imageFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('\n   2. Upload is ' + progress + '% done');

            switch (snapshot.state) {
                case 'paused':
                    console.log('\n    2.1 Upload is paused');
                    break;
                case 'running':
                    console.log('\n    2.2 Upload is running');
                    break;
            }
        }, 
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    console.log('\n   2.3 User does NOT have permission to access the object')
                    break;
                case 'storage/canceled':
                    console.log('\n   2.4 User canceled the upload')
                    break;
                case 'storage/unknown':
                    console.log('\n   2.5 Unknown error occurred, inspect error.serverResponse')
                    break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('\n   3. File available at', downloadURL);
            });
        }
    )
    console.log('\n  Exiting uploadProfileImage()')
}


//
import { MedalOne, MedalTwo, MedalThree, MedalFour, MedalFive, MedalSix, MedalSeven, MedalEight,} from '../data/Scores'

import { IpsOne, IpsTwo, IpsThree, IpsFour, TubsMemorial, ChampOfChamps } from '../data/Scores'


const GamesDataDefs = [
    { title: 'medal-1', data: MedalOne },
    { title: 'medal-2', data: MedalTwo }, 
    { title: 'medal-3', data: MedalThree },
    { title: 'medal-4', data: MedalFour }, 
    { title: 'medal-5', data: MedalFive },
    { title: 'medal-6', data: MedalSix }, 
    { title: 'medal-7', data: MedalSeven },
    { title: 'medal-8', data: MedalEight }, 
    { title: 'ips-1', data: IpsOne },
    { title: 'ips-2', data: IpsTwo }, 
    { title: 'ips-3', data: IpsThree },
    { title: 'ips-4', data: IpsFour }, 
    { title: 'coc',  data: 'ChampOfChamps'},
    { title: 'tubs-memorial', data: 'TubsMemorial'},
]



export const updateGameScores = async ( inputTitle ) => {

    console.log('\n  updateGameScores() - Updating game scores for...', inputTitle)

    let gameData
    GamesDataDefs.map((item) => {
        if (item.title === inputTitle) {
            item.data.map((golfer) => {

                console.log( golfer.id, golfer.name, golfer.score)

                const nameArr = golfer.name.split(' ')
                const fname = nameArr[0]
                const lname= nameArr[1]
                let confirmationFlag = false
        
                if (golfer.score !== 0 && golfer.score !== 200) {
                    confirmationFlag = true
                }

                const titleCollectionRef = doc(db, inputTitle, golfer.id);
                
                setDoc(titleCollectionRef, 
                    { 
                        firstName: fname, 
                        lastName: lname,
                        score: golfer.score,
                        confirmed: confirmationFlag,
                    }, 
                    { 
                        merge: true 
                    });
                 
                /********* CORRECT UP TO HERE ....  */


                console.log('\n   Hivi sasa kuunda ALL-SCORES rekodi... ', golfer.name)
                console.log('\n   Right now creating ALL-SCORES record... ', golfer.name)
                // update the all-scores table as well
                let arrayTempScores = []
                let defaultScore = 0
                if (inputTitle.slice(0,3) === 'med' || inputTitle.slice(0,3) === 'coc') {
                    defaultScore = 200
                }

                // read all-start record first
                const docRef = doc(db, "all-scores", golfer.id)
                getDoc(docRef)
                .then( (docSnap) => {
                    if (docSnap.exists()) {
                        //console.log("Document data:", docSnap.data().firstName, docSnap.data().scores)
                        let arrayTempScores = [...docSnap.data().scores]

                        if (golfer.id === 'NonA5roGtn0A9n5RFyWs') { 
                            console.log('\n   Before Image: ', arrayTempScores)
                        }
                        
                        for ( let i=0; i<arrayTempScores.length; i++ ){
                            if (arrayTempScores[i].title === inputTitle) {
                                arrayTempScores[i].score = golfer.score
                            }
                        }

                        if (golfer.id === 'NonA5roGtn0A9n5RFyWs') { 
                            console.log('\n   After Image: ', arrayTempScores)
                        }
                        
                    
                        setDoc(docRef, 
                            { 
                                scores: arrayTempScores,
                            }, 
                            { 
                                merge: true 
                            });
                    

                    } else {
                        // docSnap.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
                .catch( (err) => {
                    console.log('Error from getDoc() all-scores collection: ', err)
                })

                console.log('\n   Nimekamilisha kuunda ALL-SCORES rekodi! ')
                console.log('\n   I have completed creating ALL-SCORES record! ')
                console.log('... updated: ',  golfer.name)
            })
        }
    })

}