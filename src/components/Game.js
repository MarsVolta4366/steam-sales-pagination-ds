import { Card, Button } from "react-bootstrap"

const Game = ({ game }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {game.title} -{" "}
                    <span className="text-muted font-weight-light" style={{ textDecoration: "line-through" }}>
                        ${game.normalPrice}
                    </span>
                    <span>{" - "}</span>
                    <span className="font-weight-light">${game.salePrice}</span>
                </Card.Title>

                <Card.Subtitle className="text-muted mb-2">
                    Release Date:{" "}
                    {new Date(game.releaseDate * 1000).toLocaleDateString()}
                </Card.Subtitle>
                <div className="mb-2">
                    <img
                        alt={game.title}
                        src={game.thumb}
                    />
                </div>
                <Button
                    variant="success"
                    href={`https://store.steampowered.com/app/${game.steamAppID}`}
                    target="_blank"
                >
                    Check it out
                </Button>
            </Card.Body>
        </Card>
    )
}

export default Game