import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // 新增狀態來追蹤所選的選項

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const options = [
    { label: "Excel", value: "Excel" },
    { label: "CSV", value: "CSV" },
    { label: "XML", value: "XML" },
    { label: "HTML Table", value: "HTMLTable" },
    { label: "Markdown Table", value: "MarkdownTable" },
    { label: "JSON Array", value: "JSONArray" },
    { label: "Insert SQL", value: "InsertSQL" },
    { label: "MySQL Query Output", value: "MySQLQueryOutput" },
    { label: "LaTeX Table", value: "LaTeXTable" },
    { label: "MediaWiki Table", value: "MediaWikiTable" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  return (
    <>
      <div className="relative group inline-block ml-3">
        <button
          onClick={toggleDropdown}
          className="flex items-center outline-none focus:outline-none border-blue-500 text-blue-500 px-3 py-1 bg-white dark:bg-slate-800"
        >
          <span className="pr-1">
            {selectedOption ? selectedOption.label : "Excel"}
          </span>
          <span className="material-symbols-outlined">expand_more</span>
        </button>
        {isOpen && (
          <ul className="absolute bg-white dark:bg-slate-700 dark:text-slate-300 shadow dark:shadow-xl rounded transform scale-0 group-hover:scale-100 min-w-min z-50">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 dark:text-slate-300 hover:text-white w-full text-left"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
