import React, { useState, useEffect, useCallback } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"

export interface Page {
  Search: Movie[] // 검색된 영화 목록
  totalResults: string // 검색된 모든 결과의 수
  Response: string // 'True' or 'False'
}
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies2() {
  const [searchText, setSearchText] = useState("avenge")
  const [queryText, setQueryText] = useState("")

  const {
    data, // 가져온 데이터
    isLoading, // 첫 페이지 가져오는 중
    isFetching, // 다음 페이지 가져오는 중
    isFetched, // 첫 페이지 가져오기 완료
    hasNextPage, // 다음 페이지가 있는지 여부
    fetchPreviousPage, // 이전 페이지 가져오기 함수
    fetchNextPage, // 다음 페이지 가져오기 함수
  } = useInfiniteQuery<Page>({
    queryKey: ["movies", queryText], // 검색어로 쿼리 키 생성!
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=${
          import.meta.env.VITE_API_KEY
        } &s=${queryText}&page=${pageParam}`
      )
      console.log(pageParam)
      return res.json()
    },
    initialPageParam: 1, // 첫 페이지 번호 초기화!
    getNextPageParam: (lastPage, pages) => {
      // 한 페이지당 최대 10개까지의 영화 정보를 가져옴!
      // 마지막 페이지 번호 계산!
      console.log(lastPage)
      console.log(pages)
      const maxPage = Math.ceil(Number.parseInt(pages[0].totalResults, 10) / 10)
      console.log(maxPage)
      // 다음 페이지가 있으면, 다음 페이지 번호 반환!
      if (lastPage.Response === "True" && pages.length < maxPage) {
        return pages.length + 1
      }
      // 다음 페이지가 없으면 undefined | null 반환!
      return undefined
    },
    enabled: false, // 검색어 입력 전까지 대기!
    staleTime: 1000 * 60 * 5, // 5분
  })

  useEffect(() => {
    // 검색어가 변경될 때마다, 캐시된 데이터가 있어서 그 데이터의 다음 페이지를 가져오지 않도록 이미 캐시된 이전 페이지를 가져옴!
    if (queryText) fetchPreviousPage()
  }, [queryText, fetchPreviousPage])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      // 검색!
      if (searchText.trim()) {
        setQueryText(searchText)
      }
      // 초기화!
      if (!searchText.trim()) {
        setSearchText("")
        setQueryText("")
      }
    },
    [searchText]
  )

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          placeholder="영화 제목을 입력하세요."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {data?.pages.map((page, index) => (
          // 각 페이지의 출력 최적화를 위해, 페이지 단위 key 속성을 추가!
          <React.Fragment key={index}>
            {page.Search &&
              page.Search.map((movie) => (
                <div key={movie.imdbID} style={{ width: "9%" }}>
                  {movie.Title}
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    style={{ width: "100%" }}
                  />
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
      {isLoading ? <div>로딩 중..</div> : null}
      {isFetched && hasNextPage && (
        <button disabled={isFetching} onClick={() => fetchNextPage()}>
          {isFetching ? "로딩 중.." : "더 보기!"}
        </button>
      )}
    </>
  )
}
