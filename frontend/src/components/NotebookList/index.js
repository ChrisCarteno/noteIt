import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllnoteBooks } from "../../store/notebook";

const NotebookList = () =>{
    const dispatch = useDispatch();
    const notebookList = useSelector((state) => Object.values(state.notebook));
    console.log(notebookList);

    useEffect(() =>{
        dispatch(getAllnoteBooks());
    }, [dispatch]);
    console.log(notebookList);
    return(
        <>
            <h1> Notebook List</h1>
            {notebookList?.map(({id, name})=>(
                <p key={id}>{name}</p>
            ))}
        </>
    )
}

export default NotebookList;