import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes} = context;
    
    return (
        <div class="row my-5">
            <h2 className='my-3'>Your Notes</h2>
            {notes.map((note) => {
                return <Noteitem note = {note} />;
            })}
        </div>
    )
}

export default Notes;
