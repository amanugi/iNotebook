import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const initialNotes = [
        {
          "_id": "6453604b1659965d1823d00d",
          "user": "644e7ff608427d9bdd638518",
          "title": "My title",
          "description": "Please, wake up early!",
          "tag": "Personal",
          "date": "2023-05-04T07:35:39.609Z",
          "__v": 0
        },
        {
          "_id": "645360be1659965d1823d014",
          "user": "644e7ff608427d9bdd638518",
          "title": "My playlist",
          "description": "Please access my playlist!",
          "tag": "Youtube",
          "date": "2023-05-04T07:37:34.736Z",
          "__v": 0
        },
        {
          "_id": "645360d71659965d1823d016",
          "user": "644e7ff608427d9bdd638518",
          "title": "My diary",
          "description": "Please don't see it!",
          "tag": "Personal",
          "date": "2023-05-04T07:37:59.262Z",
          "__v": 0
        },
        {
            "_id": "645360be1659965d1823d0148",
            "user": "644e7ff608427d9bdd638518",
            "title": "My playlist",
            "description": "Please access my playlist!",
            "tag": "Youtube",
            "date": "2023-05-04T07:37:34.736Z",
            "__v": 0
          },
          {
            "_id": "645360d71659965d1823d0169",
            "user": "644e7ff608427d9bdd638518",
            "title": "My diary",
            "description": "Please don't see it!",
            "tag": "Personal",
            "date": "2023-05-04T07:37:59.262Z",
            "__v": 0
          },
          {
            "_id": "645360be1659965d1823d0140",
            "user": "644e7ff608427d9bdd638518",
            "title": "My playlist",
            "description": "Please access my playlist!",
            "tag": "Youtube",
            "date": "2023-05-04T07:37:34.736Z",
            "__v": 0
          },
          {
            "_id": "645360d71659965d1823d0163",
            "user": "644e7ff608427d9bdd638518",
            "title": "My diary",
            "description": "Please don't see it!",
            "tag": "Personal",
            "date": "2023-05-04T07:37:59.262Z",
            "__v": 0
          }
      ]

      const [notes, setNotes] = useState(initialNotes);

    return(
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;