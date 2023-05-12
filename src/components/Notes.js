import React, {useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, fetchNotes} = context;
    
    useEffect( () => {
        fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
        <AddNote />
        <div className="row my-5">
            <h2 className='my-3'>Your Notes</h2>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note} />;
            })}
        </div>
        </>
    )
}

export default Notes;
