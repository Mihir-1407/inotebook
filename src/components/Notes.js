import NoteContext from '../context/notes/NoteContext';
import React, { useContext } from 'react'
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';



const Notes = () => {
  const context = useContext(NoteContext);
  const {notes, addNote} = context;
  return (
    <>
    <AddNotes/>
    <div className="row my-3">
    <h2>Your Notes</h2>
    {notes.map((note)=>{
      return <Noteitem key={note._id} note={note}/>;
    })}
    </div>
    </>

  )
}

export default Notes