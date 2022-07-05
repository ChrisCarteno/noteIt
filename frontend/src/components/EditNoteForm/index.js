import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editNote, getNote } from '../../store/note';

function EditNoteForm(){
    const dispatch = useDispatch();
    const {id, notebookId } = useParams();
    const userId = useSelector(state => state.session.user.id);
    const notee = useSelector((state) => state.note[id]);
    const oneNote = useSelector((state) => state.notee);

    const [note, setNote] = useState('');

    useEffect(() =>{
        dispatch(getNote(id))
        .then(() => setNote( notee.note))
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            userId,
            notebookId, 
            note
        }
        dispatch(editNote(payload))
    }
    return (
        <form onSubmit={handleSubmit} >
            <h2>Edit Note</h2>
            <label>
                Note
                <input
                    type="text"
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </label>
            <button type="submit">
                Edit Note
            </button>
        </form>
    );
}

export default EditNoteForm;