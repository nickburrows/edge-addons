/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Highlight } from "prism-react-renderer";

import copy from "copy-to-clipboard";

const Code = ({ children, className }) => {
  const language = className.replace(/language-/gm, "");
  const [copied, setCopied] = useState("Copy");

  const handleOnCopy = () => {
    copy(children);
    setCopied("Copied!");
    setTimeout(() => {
      setCopied("Copy");
    }, "1500");
  };
  return (
    <Highlight code={children.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="code-highlight" data-language={language}>
          <div className="absolute right-2 top-2">
            <button
              type="button"
              className="btn-xs btn-dark normal-case"
              onClick={handleOnCopy}
            >
              {copied}
            </button>
          </div>
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default Code;
