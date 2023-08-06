import React from "react";
import TableToJSONConverter from "./TableToJSONConverter";
// import TableDataRenderer from "./TableDataRenderer";

const DataConvert = () => {
  return (
    <>
      <div className="flex flex-col gap-4 m-2 max-w-5xl w-full">
        <div className="w-[500px] h-[600px] space-y-4">
          <TableToJSONConverter />
        </div>
      </div>
    </>
  );
};

export default DataConvert;
