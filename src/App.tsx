import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import MainPage from "@/pages/MainPage"
import Header from "@/compnents/header/Header"
import DelayTime from "@/pages/DelayTime"
import UserList from "@/pages/UserList"
import MoviePage from "@/pages/MoviePage"
import MovieList from "@/pages/MovieList"

function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (_error, query) => {
        alert(query.meta?.myErrorMessage) // 오류 메시지 출력!
      },
    }),
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/delay" element={<DelayTime />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/movies2" element={<MovieList />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
