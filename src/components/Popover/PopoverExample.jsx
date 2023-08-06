import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";

const PopoverExample = () => {
  const [show, setShow] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
    placement: "top",
  });

  const handleOnClick = () => {
    if (show === true) {
      popperElement.classList.add("invisible", "opacity-0");
      setShow(false);
    } else if (show === false) {
      popperElement.classList.remove("invisible", "opacity-0");
      setShow(true);
    }
  };

  return (
    <>
      <div className="p-4 w-full mx-auto">
        <button
          ref={setReferenceElement}
          data-popover-target="popover-click"
          data-popover-trigger="click"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleOnClick}
        >
          Default popover
        </button>
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          data-popover
          id="popover-click"
          role="tooltip"
          className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Popover title
            </h3>
          </div>
          <div className="px-3 py-2">
            <p>{`And here's some amazing content. It's very engaging. Right?`}</p>
          </div>
          <div ref={setArrowElement} style={styles.arrow} data-popper-arrow />
        </div>
      </div>
    </>
  );
};

export default PopoverExample;
