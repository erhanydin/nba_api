const router = require('express').Router();
const notesModel = require('./notes-model');

router.get('/', async (req, res, next) => {
    try {
        let notes = await notesModel.getAllNotes();
        res.json(notes);
    } catch (error) {
        next(error);
    }
})

router.get('/:note_id', async (req, res, next) => {
    try {
        let note = await notesModel.getNotesById(req.params.note_id);
        res.json(note);
    } catch (error) {
        next(error);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { note_details } = req.body;
        if (!note_details) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksik' });
        } else {
            const newNote = {
                note_details: note_details,
                note_date: new Date().toLocaleString(),
                favs_id: req.body.favs_id
            }

            let willBeInsertedNote = await notesModel.insertNote(newNote);
            res.status(201).json(willBeInsertedNote);
        }
    } catch (error) {
        next(error);
    }
})

router.put("/:note_id", async (req, res, next) => {
    try {
        const { note_details } = req.body;
        if (!note_details) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksik' });
        } else {
            const newNote = {
                note_details: note_details,
                note_date: new Date().toLocaleString(),
                favs_id: req.body.favs_id
            }

            let willBeUpdatedNote = await notesModel.updateNote(newNote, req.params.note_id);
            res.status(201).json(willBeUpdatedNote);
        }
    } catch (error) {
        next(error);
    }
})

router.delete("/:note_id", async (req, res, next) => {
    try {
        let willBeDeletedNote = await notesModel.deleteNote(req.params.note_id);
        res.json(willBeDeletedNote);
    } catch (error) {
        next(error);
    }
})


module.exports = router;