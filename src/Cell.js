import React from "react";
import { Paper, Button } from "@material-ui/core";
// import { IconButton } from "@material-ui/core";
import Brightness1RoundedIcon from "@material-ui/icons/Brightness1Rounded";

const Cell = () => {
  return (
    <>
      <Paper variant="outlined">
        <Button>
          <Brightness1RoundedIcon />
        </Button>
      </Paper>
      {/* <IconButton>
        <Brightness1RoundedIcon />
      </IconButton> */}
    </>
  );
};

export default Cell;
