const validateLine = ({ line0, nextLine, iterator }, board) => {
  const symbols = ["X", "O"];
  for (const index of iterator) {
    const line = line0.map((cell) => nextLine(cell, index));
    for (const symbol of symbols) {
      const result = line.every((cell) => board[cell].element === symbol);
      if (result) {
        return symbols.indexOf(symbol) + 1;
      }
    }
  }
};

export const validateBoard = (board) => {
  const repeat = board.length ** (1 / 2);

  const iterator = Array.from(Array(repeat).keys());

  const row0 = iterator;
  const nextRow = (cell, index) => cell + repeat * index;

  const col0 = iterator.map((cell) => cell * repeat);
  const nextCol = (cell, index) => cell + index;

  const diagA = iterator.map((cell) => cell * repeat + cell);
  const diagB = iterator.map((cell) => cell * (repeat - 1) + repeat - 1);

  const nextDiag = (cell, _) => cell;

  const items = [
    {
      line0: row0,
      nextLine: nextRow,
      iterator,
    },
    {
      line0: col0,
      nextLine: nextCol,
      iterator,
    },
    {
      line0: diagA,
      nextLine: nextDiag,
      iterator: [0],
    },
    {
      line0: diagB,
      nextLine: nextDiag,
      iterator: [0],
    },
  ];

  let result;
  for (const item of items) {
    result = validateLine(item, board);
    if (result) {
      break;
    }
  }

  return result ?? 0;
};
