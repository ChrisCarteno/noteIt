import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { deleteNotebook, getAllnoteBooks } from "../../store/notebook";
import { getAllnotes } from "../../store/note";
import NotesForm from "../NotesForm";
import './NoteBookList.css';

const NotebookList = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const user = useSelector((state) => state.session.user);
    const userNotes = useSelector((state) => Object.values(state.note));
    const [isLoad, setIsLoad] = useState(false);
    const notebookList = useSelector((state) => Object.values(state.notebook));

    useEffect(() => {
        dispatch(getAllnotes(user.id))
        .then(dispatch(getAllnoteBooks(user.id)))
    }, [dispatch, notebookList]);
    
    const deleteUserNotebook = (e) => {
        e.preventDefault();
        dispatch(deleteNotebook(id))
        .then(setIsLoad(true))
        .then(() => history.push('/'))
    }
    console.log(userNotes)
    if(isLoad){
        console.log(isLoad);
        history.push('/')
    }
    let sum = 0;
    let theNum;
    notebookList.map((notebook) => {
        if(notebook.id == id){
            theNum = sum
        }else{
            sum++;
        }
    });
    
    return(
        <>
            <h3> Notes for {notebookList[theNum].title}</h3>
            <button className="btnDel" onClick={(e) => deleteUserNotebook(e)}>
                Delete Notebook
            </button>
            <div className='user-notes'>
            {userNotes.length > 0 ? userNotes.map((note) => {
            if(note.notebookId == id){
                console.log(id, note);
            return (
                <div className="noteDiv">
                    <NavLink key={note.id} to={`/note/${note.id}`}>
                        <div className="innerNote">
                            {note.note}
                        </div>
                    </NavLink>
                </div>
            )
            }
        }): <h1>No Notes Currently</h1> }
    </div>
    <NotesForm/>
        </>
    )
}

export default NotebookList;