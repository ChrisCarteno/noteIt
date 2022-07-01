// frontend/src/components/RoomPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './NotesFormStyle.css'

function NotesForm() {

  // userId: 2,
  //   notebookId: 1,
  //   note: "this is a note"
  const dispatch = useDispatch();

  const [note, setNote] = useState("");
  let userId =1;
  let notebookId =1;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("handling form submission...");

    setNote("");
    dispatch()
    .then(()=>dispatch());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
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