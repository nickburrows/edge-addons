import React, { useState } from "react";
import TableEditor from "./TableEditor";

const ParentComponent = () => {
  const initialTableData = [
    ["Results", "", "", "", "", ""],
    ["No", "Competition", "John", "Adam", "Robert", "Paul"],
    ["1", "Swimming", "1:30", "2:05", "1:15", "1:41"],
    ["2", "Running", "15:30", "14:10", "15:45", "16:00"],
    ["3", "Shooting", "70%", "55%", "90%", "88%"],
  ];

  const [tableData, setTableData] = useState(initialTableData);

  const updateTableData = (newData) => {
    setTableData(newData);
  };

  return (
    <div>
      <h1>Table Editor</h1>
      <TableEditor tableData={tableData} updateTableData={updateTableData} />
    </div>
  );
};

export default ParentComponent;
