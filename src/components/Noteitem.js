import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';


const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const {note, updateNote} = props;
  return (
		<div className="col-md-4 my-3">
			<div className="card">
				<div className="card-body ">
					<h5 className="card-title">{note.title}</h5>
					<p className="card-text">{note.description}</p>
					<i
						className="fas fa-trash-alt mx-2"
						onClick={() => {
							deleteNote(note._id);
							props.showAlert("Deleted Successfully", "success");
						}}></i>
					<i
						className="fas fa-edit mx-2"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
						onClick={() => {
							updateNote(note);
						}}></i>
				</div>
			</div>
		</div>
	);
}

export default Noteitem