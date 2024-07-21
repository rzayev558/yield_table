import React from "react";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { YieldTableData } from "../interfaces";

interface YieldTableSelectorProps {
  yieldTables: YieldTableData[];
  selectedTable?: YieldTableData;
  onChange: (value: number) => void;
}

const YieldTableSelector: React.FC<YieldTableSelectorProps> = ({
  selectedTable,
  onChange,
  yieldTables,
}) => {
  const handleChange = (e: SelectChangeEvent<number>) => {
    onChange(e.target.value as number);
  };
  return (
    <>
      <Select
        labelId="yield-table-select-label"
        value={
          yieldTables.some((table) => table.id === selectedTable?.id)
            ? selectedTable?.id
            : ""
        }
        onChange={(e) => handleChange(e)}
        displayEmpty
        className="w-8/12"
      >
        <MenuItem value="" disabled>
          Select a yield table
        </MenuItem>
        {yieldTables.map((table) => (
          <MenuItem value={table.id} key={table.id}>
            {table.id} - {table.title}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default YieldTableSelector;
