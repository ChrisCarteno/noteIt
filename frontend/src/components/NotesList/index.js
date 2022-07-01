import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllnotes} from "../../store/note";

const NotesList = () =>{
    const dispatch = useDispatch();
    const notesList = useSelector((state) => Object.values(state.notebook));
    console.log(notesList);

    useEffect(() =>{
        dispatch(getAllnotes());
    }, [dispatch]);
    console.log(notesList);
    return(
        <>
            <h1> Notebook List</h1>
            {notesList?.map(({id, name})=>(
                <p key={id}>{name}</p>
            ))}
        </>
    )
}

export default NotesList;