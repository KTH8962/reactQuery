import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import MainPage from "@/pages/MainPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Header from "@/compnents/header/Header"

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
