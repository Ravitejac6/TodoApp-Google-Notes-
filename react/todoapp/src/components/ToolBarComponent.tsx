import React from "react";
import { Toolbar, Typography, AppBar } from "@material-ui/core";

export const ToolBarComponent = () => {
  return (
    <AppBar color="primary">
      <Toolbar>
        <Typography variant="h6">TODO App</Typography>
      </Toolbar>
    </AppBar>
  );
};
