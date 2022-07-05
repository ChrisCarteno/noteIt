//NotebookLIst
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import { deleteNote, editNote, getAllnotes } from "../../store/note";
import { getAllnoteBooks } from "../../store/notebook";

import EditNoteForm from "../EditNoteForm";

import './NotesList.css'

const Note = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const id = useParams();
    const userNotes = useSelector((state) => Object.values(state.note));
    const [isLoad, setIsLoad] = useState(false);

    console.log(isLoad);
    useEffect(() => {
        dispatch(getAllnotes(user.id))
        .then(dispatch(getAllnoteBooks(user.id)))
    }, [dispatch, isLoad, userNotes]);
    
    console.log(id.id);
    const deleteUserNote = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("dispatching deleteNote", id.id);
        dispatch(deleteNote(id.id))
        .then(setIsLoad(true))
        .then(() => history.push('/'))
    }

    if(isLoad){
        console.log(isLoad);
        history.push('/')
    }

    const notebookList = useSelector((state) => Object.values(state.notebook));
    let sum = 0;
    let theNum;
    userNotes.map((note) => {
        if(note.id == id.id){
            theNum = sum
        }else{
            sum++;
        }
    });
    let sum2 = 0;
    let theNum2;
    notebookList.map((notebook) => {
        if(notebook.id == userNotes[theNum].notebookId){
            theNum2 = sum2
        }else{
            sum2++;
        }
    });
    console.log(userNotes[theNum].notebookId, notebookList)
    return (
        <div>
            <h3> Notes for {notebookList[theNum2].title}</h3>
                <button className="btnLogout" onClick={(e) => deleteUserNote(e)}>
                    Delete Note
                </button>
            <div className="center">
                <div className="noteee">
                    <div className="innerNote">
                    {userNotes[theNum].note}
                    </div>   
                </div>
            </div>
            <EditNoteForm oldNote={userNotes[theNum].note}/>
        </div>
    )
}

export default Note;