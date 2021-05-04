import React, { FunctionComponent, useState } from "react";
import { Card, CardContent, TextField, IconButton } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import "../App.css";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(0.5),
        width: "60ch",
      },
      width: "40%",
    },
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },

    icon: {
      float: "right",
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
    axios.post("/users/createTodo/" + props.userEmail, {
      id: "123",
      title: title,
      description: notes,
    });
    setTitle("");
    setNotes("");
  };

  return (
    <div>
      <h4>New Todo</h4>
      <Card className={classes.root}>
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
            <IconButton type="submit" className={classes.icon}>
              <AddIcon color="primary" fontSize="large" />
            </IconButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
