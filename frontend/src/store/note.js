// frontend/src/store/note.js
import { csrfFetch } from './csrf';

const LOAD = 'notes/LOAD';
// const LOADONE = 'note/LOAD';
const CREATE = 'notes/CREATE';
const EDIT = 'notes/EDIT';
const REMOVE = 'notes/REMOVE';

const loadAll = notes =>({
  type: LOAD,
  notes
});

const loadOne = note => ({
  type: loadOne,
  note
});

const create = note => ({
  type: CREATE,
  note
})

const edit = note =>({
  type: EDIT,
  note
})

const remove = note =>({
  type: REMOVE,
  note
})


export const getAllnotes = (id) => async dispatch =>{
  console.log("inside of the getALlNOtes function, debugging sumthing");
  const res = await csrfFetch(`/api/notes/${id}`);
  console.log(res, "this is the res");
  if(res.ok){
    const notes = await res.json();
    dispatch(loadAll(notes));
    return notes;
  }
}
//get a single note, route
export const getNote = (id) => async dispatch =>{
  const res = await csrfFetch(`/api/note/${id}`);

  if(res.ok){
    const note = await res.json();
    dispatch(loadOne(note));
    return note;
  }

}


export const createNote = payload => async dispatch =>{
  console.log("this the creatNote payload:", payload)
  const body = JSON.stringify(payload);
  console.log("insied of the createNOte funciont thunk, and this is the Body:" , body);

  const res = await csrfFetch(`/api/notes/new`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body,
  });

  if(res.ok){
    const note = await res.json();
    dispatch(create(note));
    return note;
  }

}

export const editNote = payload => async dispatch =>{
  const body = JSON.stringify(payload);
  const noteId = payload.id;
  console.log(noteId);
  const res = await csrfFetch(`/api/note/${noteId}/edit`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json'},
    body,
  });

  if(res.ok){
    const note = await res.json();
    dispatch(edit(note));
    return note;
  }

}

export const deleteNote = noteId => async dispatch =>{

  const res = await csrfFetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });

  if(res.ok){
    const noteId = await res.json();
    dispatch(remove(noteId));
  }
}

const initialState = { };

const notesReducer = (state = initialState, action) =>{
  switch(action.type){
    case LOAD:{
      const allnotes = {...state};
      action.notes.forEach(note => {
        allnotes[note.id] = note;
      });
      return {
        ...allnotes
      }
    }
    case CREATE:{
        let newState = { ...state};
        newState[action.note.id] = action.note;
        return newState;
    }
    case EDIT:{
      let newState = { ...state};
      newState[action.note.id] = action.note;
      return newState;
    }
      case REMOVE:{
        let newState = {...state}
        delete newState[action.note.id];
        return newState;
      }
    default:
      return state;
  }
};

export default notesReducer;