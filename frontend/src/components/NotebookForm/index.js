// frontend/src/components/NotebookForm/index.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNotebook, getAllnoteBooks } from '../../store/notebook';
import './NoteBookFormStyle.css'

const NoteBookForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const userId = 1;
  const updateNotebook = (e) => setName(e.target.value);

  // useEffect(() => {
  //   dispatch(getAllnoteBooks ());
  // }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.alert("handling form submission...");
    const payload = {
      userId,
      name
    };
    
    let createdNotebook = await dispatch(createNotebook(payload));
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        NoteBookName
        <textarea
        type="text"
        placeholder="Add a noteBook name"
        value={name}
        onChange={updateNotebook}
          />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NoteBookForm;