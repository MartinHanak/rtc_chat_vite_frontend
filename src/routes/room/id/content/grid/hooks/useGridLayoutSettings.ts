import { useState } from "react";

export default function useGridLayoutSettings() {
  const [columns, setColumns] = useState(2);
  const [rows, setRows] = useState(2);

  const changeColumnsNumber = (number: number) => {
    setColumns(number);
  };

  const changeRowsNumber = (number: number) => {
    setRows(number);
  };

  return {
    rows,
    columns,
    changeRowsNumber,
    changeColumnsNumber,
  };
}
