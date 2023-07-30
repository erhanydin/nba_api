const db = require('../../data/db-config');


async function getAllNotes() {
    const allNotes = await db('notes');
    return allNotes
}

async function getNotesById(note_id) {
    const allNotes = await db('notes').where('note_id', note_id).first();
    return allNotes;
}

async function insertNote(note) {
    const [willBeInsertedNoteId] = await db('notes').insert(note);
    return await getNotesById(willBeInsertedNoteId);
}

async function updateNote(note, note_id) {
    await db('notes').where('note_id', note_id).update(note);
    return await getNotesById(note_id);
}

async function deleteNote(note_id) {
    return await db('notes').where('note_id', note_id).delete();
}

module.exports = {
    getAllNotes,
    getNotesById,
    insertNote,
    updateNote,
    deleteNote
}



