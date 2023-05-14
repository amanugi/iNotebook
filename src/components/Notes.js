import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  
  const { notes, fetchNotes, editNote } = context;

  useEffect(() => {
      if(localStorage.getItem('token')){
        fetchNotes();
      }
      else{
        navigate('/login');
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

  const handleUpdate = () => {
    console.log("Updating the note...", note);
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully!", "success");
  }

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    
  };

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    <h6>Title</h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    <h6>Description</h6>
                  </label>{" "}
                  <input
                    type="text"
                    name="edescription"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    minLength={5}
                    required
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    <h6>Tag</h6>
                  </label>
                  <input
                    type="text"
                    name="etag"
                    className="form-control"
                    id="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleUpdate}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <h2 className="my-3">Your Notes</h2>
        <div className="container mx-1">
          {notes.length === 0 && "No notes to display!"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
