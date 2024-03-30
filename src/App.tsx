import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { MovieContainer } from "./components/MovieContainer";
import { Pagination } from "./components/Pagination";
import HamsterLoading from "./components/HamsterLoading";

function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    let api =
      "https://api.themoviedb.org/3/discover/movie?api_key=01ef349e444d7e0a94ee9c1d929c2e9a&sort_by=popularity.desc";
    if (search !== "") {
      api = `https://api.themoviedb.org/3/search/movie?api_key=01ef349e444d7e0a94ee9c1d929c2e9a&query=${search}&include_adult=false&page=${pageNo}`;
    }

    fetch(api)
      .then((res) => res.json())
      .then((data: any) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        if (search !== "") setTotalPages(data.total_pages);
        else setTotalPages(0);
        const movieData = data.results
          .map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
            overview: movie.overview,
            release_date: movie.release_date,
            original_language: movie.original_language,
          }))
          .filter((movie: any) =>
            Object.values(movie).every(
              (value) => value !== null && value !== undefined
            )
          );
        setMovies(movieData);
      });
  }, [search, pageNo]);

  return (
    <>
      {isLoading && <HamsterLoading />}
      <Header setSearch={setSearch} />
      <div className="container">
        {movies.map((movie) => (
          <MovieContainer
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
            overview={movie.overview}
            release_date={movie.release_date}
            original_language={movie.original_language}
          />
        ))}
      </div>
      <Pagination
        pageNo={pageNo}
        setPageNo={setPageNo}
        totalPages={totalPages}
      />
    </>
  );
}

export default App;
