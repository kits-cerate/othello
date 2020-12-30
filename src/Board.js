import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { Grid } from "@material-ui/core";
import { AlarmTwoTone, Message } from "@material-ui/icons";

const maxRow = 8;
const maxCol = 8;

// IntitialState inculde 8*8 jugArray
const initialState = () => {
  let tbl = new Array(maxRow);
  for (let i = 0; i < maxCol; i++) {
    tbl[i] = new Array(maxCol).fill("");
  }

  tbl[3][3] = "light";
  tbl[3][4] = "dark";
  tbl[4][3] = "dark";
  tbl[4][4] = "light";

  return { diskState: tbl };
};

const Board = () => {
  // Create grid table
  const createTable = () => {
    let tbl = new Array();
    for (let rowIdx = 0; rowIdx < maxRow; rowIdx++) {
      let row = createRow(rowIdx);
      tbl.push(
        <Grid container spacing={1} direction="row">
          {row}
        </Grid>
      );
    }
    return tbl;
  };

  // Create row item of grid table
  const createRow = (rowIdx) => {
    let row = new Array();
    for (let colIdx = 0; colIdx < maxCol; colIdx++) {
      row.push(
        <Cell
          diskState={disk.diskState[rowIdx][colIdx]}
          diskHandler={() => handleClick(rowIdx, colIdx)}
          key={rowIdx + colIdx}
        />
      );
    }
    return row;
  };

  const getDisksToTurnOver = (rowIdx, colIdx) => {
    let multiDirectCellArrays = new Array();

    for (let rowDirect = -1; rowDirect <= 1; rowDirect++) {
      for (let colDirect = -1; colDirect <= 1; colDirect++) {
        if (rowDirect === 0 && colDirect === 0) {
          continue;
        }
        let monoDirectCellArray = new Array();
        let newRowIdx = rowIdx + rowDirect;
        let newColIdx = colIdx + colDirect;
        while (
          0 <= newRowIdx &&
          newRowIdx <= 7 &&
          0 <= newColIdx &&
          newColIdx <= 7
        ) {
          monoDirectCellArray.push({
            rowIdx: newRowIdx,
            colIdx: newColIdx,
            diskState: disk.diskState[newRowIdx][newColIdx],
          });
          newRowIdx = newRowIdx + rowDirect;
          newColIdx = newColIdx + colDirect;
        }
        multiDirectCellArrays.push(monoDirectCellArray);
      }
    }

    let cellsToTurnOver = new Array();

    for (
      let directIdx = 0;
      directIdx < multiDirectCellArrays.length;
      directIdx++
    ) {
      let monoDirectCellArray = multiDirectCellArrays[directIdx];
      let result = false;
      let temporaryArray = new Array();

      console.log(monoDirectCellArray);

      for (let idx = 0; idx < monoDirectCellArray.length; idx++) {
        if (monoDirectCellArray[idx].diskState === "") {
          break;
        } else if (idx === 0 && monoDirectCellArray[idx].diskState === turn) {
          break;
        } else if (
          monoDirectCellArray[idx].diskState === turn &&
          monoDirectCellArray[idx - 1].diskState !== turn
        ) {
          result = true;
          break;
        } else if (monoDirectCellArray[idx].diskState !== turn) {
          temporaryArray.push(monoDirectCellArray[idx]);
          continue;
        }
      }

      if (result) {
        cellsToTurnOver.push(...temporaryArray);
      }
    }
    return cellsToTurnOver;
  };

  const [turn, setTurn] = useState("light");
  const [disk, setDisk] = useState(initialState);

  const handleClick = (rowIdx, colIdx) => {
    console.log(disk); //debug
    let disksToTurnOver = getDisksToTurnOver(rowIdx, colIdx);

    console.log(disksToTurnOver);
    if (disksToTurnOver.length) {
      let newDiskState = disk.diskState;
      for (let targetDisk of disksToTurnOver) {
        newDiskState[targetDisk.rowIdx][targetDisk.colIdx] =
          newDiskState[targetDisk.rowIdx][targetDisk.colIdx] === "light"
            ? "dark"
            : "light";
      }
      newDiskState[rowIdx][colIdx] = turn;
      setTurn(turn === "light" ? "dark" : "light");
      setDisk({ ...disk, diskState: newDiskState });
    } else {
      alert("You cannnot put disk on the cell");
    }
  };
  // useEffect(() => {
  //   console.log(disk);
  // });

  let tbl = createTable();

  return (
    <>
      <Grid>{tbl}</Grid>
    </>
  );
};

export default Board;
