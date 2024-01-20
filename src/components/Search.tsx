import React, { useContext, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

interface search {
  id: "string";
  thumb: "string";
  name: "string";
}

const Search: React.FC = () => {
  const [value, setValue] = useState("");
  let { getSearchResult, searchData, setCoinSearch, setSearchData } =
    useContext(CryptoContext) || {};
  console.log("searchData", searchData);

//   const debounceFunc = debounce((val: string) => {
//     if (getSearchResult) {
//       getSearchResult(val);
//     }
//   }, 1000);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    let query = e.currentTarget.value;
    setValue(query);
    if (getSearchResult) {
        getSearchResult(query);
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setCoinSearch) {
      setCoinSearch(value);
      setValue("");
    }
  };

  const selectCoin = (coin: string) => {
    if (setCoinSearch) {
      setCoinSearch(coin);
    }

    if (setSearchData) {
      setValue("");
    }
  };

  const renderSearchResults = () => (
    <ul className="absolute top-11 right-0 w-full left-0 overflow-x-hidden h-96 rounded bg-gray-200 bg-opacity-60 py-2 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200">
      {searchData && searchData.length > 0 ? (
        searchData.map((search: search) => (
          <li
            key={search.id}
            className="flex items-center ml-4 my-4 cursor-pointer"
            onClick={() => selectCoin(search.id)}
          >
            <img
              className="w-[1rem] h-[1rem] mx-1.5"
              src={search.thumb}
              alt={search.name}
            />
            <span>{search.name}</span>
          </li>
        ))
      ) : searchData === null ? (
        <div className="w-full h-full flex justify-center items-center">
          <div
            role="status"
            className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
          >
          </div>
            <span className="ml-2">Searching...</span>
        </div>
      ) : (
        searchData.length === 0 && "No results found"
      )}
    </ul>
  );
  return (
    <>
      <form
        className="w-96 relative flex items-center ml-7"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleInput}
          type="text"
          value={value}
          name="Search"
          placeholder="search here..."
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border focus:border-cyan"
        />
        <button type="submit" className="absolute right-1 cursor-pointer ">
          <img src={searchIcon} alt="Search" className="w-full h-auto" />
        </button>
        {value.trim().length > 0 && renderSearchResults()}
      </form>
    </>
  );
};

export default Search;
