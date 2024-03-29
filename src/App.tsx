import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { MovieContainer } from "./components/MovieContainer";

function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    let api =
      "https://api.themoviedb.org/3/discover/movie?api_key=01ef349e444d7e0a94ee9c1d929c2e9a&sort_by=popularity.desc";
    if (search != "") {
      api = `https://api.themoviedb.org/3/search/movie?api_key=01ef349e444d7e0a94ee9c1d929c2e9a&query=${search}&include_adult=true&page=1`;
    }

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const movieData = data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          original_language: movie.original_language,
        }));
        setMovies(movieData);
      });
  }, [search]);

  return (
    <>
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
    </>
  );
}

export default App;
