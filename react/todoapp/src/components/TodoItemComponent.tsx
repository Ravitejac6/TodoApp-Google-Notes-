import React, { FunctionComponent, useState, useEffect } from "react";
import { Card, CardContent, TextField, IconButton } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Todo } from "../interfaces/todo";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(0.5),
        padding: theme.spacing(1.5),
        width: "70ch",
      },
      width: "30%",
      display: "flex",
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
  todo: Todo;
  removeTodo: (todoId: String) => void;
  updateTodo: (todo: Todo) => void;
}
export const TodoItemComponent: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState<String>("");
  const [notes, setNotes] = useState<String>("");

  useEffect(() => {
    setTitle(props.todo.title);
    setNotes(props.todo.description);
  }, []);
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

  const handleDeleteTodo = () => {
    props.removeTodo(props.todo.id);
  };

  const handleUpdateTodo = () => {
    const updatedTodo: Todo = {
      id: props.todo.id,
      description: notes,
      title: title,
    };
    props.updateTodo(updatedTodo);
  };
  return (
    <div>
      <Card
        className={classes.root}
        style={{ boxShadow: "0 1px 7px rgb(128,128,128)" }}
      >
        <CardContent>
          <TextField
            name="title"
            label="Title"
            value={title}
            fullWidth={true}
            InputProps={{ classes }}
            onChange={(e) => handleTitleChange(e)}
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
          {/* style={{ marginLeft: "45%" }} */}
          <span>
            <IconButton onClick={handleDeleteTodo}>
              <DeleteIcon color="secondary" />
            </IconButton>
            <IconButton onClick={handleUpdateTodo}>
              <CreateIcon color="primary" />
            </IconButton>
          </span>
        </CardContent>
      </Card>
    </div>
  );
};
