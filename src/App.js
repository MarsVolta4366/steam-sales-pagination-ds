// Activity: https://dev.to/joefstack/handling-multi-page-api-calls-with-react-hooks-19jd
import { useState } from "react"
import useFetchGames from "./helpers/useFetchGames"
import SearchForm from "./components/SearchForm"
import Game from "./components/Game"
import { Container, Spinner } from "react-bootstrap"
import GamesPagination from "./components/GamesPagination"

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

  const handleError = (error) => {
    if (error.message.includes("429")) {
      return "Sorry, too many requests, try again later"
    } else {
      return "Error, try again later"
    }
  }

  return (
    <Container>
      <h1>Search Steam Sales</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      {loading && <Spinner animation="border" variant="primary" />}
      {error && <h1>{handleError(error)}</h1>}
      {games.map((game, index) => {
        return <Game key={index} game={game} />
      })}
      <GamesPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  )
}

export default App
