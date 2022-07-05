import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { getAllnoteBooks, deleteNotebook, getNotebookNotes } from "../../store/notebook";

const NotebookList = () =>{
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector((state) => state.session.user)
    const userNotes = useSelector((state) => state.notebook.notes)
    const notebookList = useSelector((state) => Object.values(state.notebook));
    console.log(notebookList);

    useEffect(() =>{
        dispatch(getAllnoteBooks());
    }, [dispatch]);
    console.log(notebookList);

    const deleteNotebook = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteNotebook(id))
    }
    
    return(
        <>
            <h1> Notebook List</h1>
            {notebookList?.map(({id, name})=>(
                <p key={id}>{name}</p>
            ))}

<div className='user-notes'>
        {userNotes?.length > 0 ? userNotes?.map((note) => {
            return (
                <NavLink key={`${note?.id}`} to={`/note/${note?.id}`}>
                    <div>
                        {note?.title}
                    </div>
                    <div>
                        {note?.content}
                    </div>
                </NavLink>
            )

        }): <h1>No Notes Currently</h1> }
    </div>
        </>
    )
}

export default NotebookList;