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

    console.log('Golfers: ', golfersArray)

    // create a record for each golfer in each of the competition games table
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