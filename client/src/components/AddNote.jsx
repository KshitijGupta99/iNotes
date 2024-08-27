import noteContext from '../context/notes/NoteContext';
import React, { useContext, useState, useEffect } from 'react';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", content: "", tag: "General" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.content, note.tag);
        appendAlert('Note added successfully!', 'success');
        setNote({ title: "", content: "", tag: "General" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

        const appendAlert = (message, type) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                `   <div>${message}</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>'
            ].join('');

            if (alertPlaceholder) {
                alertPlaceholder.append(wrapper);
            } else {
                console.error('Alert placeholder element not found.');
            }
        };

        
    }, []); // Empty dependency array ensures this runs only on mount and unmount

    return (
        <div className='container my-2'>
            <div id="liveAlertPlaceholder"></div>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"><h3>Title</h3></label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label"><h3>Content</h3></label>
                    <input type="text" className="form-control" id="content" name='content' onChange={onChange} value={note.content} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label"><h3>Tag</h3></label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                </div>
                <button type="submit" className="btn btn-primary" id='liveAlertBtn' onClick={handleClick}>Add</button>
            </form>
        </div>
    );
}

export default AddNote;
