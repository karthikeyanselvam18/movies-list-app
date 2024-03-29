import React, { useState } from "react";
import popcorn_img from "../assets/popcorn.png";

export interface IHeaderProps {
  setSearch: (searchTerm: string) => void;
}

export function Header(props: IHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: any) => {
    props.setSearch(searchTerm);
    event.preventDefault();
  };

  return (
    <header>
      <div className="logo">
        <img src={popcorn_img} alt="" />
        <h1>Popcorn Paradox</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <input
            type="search"
            name="search"
            id="search-input"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </header>
  );
}
