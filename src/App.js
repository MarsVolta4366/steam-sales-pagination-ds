// Activity: https://dev.to/joefstack/handling-multi-page-api-calls-with-react-hooks-19jd
// ON STEP: Setting Up Our Search Form

import { useState } from "react"
import useFetchGames from "./helpers/useFetchGames"

function App() {

  const [params, setParams] = useState({})
  const [page, setPage] = useState(0)
  const { games, loading, error, hasNextPage } = useFetchGames(params, page)

  console.log(games, loading, error, hasNextPage)

  return (
    <div>
      <h1>Search Steam Sales</h1>
    </div>
  )
}

export default App
