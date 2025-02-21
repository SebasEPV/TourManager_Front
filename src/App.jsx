import { BrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import Header from "./layout/header"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Home/>
    </BrowserRouter>
  )
}

export default App
