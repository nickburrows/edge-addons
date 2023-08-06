import React, { useState, useEffect } from "react";
// import copy from "copy-to-clipboard";
import ExcelSvg from "./ExcelSvg";
import Code from "../Code";

const DataInput = () => {
  const [pastedInput, setPastedInput] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [tableData, setTableData] = useState("");
  const [codeRef, setCodeRef] = useState(null);
  const [tableRef, setTableRef] = useState(null);
  const [open, setOpen] = useState(false);

  let constructJSONFromPastedInput = (pastedInput) => {
    let rawRows = pastedInput.split("\n");
    let headersArray = rawRows[0].split("\t");
    let output = [];
    rawRows.forEach((rawRow, idx) => {
      if (idx > 0) {
        let rowObject = {};
        let values = rawRow.split("\t");
        headersArray.forEach((header, idx) => {
          rowObject[header] = values[idx];
        });
        output.push(rowObject);
        setJsonData(output);
      }
    });
    return output;
  };

  // const BodyRows = (rawRows) => {
  //   rawRows.map((bodyRow, i) => <td key={i}>{bodyRow}</td>);
  // };

  let constructTableFromPastedInput = (pastedInput) => {
    let rawRows = pastedInput.split("\n");
    let headRowArray = rawRows[0].split("\t");
    let headRow = headRowArray.map((header, i) => <th key={i}>{header}</th>);
    let bodyRows = "";
    rawRows.forEach((rawRow, idx) => {
      let rawRowArray = rawRow.split("\t");
      if (idx > 0) {
        return (
          <tr key={idx}>
            {rawRowArray.forEach((rawArray, i) => (
              <td key={i}>{rawArray}</td>
            ))}
          </tr>
        );
      }
    });
    console.log(bodyRows);

    const tableRows = (
      <table className="boostrap4_table_head_dark_striped_rounded_compact">
        <thead>
          <tr>{headRow}</tr>
        </thead>
        <tbody>{bodyRows}</tbody>
      </table>
    );

    setTableData(tableRows);
    return tableRows;
  };

  const handleOnChange = (e) => {
    const inputText = e.target.value;
    setPastedInput(inputText);
    constructTableFromPastedInput(inputText);
    constructJSONFromPastedInput(inputText);
  };

  const handleOnClick = () => {
    if (pastedInput) {
      codeRef.classList.remove("hidden");
    } else {
      codeRef.classList.add("hidden");
    }
    setOpen(!open);
  };

  console.log(typeof pastedInput);

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <div className="w-full md:w-4/5 space-y-6">
        <section className="_dataSource shadow dark:shadow-xl rounded-xl bg-white dark:bg-slate-800 p-3 md:p-6">
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center justify-center">
              <div className="flex items-center text-slate-700 dark:text-slate-300">
                <div id="DataSource" className="flex items-center">
                  <span className="mr-3">
                    <ExcelSvg className="w-6 h-6" />
                  </span>
                  <span className="font-semibold text-base">Data Source</span>
                </div>
                <div className="group inline-block ml-3">
                  <button className="flex items-center outline-none focus:outline-none border-blue-500 text-blue-500 px-3 py-1 bg-white dark:bg-slate-800 rounded-full">
                    <span className="pr-1">Excel</span>
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                  <ul className="bg-white dark:bg-slate-700 dark:text-slate-300 shadow dark:shadow-xl rounded transform scale-0 group-hover:scale-100 absolute min-w-min z-50">
                    <li>
                      <a className="_fromItem" href="/excel-to-json">
                        Excel
                      </a>
                    </li>
                    <li>
                      <a className="_fromItem" href="/csv-to-json">
                        CSV
                      </a>
                    </li>
                    <li>
                      <a className="_fromItem" href="/xml-to-json">
                        XML
                      </a>
                    </li>
                    <li>
                      <a className="_fromItem" href="/html-to-json">
                        HTML Table
                      </a>
                    </li>
                    <li>
                      <a className="_fromItem" href="/markdown-to-json">
                        Markdown Table
                      </a>
                    </li>
                    <li>
                      <a className="_fromItem" href="/json-to-json">
                        JSON Array
                      </a>
                    </li>
                    <li>
                      <a className="_fromItem" href="/sql-to-json">
                        Insert SQL
                      </a>
                    </li>
                    <li>
                      <a className="_fromItem" href="/mysql-to-json">
                        MySQL Query Output
                      </a>
                    </li>
                    <li>
                      <a className="_fromItem" href="/latex-to-json">
                        LaTeX Table
                      </a>
                    </li>
                    <li>
                      <a className="_fromItem" href="/mediawiki-to-json">
                        MediaWiki Table
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="choose-sheet hidden flex items-center">
                  <div className="w-px h-5 mx-3 bg-slate-300 dark:bg-slate-100/20 flex-none" />
                  <span>Sheet</span>
                </div>
                <div className="choose-sheet hidden group inline-block">
                  <button className="flex items-center outline-none focus:outline-none border-blue-500 text-blue-500 px-3 py-1 bg-white dark:bg-slate-800 rounded-full">
                    <span className="pr-1 sheet-default">None</span>
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                  <div className="sheet-list group-hover:scale-100" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center space-x-4">
              <button
                type="button"
                className="items-center border border-blue-500 rounded-full px-5 text-sm leading-8 select-none text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
                onClick={handleOnClick}
              >
                Export
              </button>
              <button
                id="select-file"
                className="hidden md:inline items-center border border-blue-500 rounded-full px-5 text-sm leading-8 select-none text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
              >
                Load File
              </button>
              <div
                id="extract-panel"
                className="hidden md:inline-block dropdown relative"
              >
                <button
                  onClick='this.nextElementSibling.classList.toggle("invisible")'
                  className="items-center border border-blue-500 rounded-full px-5 text-sm leading-8 select-none text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
                >
                  Extract From URL
                </button>
                <div
                  data-close
                  className="invisible p-6 mt-2 absolute right-0 min-w-min bg-white dark:bg-slate-800 dark:border-slate-800 rounded-xl shadow-lg space-y-4 border"
                >
                  <div className="text-slate-500 mt-4 text-sm">
                    Please enter the webpage URL containing the table
                  </div>
                  <div className="flex flex-col w-full space-x-2 md:flex-row">
                    <input
                      id="input-url"
                      className="rounded border border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 p-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-96"
                      placeholder="https://"
                    />
                    <button
                      id="extract"
                      className="flex flex-shrink-0 items-center px-5 rounded bg-blue-500 hover:bg-blue-400 text-slate-50"
                    >
                      <i className="flex items-center justify-center icon icon-extract mr-3" />
                      <i className="hidden flex items-center justify-center icon icon-spinner animate-spin mr-3" />
                      <span className="w-full">Extract Excel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="file border-4 border-dashed border-transparent w-full bg-slate-700 dark:bg-slate-700 rounded-xl md:rounded-br-none p-6">
              <textarea
                className="text-sm w-full bg-slate-700 dark:bg-slate-700 text-white font-mono focus:outline-none"
                id="importContent"
                rows={8}
                placeholder="Paste your Excel data or drag-and-drop Excel file here"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                defaultValue={""}
                value={pastedInput}
                onChange={handleOnChange}
              />
              <input
                id="file-input"
                type="file"
                accept=".xls,.xlsx,.xlsm"
                className="hidden"
              />
            </div>
          </div>
        </section>
        <div className="table-container">{tableData}</div>
        <div ref={setCodeRef} className="hidden">
          <Code className="language-json">
            {JSON.stringify(jsonData, null, 2)}
          </Code>
        </div>
      </div>
    </>
  );
};

export default DataInput;
