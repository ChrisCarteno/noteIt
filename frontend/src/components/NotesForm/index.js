// frontend/src/components/NoteForm/index.js
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createNote } from '../../store/note';
import { useParams } from 'react-router-dom';
import './NotesFormStyle.css'

function NotesForm() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const notebookId = id;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("handling form submission...");
    const userId = user.id;
    const payload = {
      userId,
      notebookId,
      note,
    };
    if (note.length > 4) {
      setErrors([]);
      return dispatch(createNote(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors(['Note must be at least 4 characters',`current length ${note.length}`]);
  }
  return (
    <form  onSubmit={handleSubmit}>
      <div className="box4">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <h2> Creat a New Note</h2>
        <textarea
        required
        id="notes"
        type="text"
        placeholder="Add a some notes"
        value={note}
        onChange={e => {
          setNote(e.target.value)}}
          />
          <br></br>
      <button type="submit" className='btnLogout'>Submit</button>

      </div>
    </form>
  );
}

export default NotesForm;