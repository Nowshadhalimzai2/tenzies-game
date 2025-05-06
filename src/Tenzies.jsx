import React from "react";
import Die from "./Die";
import Confetti from "react-confetti";
const Tenzies = () => {
  const [dice, setDice] = React.useState(() => generateNewDie());
  const [gameOver, setGameOver] = React.useState(false);
  const newGameRef = React.useRef(null);

  React.useEffect(() => {
    if (gameOver) {
      newGameRef.current.focus();
    }
  }, [gameOver]);

  function generateNewDie() {
    return new Array(10).fill(0).map((_, index) => ({
      id: index + 1,
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }
  const rollDice = () => {
    if (!gameOver) {
      audio.load(); // Preload the audio
      diceSound();
      setDice(
        dice.map((die) =>
          !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die
        )
      );
    } else {
      // Reset the game state
      setGameOver(false);
      setDice(generateNewDie());
    }
  };
  const audio = React.useMemo(() => {
    const sound = new Audio("/diceSound.mp3");
    sound.currentTime = 5; // Preload and set start time
    return sound;
  }, []);

  const diceSound = () => {
    audio.play();
    setTimeout(() => {
      audio.pause(); // Stop playback after 3 seconds
      audio.currentTime = 5; // Reset to start time
    }, 800); // Stops after 3 seconds
  };

  const handleHeld = (id) => {
    // Handle the logic for holding a die here
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };
  const checkWin = () => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setGameOver(true);
    }
  };
  React.useEffect(() => {
    checkWin();
  }, [dice]);
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onClick={() => handleHeld(die.id)}
    />
  ));

  return (
    <div className="h-full w-full rounded-lg bg-white flex flex-col justify-center items-center p-6  mx-auto">
      {gameOver && (
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={400}
            gravity={0.2}
            colors={["#a332ab", "#329abc", "#00aa44"]}
          />
        </div>
      )}
      {gameOver && (
        <div aria-live="assertive" className="sr-only">
          Congratulation! You won the match
        </div>
      )}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1040/1040204.png"
        alt="dice"
        className="w-16 h-16 mb-4"
      />

      <h1 className="text-4xl font-bold text-center mb-4">Tenzies</h1>
      <p className="text-gray-600 mb-4 text-center">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="grid mt-8 gap-y-2 grid-cols-5 gap-x-4">
        {diceElements}
      </div>
      <button
        className={`text-white px-6 py-2 rounded mt-4   ${
          gameOver ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={rollDice}
        ref={newGameRef}
      >
        {!gameOver ? "Roll" : "New Game"}
      </button>
    </div>
  );
};

export default Tenzies;
