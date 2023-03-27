import React from "react";
import { useEffect, useRef } from "react";
import logo from "../logos/logo-rec.png";
import Input from "./Input";
import SearchLogo from "./SearchLogo";
const Navbar = (props) => {
  const tmdbLogo =
    "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";

  const queryRef = useRef("");
  //this function is called whenever the search input field changes. It updates the searchKey state variable with the value of the input field.
  const handleInputChange = (e) => {
    props.setSearchKey(e.target.value);
    e.preventDefault();
  };

  //  this function is called whenever the searchKey state variable changes. It performs a search with the current search query.
  useEffect(() => {
    queryRef.current = props.searchKey;
    // Perform the search whenever the query changes
    props.onTypingResults(props.searchKey);
  }, [props]);

  //this function is called when the user clicks on the "X" button next to the search input field. It clears the search query and resets the input field.
  const clearSearch = (e) => {
    queryRef.current = "";
    e.preventDefault();
    props.setSearchKey("");
  };

  //: this function is called when the user clicks on a search result in the search results list. It selects the clicked search result and performs a search with the selected search result.
  const navListClick = (movie) => {
    props.selectMovie(movie);
    props.setSearchKey("");
    props.searchMovies();
  };

  return (
    <header>
      <div className="grid grid-cols-5 gap-4 px-4">
        <a href="/" className="">
          <div className="flex flex-row items-center">
            <img className="nav-logo" alt="logo" src={logo}></img>
          </div>
        </a>
        <div className="grid col-start-2 col-end-5">
          <form className="" onSubmit={props.searchMovies}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <SearchLogo />
              <Input
                searchKey={props.searchKey}
                handleInputChange={handleInputChange}
                queryRef={queryRef}
              />
              <button type="submit" className="button" onClick={clearSearch}>
                X
              </button>
              <div className="w-full">
                {queryRef.current.length > 0 && (
                  <ul className="w-full pt-2 rounded-2xl bg-gray-700 absolute z-50 text-white ">
                    {props.moviesNav.map((result) => (
                      <li
                        key={result.id}
                        className="text-sm h-8 hover:text-white hover:bg-red-500 cursor-pointer rounded-sm"
                        onClick={() => navListClick(result)}
                      >
                        {result.original_title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-row items-center gap-3 justify-end">
          <p>API from </p>
          <a href="https://www.themoviedb.org/">
            <img alt="logo" src={tmdbLogo} height={"150px"} width={"150px"} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
