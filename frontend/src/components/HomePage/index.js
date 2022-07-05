import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, Route, Switch } from "react-router-dom";
import { getAllnoteBooks, deleteNotebook } from "../../store/notebook";
import NoteBookForm from "../NotebookForm";
import { getAllnotes } from "../../store/note"
import Navigation from "../Navigation";

import logo from "./logo.png"
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();
    
    const userId = useSelector((state) => state.session.user);
    const [user, setUser] = useState(false);
    const userNotes = useSelector((state) => Object.values(state.note))
    const userNotebooks = useSelector((state) => Object.values(state.notebook))
    const [isLoaded, setIsLoaded] = useState(false);
    const [notebookId, setNotebookId] = useState();
    const updateNotebookId = (e) => setNotebookId(e.target.value);


    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        .then(()=> setUser(true))
        if(user){
        dispatch(getAllnotes(userId.id))
        .then(dispatch(getAllnoteBooks(userId.id)))
        .then(setIsLoaded(true));
        }
      }, [dispatch, isLoaded, user]);


      const handleSubmit = async (e) => {
        e.preventDefault();
        window.alert("handling form submission...");
        console.log(userId);
        console.log(notebookId);
        // let deletedNotebook = dispatch(deleteNotebook(e));
      };

      return (
        <div>
          <br></br>
                <div className=''>
                  <h3> These are all Of your Notebooks</h3>
                    { userNotebooks.map((notebook) => {
                      console.log("this is a notebook", notebook, notebook.id);
                        return (
                            <>
                            <div className="notebook">
                            <NavLink key={notebook.id} to={`/notebooks/${notebook.id}`}>
                              <div className="innerNotebook">
                                {notebook.title}
                              </div>
                              <br></br>
                            </NavLink>

                              {/* <form onSubmit={handleSubmit}>
                                <textarea
                                hidden
                                type="text"
                                value={notebookId}
                                onChange={e => {updateNotebookId(e)}}
                                  />
                                <button type="submit" className='btnDelete'>Delete {notebook.title}</button>
                              </form> */}
                            </div>
                            
                            </>

                        )

                    })}
                </div>
                <div className='add-notebook'>
                  <NoteBookForm/>
                </div>
            </div>
      );
}


export default HomePage;