import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import MainPage from "@/pages/MainPage"
import Header from "@/compnents/header/Header"
import DelayTime from "@/pages/DelayTime"
import UserList from "@/pages/UserList"
import MoviePage from "@/pages/MoviePage"

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/delay" element={<DelayTime />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/movies" element={<MoviePage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
