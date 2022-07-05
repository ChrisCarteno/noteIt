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
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.alert("handling form submission...");
    const userId = user.id;
    console.log(title.length);
    const payload = {
      userId,
      title
    };
    if (title.length > 4) {
      setErrors([]);
      return dispatch(createNotebook(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors(['Notebook must be at least 4 characters',`current length ${title.length}`]);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div  className='box4' >
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
        <h2>Create A New NoteBook Here</h2>
        <textarea
        required
        type="text"
        placeholder="Add a noteBook name"
        value={title}
        onChange={e => {updateNotebook(e)}}
          />
        <br></br>
      <button type="submit" className='btnLogout'>Submit</button>
      </div>
    </form>
  );
}

export default NoteBookForm;