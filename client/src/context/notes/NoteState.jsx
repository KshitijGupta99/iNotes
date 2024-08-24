import { responsiveFontSizes } from "@mui/material";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const url = `https://inotes-kwax.onrender.com/notes/`
    const [notes, setNote] = useState([]);

    const getNote = async () => {
        try {
            let response = await fetch(`${url}allnotes`, {
                method: "GET",
                headers: {
                    "auth-token":localStorage.getItem('token'),
                }

            });
            const data = await response.json()
            setNote(data)
        } catch (error) {
            console.log(error)
        }


    }


    //var newnote = []
    // ADD Note
    const addNote = async (title, content, tag) => {
        try {
            let response = await fetch(`${url}newnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, content, tag })
            });
            const newnote = await response.json()
            setNote(notes.concat(newnote));
        } catch (error) {
            console.log(error);
        }


        //Client Side change

    }

    // Edit Note
    const editNote = async (id, title, content, tag) => {
        const response = await fetch(`${url}update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, content, tag })
        });
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].content = content;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNote(newNotes);
    }

    // DEL Note
    const delNote = async (id) => {
        let response = await fetch(`${url}delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token'),
            },
        });



        //Client side Delitioin
        let newNote = notes.filter((note) => { return note._id !== id });
        setNote(newNote)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, delNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;