import React, { useEffect, useState } from "react";

const TableDataRenderer = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // 從 localStorage 中取得 JSON 資料
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      const jsonData = JSON.parse(storedData);
      setTableData(jsonData);
      generateHTMLTable();
      generateMarkdownTable();
    }
  }, []);

  const generateHTMLTable = () => {
    if (tableData.length === 0) {
      return ""; // 若 tableData 為空，則返回空字串
    }

    const firstRow = tableData[0];
    const isSingleValueHeader =
      firstRow.length === 1 &&
      firstRow[0].trim() !== "" &&
      firstRow[0] !== "Results";

    let htmlTable = "<table>\n";
    if (isSingleValueHeader) {
      // 只有一個值，設置 colspan 為表格內容的列數
      const colspan = tableData[1].length;
      htmlTable += `  <thead><tr><th colspan="${colspan}">${firstRow[0]}</th></tr></thead>\n`;
    } else {
      // 標頭行
      htmlTable += "  <thead>\n    <tr>\n";
      for (const cell of firstRow) {
        if (cell.trim() !== "") {
          htmlTable += `      <th>${cell}</th>\n`;
        }
      }
      htmlTable += "    </tr>\n  </thead>\n  <tbody>\n";
    }

    // 內容行
    for (let i = 1; i < tableData.length; i++) {
      const row = tableData[i];
      htmlTable += "    <tr>\n";
      for (const cell of row) {
        if (cell.trim() !== "") {
          htmlTable += `      <td>${cell}</td>\n`;
        }
      }
      htmlTable += "    </tr>\n";
    }

    htmlTable += "  </tbody>\n</table>";

    return htmlTable;
  };

  const generateMarkdownTable = () => {
    if (tableData.length === 0) {
      return ""; // 若 tableData 為空，則返回空字串
    }

    // 構建表格標頭
    const headers = tableData[0];
    const tableHeader = `| ${headers.join(" | ")} |\n|${headers
      .map(() => " --- ")
      .join("|")} |`;

    // 構建表格內容
    const tableBody = tableData
      .slice(1)
      .map((row) => {
        return `| ${row.join(" | ")} |`;
      })
      .join("\n");

    // 構建完整的 Markdown 表格
    const markdownTable = `${tableHeader}\n${tableBody}`;

    return markdownTable;
  };

  return (
    <div>
      <h2>從 LocalStorage 中獲取的表格資料：</h2>
      {tableData.length > 0 ? (
        <>
          <h3>HTML 表格：</h3>
          <div dangerouslySetInnerHTML={{ __html: generateHTMLTable() }} />

          <h3>Markdown 表格：</h3>
          <pre>{generateMarkdownTable()}</pre>
        </>
      ) : (
        <p>沒有找到表格資料。</p>
      )}
    </div>
  );
};

export default TableDataRenderer;
