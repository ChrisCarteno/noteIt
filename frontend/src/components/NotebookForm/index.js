// frontend/src/components/NotebookForm/index.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotebook } from '../../store/notebook';
import './NoteBookFormStyle.css'

const NoteBookForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const user = useSelector(state => state.session.user);
  const updateNotebook = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.alert("handling form submission...");
    const userId = user.id;
    const payload = {
      userId,
      title
    };
    console.log(payload, "this is the payload handlesubmit")
    let createdNotebook = dispatch(createNotebook(payload));
    console.log(createdNotebook);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        NoteBookName
        <textarea
        type="text"
        placeholder="Add a noteBook name"
        value={title}
        onChange={e => {updateNotebook(e)}}
          />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NoteBookForm;