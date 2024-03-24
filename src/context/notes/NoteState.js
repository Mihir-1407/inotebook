import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{

    const notesInitial = [
      {
        "_id": "65fd3458eb8274e0707ddd08",
        "user": "65fac9f09e88efe78c4232ad",
        "title": "Hello World",
        "description": "Go for greatness",
        "tag": "Personal",
        "date": "2024-03-22T07:33:44.670Z",
        "__v": 0
      },
      {
        "_id": "65fd517e34d0b5c8cb19200d",
        "user": "65fac9f09e88efe78c4232ad",
        "title": "Hello",
        "description": "Go for greatness2",
        "tag": "Personal2",
        "date": "2024-03-22T09:38:06.489Z",
        "__v": 0
      },
      {
        "_id": "65fd3458eb8274e0707ddd028",
        "user": "65fac9f09e88efe78c4232ad",
        "title": "Hello World",
        "description": "Go for greatness",
        "tag": "Personal",
        "date": "2024-03-22T07:33:44.670Z",
        "__v": 0
      },
      {
        "_id": "65fd517e34d0b5c8cb192500d",
        "user": "65fac9f09e88efe78c4232ad",
        "title": "Hello",
        "description": "Go for greatness2",
        "tag": "Personal2",
        "date": "2024-03-22T09:38:06.489Z",
        "__v": 0
      },
      {
        "_id": "65fd3458eb8274e07507ddd08",
        "user": "65fac9f09e88efe78c4232ad",
        "title": "Hello World",
        "description": "Go for greatness",
        "tag": "Personal",
        "date": "2024-03-22T07:33:44.670Z",
        "__v": 0
      },
      ]


    const [notes, setNotes] = useState(notesInitial)


    // Add a note
    const addNote = (title, description, tag)=>{

      console.log("Adding a new Note");
      const note = {
        "_id": "65fd517e34d0b5c88cb19200d",
        "user": "65fac9f09e88efe78c4232ad",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-03-22T09:38:06.489Z",
        "__v": 0
      };
      setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = (note)=>{
      
    }

    // Edit a note
    const editNote = (note)=>{
      
    }


    return(
        <NoteContext.Provider value ={{notes,addNote,deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;