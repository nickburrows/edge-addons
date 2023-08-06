import React, { useState, useEffect, useRef } from "react";
import Code from "../Code";
import ToastSuccess from "./ToastSuccess";
// import TableEditor from "./TableEditor";

const TableToJSONConverter = () => {
  const [pastedData, setPastedData] = useState("");
  const [isTable, setIsTable] = useState(false);
  const [jsonArray, setJsonArray] = useState([]);
  const [htmlCode, setHtmlCode] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const modalRef = useRef(null);
  const toastRef = useRef(null);

  // 讀取 localStorage 中的表格資料並設置到 textarea
  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      const tableArray = JSON.parse(storedData);
      if (tableArray.length > 0) {
        const headers = Object.keys(tableArray[0]);
        const rows = tableArray.map((row) =>
          headers.map((header) => row[header]),
        );
        const tableData = [
          headers.join("\t"),
          ...rows.map((row) => row.join("\t")),
        ].join("\n");
        setPastedData(tableData);

        if (headers.length >= 2 && rows.length >= 2) {
          setIsTable(true);
        } else {
          setIsTable(false);
        }
        setJsonArray(tableArray);
        setHtmlCode(generateHTMLTable(tableArray));
      }
    }
    setOpenModal(false);
  }, []);

  const generateHTMLTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return ""; // 返回空字串，表示沒有資料
    }

    const tableHeaders = Object.keys(data[0]);

    const headerRow = `<thead>\n    <tr>\n    ${tableHeaders
      .map((header) => `  <th>${header}</th>`)
      .join("\n    ")}\n    </tr>\n  </thead>`;

    const contentRows = data
      .map(
        (row) =>
          `    <tr>\n    ${tableHeaders
            .map((header) => `  <td>${row[header]}</td>`)
            .join("\n    ")}\n    </tr>`,
      )
      .join("\n");

    const tableHTML = `<table>\n  ${headerRow}\n  <tbody>\n${contentRows}\n  </tbody>\n</table>`;

    return tableHTML;
  };

  const handleOnChange = (event) => {
    const pastedContent = event.target.value;
    setPastedData(pastedContent);

    // 判斷輸入的資料是否為表格
    const rows = pastedContent.split("\n");
    if (rows.length >= 2) {
      const headers = rows[0].split("\t");
      const contentRow = rows[1].split("\t");
      if (headers.length >= 2 && contentRow.length >= 2) {
        setIsTable(true);
      } else {
        setIsTable(false);
      }
    } else {
      setIsTable(false);
    }

    // const tableRows = rows.map((row) => row.split("\t"));
    const tableObjects = [];
    const headers = rows[0].split("\t"); // 定義 headers 變數
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split("\t");
      if (row.length === headers.length) {
        const dataObject = {};
        for (let j = 0; j < headers.length; j++) {
          dataObject[headers[j]] = row[j];
        }
        tableObjects.push(dataObject);
      }
    }
    setJsonArray(tableObjects);
    const jsonString = JSON.stringify(tableObjects, null, 2);
    localStorage.setItem("tableData", jsonString);

    setHtmlCode(toHTML());
  };

  const handleClearClick = () => {
    // 清除表格資料
    setPastedData("");
    setIsTable(false);
    // 同時從 localStorage 中移除 tableData
    localStorage.removeItem("tableData");
  };

  const generateTablePreview = () => {
    const rows = pastedData.split("\n");
    return (
      <table>
        <thead>
          <tr>
            {rows[0].split("\t").map((header, headerIndex) => (
              <th key={headerIndex}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.split("\t").map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const convertToJSON = () => {
    try {
      const jsonString = toJSON(); // 格式化 JSON 數據
      // 將 JSON 資料複製到剪貼簿
      navigator.clipboard
        .writeText(jsonString)
        .then(() => {
          console.log("已成功複製 JSON 資料到剪貼簿！");
        })
        .catch((error) => {
          console.error("複製 JSON 資料到剪貼簿失敗：", error);
        });
      handleOnToast();
      setTimeout(() => {
        setShowToast(false);
      }, "3000");
    } catch (error) {
      console.error("無法轉換為 JSON 格式：", error);
    }
  };
  function toJSON() {
    const rows = pastedData.split("\n");
    const headers = rows[0].split("\t");
    const jsonData = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split("\t");
      if (row.length === headers.length) {
        const dataObject = {};
        for (let j = 0; j < headers.length; j++) {
          dataObject[headers[j]] = row[j];
        }
        jsonData.push(dataObject);
      }
    }

    const jsonString = JSON.stringify(jsonData, null, 2); // 格式化 JSON 數據
    return jsonString;
  }

  const convertToMarkdown = () => {
    try {
      let markdownData = toMarkdown();

      // 將 Markdown 資料複製到剪貼簿
      navigator.clipboard
        .writeText(markdownData)
        .then(() => {
          console.log("已成功複製 Markdown 資料到剪貼簿！");
        })
        .catch((error) => {
          console.error("複製 Markdown 資料到剪貼簿失敗：", error);
        });
      handleOnToast();
      setTimeout(() => {
        setShowToast(false);
      }, "3000");
    } catch (error) {
      console.error("無法轉換為 Markdown 格式：", error);
    }
  };
  function toMarkdown() {
    const rows = pastedData.split("\n");
    const headers = rows[0].split("\t");
    let markdownData = "";

    // 生成表格標題
    markdownData += `| ${headers.join(" | ")} |\n`;
    markdownData += `|${headers.map(() => " --- ").join("|")} |\n`;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split("\t");
      if (row.length === headers.length) {
        // 生成每一行資料
        markdownData += `| ${row.join(" | ")} |\n`;
      }
    }
    return markdownData;
  }

  const convertToHTMLTable = () => {
    try {
      let htmlTable = toHTML();

      // 將 HTML 表格資料複製到剪貼簿
      navigator.clipboard
        .writeText(htmlTable)
        .then(() => {
          console.log("已成功複製 HTML 表格資料到剪貼簿！");
        })
        .catch((error) => {
          console.error("複製 HTML 表格資料到剪貼簿失敗：", error);
        });
      handleOnToast();
      setTimeout(() => {
        setShowToast(false);
      }, "3000");
    } catch (error) {
      console.error("無法轉換為 HTML 表格格式：", error);
    }
  };

  function toHTML() {
    const rows = pastedData.split("\n");
    let htmlTable = "<table>\n";
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].split("\t");
      if (i === 0) {
        htmlTable += "  <thead>\n    <tr>\n";
        for (const cell of row) {
          htmlTable += `      <th>${cell}</th>\n`;
        }
        htmlTable += "    </tr>\n  </thead>\n  <tbody>\n";
      } else {
        htmlTable += "    <tr>\n";
        for (const cell of row) {
          htmlTable += `      <td>${cell}</td>\n`;
        }
        htmlTable += "    </tr>\n";
      }
    }
    htmlTable += "  </tbody>\n</table>";
    return htmlTable;
  }

  // const tableDataArray = localStorage.getItem("tableData");

  // const updateTableData = (newData) => {
  //   setPastedData(newData);
  //   setIsTable(true);
  //   // 將更新後的表格數據存儲到 localstorage
  //   // localStorage.setItem("tableData", newData);
  // };

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("hidden");
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("hidden");
    }
  };

  const modalCloseBtn = () => {
    setOpenModal(false);
    handleCloseModal();
  };

  const handleOnOpen = () => {
    setOpenModal(!openModal);

    if (openModal === true) {
      handleCloseModal();
    } else {
      handleOpenModal();
    }
  };

  const handleOnToast = () => {
    setShowToast(!showToast);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <section className="_dataSource shadow dark:shadow-xl rounded-xl bg-white dark:bg-slate-800 p-2">
        <div className="flex flex-row justify-end items-center">
          <div className="flex flex-row items-center justify-end md:justify-center space-x-2 gap-2">
            <button
              type="button"
              className="items-center border border-blue-500 rounded-full px-3 py-2 text-sm leading-3 text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
              onClick={convertToJSON}
            >
              複製JSON
            </button>
            <button
              type="button"
              className="items-center border border-blue-500 rounded-full px-3 py-2 text-sm leading-3 text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
              onClick={convertToMarkdown}
            >
              複製Markdown
            </button>
            <button
              type="button"
              className="items-center border border-blue-500 rounded-full px-3 py-2 text-sm leading-3 text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
              onClick={convertToHTMLTable}
            >
              複製HTML表格
            </button>
            <button
              type="button"
              className="inline-flex items-center border border-red-500 rounded-full px-3 text-sm text-red-500 hover:bg-red-500 hover:text-white focus:outline-none"
              onClick={handleClearClick}
            >
              <span className="material-symbols-outlined">clear_all</span>
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="file border-4 border-dashed border-transparent w-full bg-slate-700 dark:bg-slate-700 rounded-xl md:rounded-br-none p-2">
            <textarea
              className={
                !isTable && pastedData.trim() !== ""
                  ? "errorTextarea"
                  : "inputTextarea"
              }
              rows={8}
              cols={50}
              value={pastedData}
              onChange={handleOnChange}
              placeholder="拷貝並貼上要轉換的表格"
            />
          </div>
        </div>
      </section>
      <div className="tablePreview">
        {pastedData.trim() !== "" && isTable
          ? generateTablePreview()
          : pastedData.trim() !== "" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                請確保輸入的資料為至少包含一個表頭和一個內容行的表格。
              </p>
            )}
      </div>
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={handleOnOpen}
      >
        Toggle modal
      </button>

      <div
        ref={modalRef}
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                預覽
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
                onClick={modalCloseBtn}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6">
              <Code className={`language-json`}>
                {JSON.stringify(jsonArray, null, 2)}
              </Code>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
      <Code className={`language-html`}>{htmlCode}</Code>
      {showToast === true ? <ToastSuccess onClick={handleCloseToast} /> : null}
      {/* <TableEditor
        tableData={tableDataArray}
        updateTableData={updateTableData}
      /> */}
    </>
  );
};

export default TableToJSONConverter;
