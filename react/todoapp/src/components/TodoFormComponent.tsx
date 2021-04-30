import React, { useState } from "react";
import { Card, CardContent, Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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

export const TodoFormComponent = () => {
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
  };

  return (
    <div>
      <h4>TodoForm Component</h4>
      <Card className={classes.root}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.label}
              name="title"
              label="Title"
              value={title}
              fullWidth={true}
              onChange={(e) => handleTitleChange(e)}
            />
            <TextField
              name="description"
              label="Notes"
              rows={5}
              value={notes}
              fullWidth={true}
              multiline={true}
              onChange={(e) => handleNotesChange(e)}
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
