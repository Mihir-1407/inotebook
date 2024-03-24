import React from 'react'

const Noteitem = (props) => {
  const {note} = props;
  return (
    <div className= "col-md-4 my-3">
        <div className="card">
        <div className="card-body ">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio explicabo placeat unde quasi eos sed nostrum amet laborum! Officiis, voluptatem beatae eos aspernatur eaque nam earum.</p>
            <i className='fas fa-trash-alt mx-2'></i>
            <i className='fas fa-edit mx-2'></i>
        </div>
        </div>
    </div>
  )
}

export default Noteitem