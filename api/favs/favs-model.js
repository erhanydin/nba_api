const db = require('../../data/db-config');


let allFavsIds;
let favsNumber;
let unique;

function removeDuplicates(arr) {
    unique = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}

async function getAllFavs() {
    const allFavs = await db('favs')
        .leftJoin('users', 'favs.user_id', 'users.user_id')
        .leftJoin('notes', 'favs.favs_id', 'notes.favs_id')
        .select('favs.favs_id', 'users.user_id', 'users.username', 'users.name', 'favs.type', 'favs.type_id', 'notes.note_id', 'notes.note_details', 'notes.note_date')
        

    // console.log(allFavs)

    allFavsIds = [];

    allFavs.map(favs => {
        allFavsIds.push(favs.favs_id)
    })

    console.log("before", allFavsIds);
    console.log('before uniq', unique)
    removeDuplicates(allFavsIds);
    console.log('after', unique)
    

    // function countUnique(iterable) {
    //     return new Set(iterable).size;
    // }

    // console.log(allFavsIds)

    // favsNumber = countUnique(allFavsIds);
    // console.log(favsNumber)

    let favs = [];
    for (let i = 0; i < unique.length; i++) {
        let fav = await getFavsById(unique[i]);
        favs.push(fav);
    }



    return favs;

}



async function getFavsById(favs_id) {
    const favs = await db('favs')
        .leftJoin('users', 'favs.user_id', 'users.user_id')
        .leftJoin('notes', 'favs.favs_id', 'notes.favs_id')
        .select('favs.favs_id', 'users.user_id', 'users.username', 'users.name', 'favs.type', 'favs.type_id', 'notes.note_id', 'notes.note_details', 'notes.note_date')
        .where('favs.favs_id', favs_id)

    // console.log('idli kısım', favs);

    const responseData = {
        favs_id: parseInt(favs_id),
        type: favs[0].type,
        type_id: favs[0].type_id,
        user_id: favs[0].user_id,
        user_name: favs[0].username,
        notes: []
    }

    console.log(favs[0].note_details)

    if (favs[0].note_details === null) {
        return responseData;
    } else {
        favs.forEach((item) => {
            responseData.notes.push({
                "note_id": item.note_id,
                "note_details": item.note_details,
                "note_date": item.note_date
            })
        })
        // console.log(responseData)
        return responseData
    }
}

async function getFavsByUsername(user_id) {
    const allFavs = await db('favs')
        .leftJoin('users', 'favs.user_id', 'users.user_id')
        .leftJoin('notes', 'favs.favs_id', 'notes.favs_id')
        .select('favs.favs_id', 'users.user_id', 'users.username', 'users.name', 'favs.type', 'favs.type_id', 'notes.note_id', 'notes.note_details', 'notes.note_date')
        .where('favs.user_id', user_id)

        allFavsIds = [];

        allFavs.map(favs => {
            allFavsIds.push(favs.favs_id)
        })
        
        console.log('favs usernam ile', allFavs)
        console.log("before", allFavsIds);
        console.log('before uniq', unique)
        removeDuplicates(allFavsIds);
        console.log('after', unique)
    
        let favs2 = [];
        for (let i = 0; i < unique.length; i++) {
            let fav = await getFavsById(unique[i]);
            favs2.push(fav);
        }
        return favs2;
}

async function insertFav(fav) {
    const [willBeInsertedFavId] = await db('favs').insert(fav);
    return await getFavsById(willBeInsertedFavId);
}

async function deleteFav(favs_id) {
    return await db('favs').where('favs_id', favs_id).delete();
}

module.exports = {
    getAllFavs,
    getFavsById,
    insertFav,
    deleteFav,
    getFavsByUsername
}