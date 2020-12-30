import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import Brightness1RoundedIcon from "@material-ui/icons/Brightness1Rounded";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#004d40",
  },
  diskLight: {
    color: "#FFFFFF",
  },
  diskDark: {
    color: "#000000",
  },
  diskBlank: {
    color: "#004d40",
  },
}));

const Cell = (props) => {
  const classes = useStyles();

  const switchDisk = () => {
    switch (props.diskState) {
      case "light":
        return classes.diskLight;
        break;
      case "dark":
        return classes.diskDark;
        break;
      default:
        return classes.diskBlank;
    }
  };

  return (
    <>
      <Paper
        variant="outlined"
        square
        className={classes.paper}
        onClick={() => {
          props.diskHandler();
        }}
      >
        <Brightness1RoundedIcon className={switchDisk()} />
      </Paper>
    </>
  );
};

export default Cell;
