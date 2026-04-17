import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search({ onSearch }) {
  const inputRef = useRef();

  const handleClick = () => {
    if (onSearch && inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  return (
    <div className="search bg-cyan-100 text-black w-fit h-fit p-2 pl-4 rounded-lg shadow-4xl">
      <div className="flex items-center gap-4 text-base">
        <input
          type="text"
          placeholder="Type location here"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
          className="focus:outline-none uppercase placeholder:capitalize"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          onClick={handleClick}
          className="hover:bg-cyan-200 p-3 rounded-xl cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Search;
