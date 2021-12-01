import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./component/cards";

const cardImage = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [user, setUser] = useState("");

  // shuffle card
  const shuffleCards = () => {
    const shuffledCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
        matched: false,
      }));

    setCards(shuffledCards);
    setTurns(0);
  };

  //handle choice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare two card
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceTwo.src === choiceOne.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setTimeout(() => resetTurn(), 1000);
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceTwo, choiceOne]);

  //reset turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (user !== "") {
      shuffleCards();
    }
  }, [user]);

  return (
    <div className="App">
      {user !== "" ? (
        <>
          <h1>Magic Game</h1> <button onClick={shuffleCards}>New Game</button>
          <p className="username">{user}</p>
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                handleChoice={handleChoice}
                key={card.id}
                card={card}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
          <p>Turn: {turns}</p>
        </>
      ) : (
        <div className="logincontainer">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="your name please"
          />
          <button onClick={() => setUser(name)}>login</button>
        </div>
      )}
    </div>
  );
}

export default App;
