import noteContext from '../context/notes/NoteContext';
import React, { useContext, useState } from 'react';

const AddNote = () => {
    
    const context = useContext(noteContext);
    const {addNote} = context;


    const [note, setNote] = useState({title: "", content: "", tag: "Genrel"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.content, note.tag);
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    

    return (
        <div className='container my-2'>
            <form>
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label"><h3>Title</h3></label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label"><h3>Content</h3></label>
                    <input type="text" className="form-control" id="content" name='content' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label"><h3>Tag</h3></label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary"  onClick={handleClick}>Add</button>
            </form>
        </div>
    )
}

export default AddNote
