import React, { FormEvent, useContext, useRef, useState } from "react";
import PaginationIcon from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import submit from "../assets/submit-icon.svg";

const PerPage: React.FC = () => {
  let {setPerPage} = useContext(CryptoContext) || {}
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent ) => {
    e.preventDefault()
    if (inputRef.current) {
      let val = inputRef.current.value
      if (+val !== 0) {
        setPerPage && setPerPage(+val)
        inputRef.current.value = val
      }
    }
  }
  return (
    <form
      className="relative flex items-center mr-12"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="perpage"
        className="relative flex items-center justify-center mr-2 font-bold"
      >
        perpage:
      </label>
      <input
        ref={inputRef}
        type="number"
        name="perpage"
        min={1}
        max={250}
        id="perpage"
        placeholder="10"
        className="w-16 rounded bg-gray-200 focus:border-cyan placeholder:text-gray-100 pl-2 required outline-0 border leading-4"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submit} className="w-full h-auto" />
      </button>
    </form>
  );
};

const Pagination: React.FC = () => {
  let { page, setPage, totalPages = 0, perPage = 0, cryptoData } = useContext(CryptoContext) || {};
  const totalNumber = Math.ceil(totalPages / perPage);
  const next = () => {
    if (page === totalNumber) {
      return null;
    } else {
      setPage && page && setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage && page && setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page && page + 3 >= totalNumber) {
      setPage && setPage(totalNumber - 1);
    } else {
      setPage && page && setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page && page - 3 <= 1) {
      setPage && setPage(totalNumber + 1);
    } else {
      setPage && page && setPage(page - 2);
    }
  };
  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex items-center">
        <PerPage />
        <ul className="flex items-center justify-end text-sm">
          <li className="flex items-center">
            <button className="w-full h-auto rotate-180" onClick={prev}>
              <img src={PaginationIcon} alt="left" className="w-full h-auto" />
            </button>
          </li>
  
          {(page && page + 1 === totalNumber) ||
          (page && page === totalNumber) ? (
            <li>
              <button
                onClick={multiStepPrev}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          ) : null}
          {page && page - 1 !== 0 ? (
            <li>
              <button
                onClick={prev}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 items-center justify-center bg-gray-200 mx-1.5"
              >
                {page - 1}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="outline-0 rounded-full w-8 h-8 items-center justify-center bg-cyan text-gray-300 mx-1.5"
            >
              {page}
            </button>
          </li>
          {page && page + 1 !== totalNumber && page !== totalNumber ? (
            <li>
              <button
                onClick={next}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 items-center justify-center bg-gray-200 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          ) : null}
          {page && page + 1 !== totalNumber && page !== totalNumber ? (
            <li className="outline-0 hover:text-cyan rounded-full w-8 h-8 items-center justify-center text-lg">
              <button
                onClick={multiStepNext}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          ) : null}
          {page !== totalNumber ? (
            <li>
              <button
                onClick={() => setPage && setPage(totalNumber)}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 items-center justify-center bg-gray-200 mx-1.5"
              >
                {totalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button className="w-full h-auto" onClick={next}>
              <img src={PaginationIcon} alt="left" className="w-full h-auto" />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null
  }
};

export default Pagination;
