// frontend/src/components/NoteForm/index.js
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createNote } from '../../store/note';
import { useParams } from 'react-router-dom';
import './NotesFormStyle.css'

function NotesForm() {

  // userId: 2,
  //   notebookId: 1,
  //   note: "this is a note"
  const dispatch = useDispatch();
  const  notebookId  = 1;
  const [note, setNote] = useState("");
  const user = useSelector(state => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("handling form submission...");
    const userId = user.id;
    const payload = {
      userId,
      notebookId,
      note,
    };
    let createdNote =  dispatch(createNote(payload));
    console.log("this is youre note" , createdNote);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Note
        <textarea
        id="notes"
        type="text"
        placeholder="Add a some notes"
        value={note}
        onChange={e => {
          setNote(e.target.value)}}
          />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NotesForm;