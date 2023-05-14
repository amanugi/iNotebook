import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // Fetch all notes
  const fetchNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTdmZjYwODQyN2Q5YmRkNjM4NTE4In0sImlhdCI6MTY4MjkzMzUwNH0.Q3mG2PVcKmM8RNzjzwvHi0xOUUWOD4_zEWSpuLwSkpg",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTdmZjYwODQyN2Q5YmRkNjM4NTE4In0sImlhdCI6MTY4MjkzMzUwNH0.Q3mG2PVcKmM8RNzjzwvHi0xOUUWOD4_zEWSpuLwSkpg",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTdmZjYwODQyN2Q5YmRkNjM4NTE4In0sImlhdCI6MTY4MjkzMzUwNH0.Q3mG2PVcKmM8RNzjzwvHi0xOUUWOD4_zEWSpuLwSkpg"
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log("json", json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    // edit a note
    for (let index = 0; index < newNotes.length; index++) {

      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTdmZjYwODQyN2Q5YmRkNjM4NTE4In0sImlhdCI6MTY4MjkzMzUwNH0.Q3mG2PVcKmM8RNzjzwvHi0xOUUWOD4_zEWSpuLwSkpg",
      }
    });

    const json = await response.json();
    console.log("json", json);

    console.log("Deleting the node with id:" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
