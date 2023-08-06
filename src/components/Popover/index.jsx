import React, { useState } from "react";
import { usePopper } from "react-popper";
import { LongEl, Tooltip, Button } from "./Popover.styled";
import PopoverExample from "./PopoverExample";

function App() {
  const [referenceEl, setReferenceEl] = useState(null);
  const [popperEl, setPopperEl] = useState(null);

  const { styles, attributes } = usePopper(referenceEl, popperEl, {
    placement: "bottom",
  });

  const showTooltip = () => {
    popperEl.setAttribute("data-show", true);
  };

  const hideTooltip = () => {
    popperEl.removeAttribute("data-show");
  };

  return (
    <>
      <div className="min-h-screen m-0 dark:text-white dark:bg-gray-900">
        <PopoverExample />
        <div className="flex items-center justify-center gap-4">
          <div>
            <LongEl />
            <Button
              onMouseEnter={showTooltip}
              onMouseLeave={hideTooltip}
              ref={setReferenceEl}
            >
              {`I'm a mystery`}
            </Button>
            <Tooltip
              ref={setPopperEl}
              style={styles.popper}
              {...attributes.popper}
            >
              <p>A tooltip</p>
            </Tooltip>
            <LongEl />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
