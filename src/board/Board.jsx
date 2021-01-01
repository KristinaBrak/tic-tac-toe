import React, { useReducer } from "react";
import { LINE_SIZE } from "../consts";
import BoardStyle from "./BoardStyle";
import Cell from "./cell/Cell";
import { validateBoard } from "./winValidator";

const initialState = {
  cells: Array.from(Array(LINE_SIZE ** 2).keys()).map((index) => ({
    id: index + 1,
    element: "",
  })),
  playerTurn: 1,
  playerWon: 0,
};

// const action = {
//   type: string;
//   payload: id
// }

const gameReducer = (state, action) => {
  switch (action.type) {
    case "CELL_CLICKED":
      if (state.playerWon) {
        return state;
      }
      const newCells = state.cells.map((cell) =>
        cell.id === action.payload
          ? {
              ...cell,
              element: cell.element
                ? cell.element
                : state.playerTurn === 1
                ? "X"
                : "O",
            }
          : cell
      );
      return {
        ...state,
        playerTurn: state.playerTurn === 1 ? 2 : 1,
        cells: newCells,
        playerWon: validateBoard(newCells),
      };

    default:
      return state;
  }
};

const Board = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  // console.log(state);
  return (
    <div
      className="wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "40px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BoardStyle>
        {state.cells.map(({ id, element }) => (
          <Cell
            key={id}
            id={id}
            size={100 / LINE_SIZE}
            color={element ? (element === "X" ? "red" : "blue") : undefined}
            onClick={() =>
              dispatch({
                type: "CELL_CLICKED",
                payload: id,
              })
            }
          >
            {element}
          </Cell>
        ))}
      </BoardStyle>
      {state.playerWon ? <h2>Player {state.playerWon} won</h2> : null}
    </div>
  );
};

export default Board;
