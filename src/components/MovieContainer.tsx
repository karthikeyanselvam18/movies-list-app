import React, { useState, useRef, useEffect } from "react";

export interface IMovieContainerProps {
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  original_language: string;
}

export function MovieContainer(props: IMovieContainerProps) {
  const { title, poster, overview, release_date, original_language } = props;
  const [year, month, date] = release_date.split("-");
  const formatted_date = `${date}-${month}-${year}`;
  let capitalized_title = "";
  if (original_language) {
    capitalized_title =
      original_language.charAt(0).toUpperCase() + original_language.slice(1);
  }
  const [isOverviewOpened, setIsOverviewOpened] = useState(false);
  const movieContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        movieContainerRef.current &&
        !movieContainerRef.current.contains(event.target as Node)
      ) {
        setIsOverviewOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let overviewStyle = isOverviewOpened
    ? {
        display: "inline",
        maxHeight: "none",
        overflow: "auto",
        backgroundColor: "#5a5a5af5",
      }
    : {
        display: "-webkit-box",
        maxHeight: "calc(2 * 1.2rem)",
        overflow: "hidden",
        backgroundColor: "transparent",
      };

  function handleOverviewClick() {
    setIsOverviewOpened((prev) => !prev);
  }

  return (
    <div className="movie-container" ref={movieContainerRef}>
      <div className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/w185/https://image.tmdb.org/t/p/w780${poster}`}
          alt={`${title} poster`}
        />
      </div>
      <div className="movie-details">
        <span className="movie-title">{title}</span>
        <div className="movie-overview-placeholder">
          <span
            className="movie-overview"
            onClick={handleOverviewClick}
            style={overviewStyle}
          >
            {overview}
          </span>
        </div>
        <div className="movie-other-details">
          <span className="movie-release-section">
            Release:{" "}
            <span className="movie-release-date">{formatted_date}</span>
          </span>
          <span className="movie-language-section">
            Language:{" "}
            <span className="movie-language">{capitalized_title}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
