// frontend/src/store/notebook.js
import { csrfFetch } from './csrf';

//createNotebook, getNotebooks
const LOADONE = 'notebooks/LOADONE'
const LOADALL = 'notebooks/LOADALL'
const LOADNOTES = 'notebooks/LOADNOTES'
const CREATE = 'notebooks/CREATE';
const REMOVE = 'notebooks/REMOVE';

const loadAll = notebooks =>({
  type: LOADALL,
  notebooks
});
const loadONE = notebook =>({
  type: LOADONE,
  notebook
});
const loadNOTES = notes =>({
  type: LOADNOTES,
  notes
});
const create = notebook => ({
  type: CREATE,
  notebook
})

const remove = notebook =>({
  type: REMOVE,
  notebook
})


export const getAllnoteBooks = (userId) => async dispatch =>{
  console.log("inside of the getAllNotebooks function")

  const res = await fetch(`/api/notebooks/${userId}`);

  if(res.ok){
    console.log("inside of the getAllNotebooks function res.ok")
    const notebooks = await res.json();
    console.log(notebooks);
    dispatch(loadAll(notebooks));
    console.log(notebooks);
    return notebooks;
  }
}

export const getNotebookNotes = (notebookId) => async dispatch =>{
  const res = await fetch(`/api/notebooks/${notebookId}/notes`);

  if(res.ok){
    const notes = await res.json();
    console.log(notes)
    dispatch(loadNOTES(notes));
    return notes;
  }
}
export const getNotebook = (notebookId) => async dispatch =>{

  const res = await fetch(`/api/notebooks/${notebookId}`);

  if(res.ok){
    console.log("inside of the getNotebook function res.ok")
    const notebook = await res.json();
    console.log(notebook)
    dispatch(loadONE(notebook));
    return notebook;
  }
}

export const deleteNotebook = notebookId => async dispatch =>{
  console.log("deleting", notebookId)
  const res = await csrfFetch(`/api/notebooks/${notebookId}`, {
    method: "DELETE",
  });
  
  if(res.ok){
    const notebookId = await res.json();
    dispatch(remove(notebookId));
    console.log(notebookId);
    return notebookId;
  }
}

export const createNotebook = (payload) => async dispatch =>{
  const { userId, title} = payload;
  console.log("inside of createNotebook, notebook.js story", userId, title);
  const res = await csrfFetch(`/api/notebooks/new`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      title 
    }),
  });
    console.log('inside of res.ok noteboook createdFolder')
    const newlyCreatedNotebook = await res.json();
    dispatch(create(newlyCreatedNotebook));
    return newlyCreatedNotebook;
}

const initialState = { };

const notebookReducer = (state = initialState, action) =>{
  switch(action.type){
    case LOADALL:{
      let allnotes = {...state};
      action.notebooks.forEach(notebook => {
        allnotes[notebook.id] = notebook;
      });
      return allnotes
    }
    case LOADNOTES: {
      let newState = { ...state }
      newState['notes'] = action.notes
      return newState;
  }
  case LOADONE: {
      let newState = { ...state }
      newState[action.notebook.id] = action.notebook
      return newState;
  }
    case CREATE:{
      let newState = {  ...state }
      console.log(newState);
      newState[action.notebook.id] = action.notebook;   
      // console.log("testing");
      // console.log(action.notebook)
      // const noteBookList = newState.list.map(id => newState[id]);
      // noteBookList.push(action.notebook);
      return newState;
    }
    case REMOVE:{
      let newState = {...state}
      delete newState[action.notebook];
      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
};

export default notebookReducer;