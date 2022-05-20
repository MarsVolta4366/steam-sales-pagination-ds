// Activity: https://dev.to/joefstack/handling-multi-page-api-calls-with-react-hooks-19jd
// ON STEP: Displaying Our Results 
// FIGURE OUT WHY LINE 22 IS CAUSING ERROR

import { useState } from "react"
import useFetchGames from "./helpers/useFetchGames"
import SearchForm from "./components/SearchForm"

function App() {

  const [params, setParams] = useState({})
  const [page, setPage] = useState(0)
  const { games, loading, error, hasNextPage } = useFetchGames(params, page)

  console.log(games, loading, error, hasNextPage)

  const handleParamChange = (e) => {
    console.log(e.target.name)
    const param = e.target.name
    const value = e.target.value
    setPage(0)
    setParams((prevParams) => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <div>
      <h1>Search Steam Sales</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
    </div>
  )
}

export default App
