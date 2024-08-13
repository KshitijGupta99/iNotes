const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchData = require('../middleware/fetchData.js');
const Notes = require('../modals/Note');
//const jwt = require('jsonwebtoken');


//Router to get all notes
router.get('/allnotes', fetchData, async (req, res) => {
    //const errors = validationResult(req);
    try {
        const notes = await Notes.find({ user: req.user.id });
        if (notes.length == 0){ return res.send([])};
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})



//Router to add notes
router.post('/newnote', fetchData, [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        console.log('New Note:', req.body);

        //saving a new note
        const { title, content, tag } = req.body;
        const newNote = new Notes({
            title,
            content,
            tag,
            user: req.user.id
        });
        const savedNote = await newNote.save();

        res.json(savedNote);


    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})



//Router to update a note
router.put('/update/:id', fetchData, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { title, content, tag } = req.body;
    if (!title && !content && !tag) {
        return res.status(400).send("No fields to update");
    }
    const newNote = {};

    newNote.title = title;
    newNote.content = content;
    newNote.tag = tag;


    let note = await Notes.findById(req.params.id);

    if (!note) { return res.status(404).send("NotFound") };           //checking note exsistance

    if (note.user.toString() !== req.user.id) {                         //checking user exsistance
        return res.status(403).send("Forbidden");
    }

    //updating the note
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })

})


//Route to delete a Note...

router.delete('/delete/:id', fetchData, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {

        let note = await Notes.findById(req.params.id);

        if (!note) { return res.status(404).send("NotFound") };           //checking note exsistance

        if (note.user.toString() !== req.user.id) {                         //checking user exsistance
            return res.status(403).send("Forbidden");
        }
        const title = note.title
        //updating the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" , title : title});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})



module.exports = router;