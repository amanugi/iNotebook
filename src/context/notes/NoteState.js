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
    const response = await fetch(`${host}/api/notes/addeNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTdmZjYwODQyN2Q5YmRkNjM4NTE4In0sImlhdCI6MTY4MjkzMzUwNH0.Q3mG2PVcKmM8RNzjzwvHi0xOUUWOD4_zEWSpuLwSkpg",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("response", response);

    console.log("Adding a note");
    const note = {
      _id: "6453604b1659965d1823d00d5",
      user: "644e7ff608427d9bdd6385189",
      title: title,
      description: description,
      tag: tag,
      date: "2023-05-04T07:35:39.609Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTdmZjYwODQyN2Q5YmRkNjM4NTE4In0sImlhdCI6MTY4MjkzMzUwNH0.Q3mG2PVcKmM8RNzjzwvHi0xOUUWOD4_zEWSpuLwSkpg",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //const json = response.json();
    console.log("response", response);

    // edit a note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTdmZjYwODQyN2Q5YmRkNjM4NTE4In0sImlhdCI6MTY4MjkzMzUwNH0.Q3mG2PVcKmM8RNzjzwvHi0xOUUWOD4_zEWSpuLwSkpg",
      }
    });

    //const json = response.json();
    console.log("response", response);
    
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
