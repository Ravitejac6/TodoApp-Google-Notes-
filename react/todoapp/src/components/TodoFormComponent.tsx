import React, { FunctionComponent, useState } from "react";
import { Card, CardContent, TextField, IconButton } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import "../App.css";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(0.5),
        width: "60ch",
        display: "flex",
        flexDirection: "column",
      },
      width: "550px",
      marginRight: "100px",
      display: "flex",
      flexWrap: "wrap",
    },
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
  })
);

interface Props {
  userEmail: String;
}
export const TodoFormComponent: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState<String>("");
  const [notes, setNotes] = useState<String>("");

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTitle(e.currentTarget.value);
  };

  const handleNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNotes(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title);
    console.log(notes);
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    axios.post(
      "/users/createTodo",
      {
        id: "123",
        title: title,
        description: notes,
      },
      { headers: headers }
    );
    setTitle("");
    setNotes("");
  };

  return (
    <div>
      <h4>New Todo</h4>
      <Card
        className={classes.root}
        style={{ boxShadow: "0 1px 7px rgb(128,128,128)" }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Title"
              value={title}
              fullWidth={true}
              onChange={(e) => handleTitleChange(e)}
              InputProps={{ classes }}
            />
            <TextField
              name="description"
              label="Notes"
              rows={5}
              value={notes}
              fullWidth={true}
              multiline={true}
              InputProps={{ classes }}
              onChange={(e) => handleNotesChange(e)}
            />
            <span
              style={{
                float: "right",
              }}
            >
              <Fab type="submit" color="primary" arial-label="add">
                <AddIcon fontSize="large" />
              </Fab>
              {/* <IconButton type="submit">
                <AddIcon fontSize="large" color="primary" />
              </IconButton> */}
            </span>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
