import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editNote, getNote } from '../../store/note';

function EditNoteForm(  ){
    const dispatch = useDispatch();
    const {id, notebookId } = useParams();
    const userId = useSelector(state => state.session.user.id);
    const notee = useSelector((state) => state.note[id]);

    const [note, setNote] = useState('');
    console.log(notee);
    useEffect(() =>{
        dispatch(getNote(id))
        .then(() => setNote( notee.note))
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id,
            userId,
            notebookId: notee.notebookId, 
            note
        }
        console.log(payload);
        dispatch(editNote(payload))
    }
    return (
        <form onSubmit={handleSubmit} >
            <div className='box4'>
            <h2>Edit Note</h2>
                <input
                    type="text"
                    name="note"
                    placeholder={notee.note}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            <br></br>
            <br></br>
            <button type="submit" className='btnLogout'>
                Edit Note
            </button>

            </div>
        </form>
    );
}

export default EditNoteForm;