// frontend/src/store/notebook.js
import { csrfFetch } from './csrf';

//createNotebook, getNotebooks
const LOAD = 'notebooks/LOAD'
const CREATE = 'notebooks/CREATE';
const EDIT = 'notebooks/EDIT';
const REMOVE = 'notebooks/REMOVE';

const loadAll = notebooks =>({
  type: LOAD,
  notebooks
});

const create = notebook => ({
  type: CREATE,
  notebook
})

const edit = notebook =>({
  type: EDIT,
  notebook
})

const remove = notebookId =>({
  type: REMOVE,
  notebookId
})


export const getAllnoteBooks = () => async dispatch =>{
  const res = await fetch(`/api/notebooks/`);

  if(res.ok){
    const notebooks = await res.json();
    dispatch(loadAll(notebooks));
    return notebooks;
  }
}


export const editNotebook = data => async dispatch =>{
  const res = await fetch(`/api/notebooks/${data.id}/edit`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if(res.ok){
    const note = await res.json();
    dispatch(edit(note));
    return note;
  }

}


export const deletenote = noteId => async dispatch =>{

  const res = await fetch(`/api/notebooks/${noteId}`, {
    method: "DELETE",
  });
  
  if(res.ok){
    const { id: deletedItemId } = await res.json();
    dispatch(remove(deletedItemId));
    return deletedItemId;
  }
}

export const createNotebook = (payload) => async dispatch =>{
  console.log( payload)
  const body = JSON.stringify(payload);
  console.log("in the body",body);
  const res = await csrfFetch(`/api/notebooks`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
      },
    body,
  });

  if(res.ok){
    const newlyCreatedNotebook = await res.json();
    dispatch(create(newlyCreatedNotebook));
    return newlyCreatedNotebook;
  }

}

const initialState = { 
  list:[]
};

const notebookReducer = (state = initialState, action) =>{
  switch(action.type){
    case LOAD:{
      let allnotes = {...state, list:[...state.list]};
      action.allnotes.forEach(note => {
        allnotes[note.id] = note;
      });
      return allnotes
    }
    case CREATE:{
        let newState = {  ...state, list:[...state.list] }
        newState[action.notebook.id] = action.notebook;
        newState.list.push(action.notebook);
        // console.log("testing");
        // console.log(action.notebook)
        // const noteBookList = newState.list.map(id => newState[id]);
        // noteBookList.push(action.notebook);
        return newState;
    }
      case EDIT:{
        return {
          ...state,
          [action.note.id]: action.note
        }
      }
        case REMOVE:{
          let newState = {...state}
          delete newState[action.noteId];
          return newState;
        }
    default:
      return state;
  }
};

export default notebookReducer;