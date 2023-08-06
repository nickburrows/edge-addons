import React from "react";

const DataOutput = () => {
  return (
    <>
      <section className="shadow dark:shadow-xl rounded-xl bg-white dark:bg-slate-800">
        <div className="flex flex-row justify-between items-center p-3 md:p-6">
          <div className="flex items-center justify-center">
            <div
              id="TableGenerator"
              className="flex items-center text-slate-700 dark:text-slate-300"
            >
              <i className="icon icon-json bg-slate-700 icon-rounded-full mr-3" />
              <span className="font-semibold text-base">Table Generator</span>
            </div>
            <a
              href="https://twitter.com/FechinLi"
              target="_blank"
              className="hidden md:inline items-center border border-[#4a99e9] rounded-full ml-5 px-4 py-1 text-xs select-none text-[#4a99e9] hover:bg-[#4a99e9] hover:text-white focus:outline-none"
              rel="noreferrer"
            >
              <i className="text-xs icon icon-twitter mr-2" />
              Follow Me
            </a>
          </div>
          <div className="flex flex-row items-center justify-center space-x-1 md:space-x-4">
            <a
              href="/sponsor/"
              className="hidden md:inline items-center border border-red-500 rounded-full px-5 text-sm leading-8 select-none text-red-500 hover:bg-red-500 hover:text-white focus:outline-none"
            >
              <i className="text-sm icon icon-heart mr-1" />
              Sponsor
            </a>
            <button
              id="copy"
              className="items-center border border-blue-500 rounded-full px-5 text-sm leading-8 select-none text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              <i className="text-sm icon icon-copy mr-1" />
              Copy to Clipboard
            </button>
            <button
              id="download"
              className="hidden md:inline items-center border border-blue-500 rounded-full px-5 text-sm leading-8 select-none text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              <i className="text-sm icon icon-download mr-1" />
              Download
            </button>
          </div>
        </div>
        <div className="output overflow-x-auto">
          <div className="items flex justify-evenly space-x-1 md:space-x-2 px-6 py-2.5 bg-slate-50 dark:bg-slate-700 w-screen min-w-max">
            <a data-remember href="/excel-to-markdown">
              Markdown
            </a>
            <a data-remember href="/excel-to-magic">
              Magic
            </a>
            <a data-remember href="/excel-to-latex">
              LaTeX
            </a>
            <a data-remember href="/excel-to-sql">
              SQL
            </a>
            <a data-remember href="/excel-to-html">
              HTML
            </a>
            <a data-remember href="/excel-to-csv">
              CSV
            </a>
            <a data-remember href="/excel-to-excel">
              Excel
            </a>
            <a data-remember href="/excel-to-json" className="active">
              JSON
            </a>
            <a data-remember href="/excel-to-jsonlines">
              JSONLines
            </a>
            <a data-remember href="/excel-to-ascii">
              ASCII
            </a>
            <a data-remember href="/excel-to-mediawiki">
              MediaWiki
            </a>
            <a data-remember href="/excel-to-asciidoc">
              AsciiDoc
            </a>
            <a data-remember href="/excel-to-tracwiki">
              TracWiki
            </a>
            <a data-remember href="/excel-to-qlik">
              Qlik
            </a>
            <a data-remember href="/excel-to-dax">
              DAX
            </a>
            <a data-remember href="/excel-to-firebase">
              Firebase
            </a>
            <a data-remember href="/excel-to-yaml">
              YAML
            </a>
            <a data-remember href="/excel-to-xml">
              XML
            </a>
            <a data-remember href="/excel-to-jira">
              Jira
            </a>
            <a data-remember href="/excel-to-textile">
              Textile
            </a>
            <a data-remember href="/excel-to-restructuredtext">
              reStructuredText
            </a>
            <a data-remember href="/excel-to-php">
              PHP
            </a>
            <a data-remember href="/excel-to-ruby">
              Ruby
            </a>
            <a data-remember href="/excel-to-asp">
              ASP
            </a>
            <a data-remember href="/excel-to-actionscript">
              ActionScript
            </a>
            <a data-remember href="/excel-to-bbcode">
              BBCode
            </a>
            <a data-remember href="/excel-to-pdf">
              PDF
            </a>
            <a data-remember href="/excel-to-jpeg">
              JPEG
            </a>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row p-3 md:p-6">
          <div className="w-full mt-8 md:mt-0 md:mr-4 md:w-1/4 space-y-8">
            <div className="options json flex flex-col w-full">
              <div className="space-y-4">
                <label className="_checkbox-wrapper">
                  <div className="_main">
                    <input
                      type="checkbox"
                      name="parsingJSON"
                      className="onchange opacity-0 absolute"
                    />
                    <i className="_icon icon icon-tick" />
                  </div>
                  <div className="_tooltip">
                    Parsing JSON
                    <div className="tooltip group">
                      <i className="icon icon-info ml-1.5" />
                      <div className="tooltip-content">
                        Note that you may lose some digits or a whole number
                      </div>
                    </div>
                  </div>
                </label>
                <label className="_checkbox-wrapper">
                  <div className="_main">
                    <input
                      type="checkbox"
                      name="minify"
                      className="onchange opacity-0 absolute"
                    />
                    <i className="_icon icon icon-tick" />
                  </div>
                  <div className="_tooltip">
                    Minify JSON
                    <div className="tooltip group">
                      <i className="icon icon-info ml-1.5" />
                      <div className="tooltip-content">
                        It helps to compress JSON data
                      </div>
                    </div>
                  </div>
                </label>
                <label className="_checkbox-wrapper">
                  <div className="_main">
                    <input
                      type="checkbox"
                      name="wrapper"
                      className="onchange opacity-0 absolute"
                    />
                    <i className="_icon icon icon-tick" />
                  </div>
                  <div className="_tooltip">
                    Wrapper by ‘data’
                    <div className="tooltip group">
                      <i className="icon icon-info ml-1.5" />
                      <div className="tooltip-content">
                        {`Make 'data' as the key, the conversion result as the`}
                        {`value`}
                      </div>
                    </div>
                  </div>
                </label>
                <div className="_dropdown-wrapper">
                  <label className="_label">JSON Format</label>
                  <div className="_main">
                    <select name="format" className="_select onchange">
                      <option value="object" selected>
                        Array of Object
                      </option>
                      <option value="2d">2D Array</option>
                      <option value="column">Column Array</option>
                      <option value="keyed">Keyed Array</option>
                    </select>
                    <i className="_icon icon icon-unfold" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4 border-0 md:border-l dark:border-slate-800">
            <div className="output relative flex flex-col w-full h-full">
              <textarea
                className="text-sm w-full h-full dark:bg-slate-700 dark:text-slate-100 border md:border-0 dark:border-slate-800 p-3 rounded-xl text-slate-700 font-mono focus:outline-none"
                id="outputContent"
                rows={14}
                aria-label="Generator Result"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                defaultValue={""}
              />
              <div
                id="bsa_custom"
                className="text-xs absolute bottom-0 left-0 rounded-tr-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataOutput;
