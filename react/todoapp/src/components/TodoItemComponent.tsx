import React, { useState } from "react";
import { Card, CardContent, TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Todo } from "../interfaces/todo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(0.5),
        width: "50ch",
      },
      width: "40%",
    },
    label: {
      marginBottom: "5%",
    },
  })
);

export const TodoItemComponent = () => {
  const todo: Todo = {
    id: "1234",
    title: "Food",
    description: "Paneer",
  };
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
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <TextField
            className={classes.label}
            name="title"
            label="Title"
            value={todo.title}
            fullWidth={true}
            onChange={(e) => handleTitleChange(e)}
          />
          <TextField
            name="description"
            label="Notes"
            rows={5}
            value={todo.description}
            fullWidth={true}
            multiline={true}
            onChange={(e) => handleNotesChange(e)}
          />
          <Button variant="outlined" color="secondary">
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
