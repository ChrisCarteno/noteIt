// frontend/src/store/note.js
import { csrfFetch } from './csrf';

const LOAD = 'notes/LOAD'
const CREATE = 'notes/CREATE';
const EDIT = 'notes/EDIT';
const REMOVE = 'notes/REMOVE';

const loadAll = notes =>({
  type: LOAD,
  notes
});

const create = note => ({
  type: CREATE,
  note
})

const edit = note =>({
  type: EDIT,
  note
})

const remove = noteId =>({
  type: REMOVE,
  noteId
})


export const getAllnotes = () => async dispatch =>{
  const res = await fetch('/api/notes');

  if(res.ok){
    const notes = await res.json();

    dispatch(loadAll(notes));
  }
}


export const createnote = payload => async dispatch =>{
  const imageId = payload.imageId;
  const body = JSON.stringify(payload);
  const res = await csrfFetch(`/api/notes/${imageId}`, {
    method: "POST",
    body,
  });

  if(res.ok){
    const note = await res.json();
    dispatch(create(note));
    return note;
  }

}

export const editnote = payload => async dispatch =>{
  const body = JSON.stringify(payload);
  const noteId = payload.id;

  const res = await csrfFetch(`/api/note/${noteId}/edit`, {
    method: "PUT",
    body,
  });

  if(res.ok){
    const note = await res.json();
    dispatch(edit(note));
    return note;
  }

}

export const deletenote = noteId => async dispatch =>{

  const res = await csrfFetch(`/api/notes/${noteId}/delete`, {
    method: "DELETE",
  });

  if(res.ok){
    const noteId = await res.json();
    dispatch(remove(noteId));
    return noteId;
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
        let newState = {
          ...state,
          [action.note.id]: action.note
        }
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

export default notesReducer;