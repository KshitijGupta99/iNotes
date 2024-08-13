import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const ViewNotes = () => {

  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;

  useEffect(() => {
    getNote()
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", etitle: "", econtent: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,  etitle: currentNote.title, econtent: currentNote.content, etag: currentNote.tag })
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.econtent, note.etag)
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <input type="text" className="form-control" id="econtent" name="econtent" value={note.econtent} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='px-3' style={{minHeight : 70 + `vh`, height: `fit-content`}}>
        <h4 className='ms-2'>{(notes.length == 0) ? "No notes here..." : ""}</h4>
        <h6 className='px-2 mt-4 row'>{notes.map((note) => {
          
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}</h6>
      </div></>
  )
}

export default ViewNotes
