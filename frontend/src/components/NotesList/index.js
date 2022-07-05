import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import { deleteNote, editNote, getAllnotes } from "../../store/note";

const NotesList = () =>{
    const dispatch = useDispatch();
    const history = useHistory()
    const id = useParams();
    const notesList = useSelector((state) => Object.values(state.notebook));
    console.log(notesList);

    useEffect(() =>{
        dispatch(getAllnotes());
    }, [dispatch]);
    console.log(notesList);

const editUserNote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(editNote(id))
}

const deleteUserNote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteNote(id))
    .then(()=>{
        history.push(`/notebooks/${notebookId}`)
    })
}
    return (
        <div>
            <h1>Note Title</h1>
            <p>Note Body</p>
            <button onClick={(e)=> editUserNote(e)}>
                Edit Note</button>
            <button onClick={(e) => deleteUserNote(e)}>
                Delete Note
            </button>
        </div>
    )
}

export default NotesList;