// Activity: https://dev.to/joefstack/handling-multi-page-api-calls-with-react-hooks-19jd
// ON STEP: Displaying Our Results 

import { useState } from "react"
import useFetchGames from "./helpers/useFetchGames"
import SearchForm from "./components/SearchForm"
import Game from "./components/Game"
import { Container, Spinner } from "react-bootstrap"

function App() {

  const [params, setParams] = useState({})
  const [page, setPage] = useState(0)
  const { games, loading, error, hasNextPage } = useFetchGames(params, page)

  console.log(games, loading, error, hasNextPage)

  const handleParamChange = (e) => {
    const param = e.target.name
    const value = e.target.value
    setPage(0)
    if (param === "upperPrice" && value.length === 0) {
      setParams((prevParams) => {
        return { ...prevParams, upperPrice: undefined }
      })
    } else {
      setParams((prevParams) => {
        return { ...prevParams, [param]: value }
      })
    }
  }

  return (
    <Container>
      <h1>Search Steam Sales</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      {loading && <Spinner animation="border" variant="primary" />}
      {games.map((game, index) => {
        return <Game key={index} game={game} />
      })}
    </Container>
  )
}

export default App
