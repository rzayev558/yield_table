"use client";

import { useState, useEffect } from "react";
import { fetchYieldTableData, fetchYieldTablesMeta } from "./api/yieldTable";
import InterpolatedTable from "./components/InterpolatedTable";
import { YieldClassInput } from "./components/YieldClassInput";
import YieldTableSelector from "./components/YieldTableSelector";
import { interpolateValue } from "./utils/helper";
import { CircularProgress } from "@mui/material";
import {
  YieldTableData,
  InterpolatedRow,
  DefaultTableProperties,
} from "./interfaces";

const Home: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<
    YieldTableData | undefined
  >(undefined);
  const [yieldClass, setYieldClass] = useState<string | undefined>("");
  const [isValidYieldClass, setIsValidYieldClass] = useState<boolean>(true);
  const [yieldTables, setYieldTables] = useState<YieldTableData[]>([]);
  const [interpolatedData, setInterpolatedData] = useState<
    InterpolatedRow[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInterpolatedData = async () => {
    if (!yieldClass) return;

    const parsedYieldClass = parseFloat(yieldClass);

    const lowerClassData = selectedTable?.data.yield_classes.find(
      (yc) => yc.yield_class <= parsedYieldClass,
    );
    /* Need to handle the boundry case where the yield class is the highest. (eg. 30 yield classes and user inputs 30.6.
    Need to fall back to lower yield class if higher doesn't exits) */
    const upperClassData =
      selectedTable?.data.yield_classes.find(
        (yc) => yc.yield_class > parsedYieldClass,
      ) ?? lowerClassData;

    if (!lowerClassData || !upperClassData) return;

    const interpolateRow = (
      lowerRow: InterpolatedRow,
      upperRow: InterpolatedRow,
      index: number,
    ): InterpolatedRow => {
      const interpolatedRow: Partial<InterpolatedRow> = {
        age: lowerRow.age,
        yield_class: parsedYieldClass,
      };

      DefaultTableProperties.forEach((property) => {
        const upperValue = upperRow?.[property] ?? lowerRow[property];
        const lowerValue = lowerRow[property];

        interpolatedRow[property] =
          lowerClassData === upperClassData
            ? lowerValue
            : interpolateValue(
                parsedYieldClass,
                upperClassData.yield_class,
                upperValue,
                lowerClassData.yield_class,
                lowerValue,
              );
      });

      return interpolatedRow as InterpolatedRow;
    };

    try {
      const interpolatedRows = lowerClassData.rows.map((row, index) =>
        interpolateRow(row, upperClassData.rows[index] ?? row, index),
      );

      setInterpolatedData(interpolatedRows);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchYieldTablesMeta();
      setYieldTables(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  /*  I want to fetch the table data here because I want to reactively check if the yield class exists in the selected table.
  kind of slows down the select component but I think it is benefical to check the validity of the yield class
  but I guess one could also just check the validity of the yield class when the user actually clicks the interpolate button and 
  show an error message if the yield class is invalid, which could have been faster and more user friendly but make it more 'feedbacky'
  */
  const handleTableChange = async (newSelectedTableID: number) => {
    const selectedTable = yieldTables.find(
      (table) => table.id === newSelectedTableID,
    );
    if (selectedTable) {
      try {
        const data = await fetchYieldTableData(selectedTable.id);
        setSelectedTable(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    } else {
      console.log("no table selected");
    }
  };
  //I am not sure how to trigger the re-calculations whenever one or more inputs change other than putting them into the useEffect, but I am not sure if this is the best way to do it.
  //I feel guilty to put everything into the useEffect :(
  //load data on mount
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const regex = /^[0-9.,]+$/;
    if (!yieldClass) return;
    const isValid = regex.test(yieldClass);
    // Parse the integer part of yieldClass
    const parsedYieldClass = parseInt(yieldClass, 10);
    const yieldClassExists = selectedTable?.data.yield_classes.some(
      (yieldClasss) => yieldClasss.yield_class === parsedYieldClass,
    );
    console.log(selectedTable);
    if (isValid && yieldClassExists) {
      setIsValidYieldClass(true);
    } else {
      setIsValidYieldClass(false);
    }
  }, [yieldClass, selectedTable, yieldTables, isValidYieldClass]);

  return (
    //you would have this loading state globally somewhere in redux or context but for this small app I think it is fine to have it here
    <div>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="flex items-center justify-center text-3xl font-bold">
              Interpolate Yield Data
            </h1>
            <YieldTableSelector
              selectedTable={selectedTable}
              yieldTables={yieldTables}
              onChange={handleTableChange}
            />
            <YieldClassInput value={yieldClass} onChange={setYieldClass} />
            {!isValidYieldClass && (
              <p className="error text-red-500">
                Yield class doesn't exist for this table.
              </p>
            )}
            <button
              onClick={fetchInterpolatedData}
              className="button-17"
              role="button"
            >
              Interpolate
            </button>

            {interpolatedData && <InterpolatedTable data={interpolatedData} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
