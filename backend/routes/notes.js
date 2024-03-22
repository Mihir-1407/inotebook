const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/notes')
const { body, validationResult } = require('express-validator');

//Route:1 Fetch all notes of a user using GET '/api/notes/fetchallnotes'. Login

try {
    router.get('/fetchallnotes', fetchuser, async (req,res)=>{
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)
    })
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured")
}


//Route:2 Add notes of a user using GET '/api/notes/addnotes'. Login
    router.post('/addnote', fetchuser,[
        body('title','Enter a valid title').isLength({min: 2 }),
        body('description', 'Description must be at least 3 characters').isLength({min: 3 })
    ], async (req,res)=>{
        try {
        const { title, description, tag } = req.body;
        //if there are errors return status code 400 the error message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }
    
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
    
        const savedNote = await note.save();
    
        res.json(savedNote);
   
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured")
  }

})



//Route:3 Update existing notes of a user using PUT '/api/notes/updatenote'. Login
router.put('/updatenote/:id', fetchuser, async (req,res)=>{
    const { title, description, tag } = req.body;

    try {
    //Create a new Note object
    const newNote = {};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Find a note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(400).send("Note not found");}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true});
    res.json(note);
        
    }catch(error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
    
    
})

//Route:4 DELETE existing notes of a user using DELETE '/api/notes/deletenote'. Login
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    const { title, description, tag } = req.body;


    try {
        //Find a note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(400).send("Note not found");}

    //Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("Note has been deleted successfully!");
    }catch(error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
      }    
})
module.exports = router