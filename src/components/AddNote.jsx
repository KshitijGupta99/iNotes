import noteContext from '../context/notes/NoteContext';
import React, { useContext, useState, useEffect } from 'react';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", content: "", tag: "Genrel" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.content, note.tag);
        appendAlert('Note added successfully!', 'success'); // Show alert on successful note addition
        setNote({ title: "", content: "", tag: "Genrel" }); // Reset note after adding
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');

        alertPlaceholder.append(wrapper);
    }

    useEffect(() => {
        const alertTrigger = document.getElementById('liveAlertBtn');
        if (alertTrigger) {
            const handleAlertClick = () => {
                appendAlert('Nice, you triggered this alert message!', 'success');
            };
            alertTrigger.addEventListener('click', handleAlertClick);

            // Cleanup function to remove the event listener
            return () => {
                alertTrigger.removeEventListener('click', handleAlertClick);
            };
        }
    }, []); // Empty dependency array ensures this runs only on mount and unmount

    return (
        <div className='container my-2'>
            <div id="liveAlertPlaceholder"> </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label"><h3>Title</h3></label>
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
