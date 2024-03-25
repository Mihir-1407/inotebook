import NoteContext from '../context/notes/NoteContext';
import React, { useContext, useEffect, useState,useRef } from 'react'
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';



const Notes = () => {
  const context = useContext(NoteContext);
  const {notes,getNotes,editNote} = context;
  const [note,setNote] = useState({id:"" ,etitle: "", edescription:"", etag:""})

  useEffect(() => {
     getNotes();
     // eslint-disable-next-line
  }, [])

  const refClose = useRef(null);
  const updateNote = (currentNote)=>{
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }


  const handleClick = (e)=>{
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name] : e.target.value})
  }

  

  return (
    <>
    <AddNotes/>
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="etitle" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle"  value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">Description</label>
              <input type="text" className="form-control" id="edescription"  value={note.edescription} name="edescription" onChange={onChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange}/>
            </div>
          </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<3 || note.edescription.length<3} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
    <h2>Your Notes</h2>
    <div className="container"> {notes.length===0 && 'No notes to display'}</div>
   
    {notes.map((note)=>{
      return <Noteitem key={note._id} updateNote={updateNote} note={note}/>;
    })}
    </div>
    </>

  )
}

export default Notes