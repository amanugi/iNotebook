import React, {useContext, useState} from "react";
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"});

    const handleAddNote = (e) => {
        e.preventDefault(); // prevents the page from loading
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }


  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>{" "}
          <br />
          <input
            type="text"
            name="description"
            className="form-control"
            id="description"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleAddNote}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
