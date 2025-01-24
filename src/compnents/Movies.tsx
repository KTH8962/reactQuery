import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
type Movie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const [searchText, setSearchText] = useState("")

  const {
    data: movies,
    error,
    isLoading,
  } = useQuery<Movie[]>({
    queryKey: ["movies", searchText], // 검색어
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com?apikey=${
          import.meta.env.VITE_API_KEY
        }&s=${searchText}`
      )
      const { Search: movies } = await res.json()
      console.log(movies)
      return movies || []
    },
    placeholderData: (prev) => prev,
    meta: {
      myErrorMessage: "영화를 검색할 수 없어요!",
    },
  })

  return (
    <>
      <input
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value)
        }}
      />
      {error && <div>{error?.message}</div>}
      {isLoading && <div>isLoading....</div>}
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {movies?.map((movie) => {
          return (
            <li key={movie.imdbID} style={{ width: "10%" }}>
              <h3>{movie?.Title}</h3>
              <img src={movie.Poster} style={{ width: "100%" }} />
            </li>
          )
        })}
      </ul>
    </>
  )
}
