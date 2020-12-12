import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { Grid } from "@material-ui/core";

const initialState = () => {
  let tbl = new Array(3);
  for (let i = 0; i < 2; i++) {
    tbl[i] = new Array(3).fill("");
  }
  return tbl;
};

const row = 8;
const col = 8;

const createTable = () => {
  let tbl = new Array();
  for (let i = 0; i < row; i++) {
    let row = createRow();
    tbl.push(
      <Grid spacing={1} direction="column">
        {row}
      </Grid>
    );
  }
  return tbl;
};

const createRow = () => {
  let row = new Array();
  for (let i = 0; i < col; i++) {
    row.push(<Cell />);
  }
  return row;
};

const Board = () => {
  const [disk, setDisk] = useState(initialState);

  let tbl = createTable();
  console.log(tbl);
  return (
    <>
      <Grid>{tbl}</Grid>
    </>
  );
};

export default Board;
