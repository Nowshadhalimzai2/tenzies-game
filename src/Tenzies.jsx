import React from "react";
import Die from "./Die";
import Confetti from "react-confetti";
const Tenzies = () => {
  const [dice, setDice] = React.useState(() => generateNewDie());
  const [gameWon, setGameWon] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const newGameRef = React.useRef(null);
  const [attempt, setAttempt] = React.useState(() => 5);
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
    if (!gameOver && !gameWon) {
      audio.load(); // Preload the audio
      diceSound();
      setDice(
        dice.map((die) =>
          !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die
        )
      );
      setAttempt((prevAttempt) => prevAttempt - 1);
      if (attempt < 1) {
        setGameOver(true);
      }
    } else {
      // Reset the game state
      resetGame();
    }
  };
  const winAudio = React.useMemo(() => {
    const sound = new Audio("/winSound.wav");
    sound.currentTime = 5; // Preload and set start time
    return sound;
  }, []);
  const winSound = () => {
    winAudio.play();
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
  function resetGame() {
    // if game is over, reset the game state
    setDice(generateNewDie());
    setGameWon(false);
    setGameOver(false);
    setAttempt(5);
    //if game is reset, stop the sound
    audio.pause(); // Stop playback
    winAudio.pause(); // Stop playback
    setButtonAbled(false);
  }

  const handleHeld = (id) => {
    // Handle the logic for holding a die here
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };
  // Check if all dice are held and have the same value
  // If so, set gameWon to true
  const checkWin = () => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      // Play the win sound
      winAudio.load(); // Preload the audio
      winSound();
      setGameWon(true);
      newGameRef.current.focus(); // Focus on the button after winning
      // desable all dice buttons after winning
      setButtonAbled(true);
    }
    if (attempt < 1) {
      setGameOver(true);
      // desable all dice buttons after losing
      setButtonAbled(true);
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
  const setButtonAbled = (isAbled) => {
    document.querySelectorAll(".die").forEach((die) => {
      die.disabled = isAbled;
    });
  };
  return (
    <div
      className="h-full w-full rounded-lg bg-gray-100 flex flex-col justify-center space-y-4 items-center md:p-6 p-2 mx-auto"
      role="main"
      aria-labelledby="game-title"
    >
      {gameWon && (
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          role="alert"
          aria-live="assertive"
        >
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={400}
            gravity={0.2}
            colors={["#a332ab", "#329abc", "#00aa44"]}
          />
        </div>
      )}

      <img
        src="https://cdn-icons-png.flaticon.com/512/1040/1040204.png"
        alt="Dice icon"
        className="w-16 h-16 mb-4"
      />

      <h1
        id="game-title"
        className="md:text-4xl text-xl font-bold text-center text-gray-800"
      >
        Tenzies
      </h1>
      <small aria-live="polite">{attempt} Attempts Left</small>
      <p className="text-gray-600 mb-4 text-center">
        {!gameOver ? (
          "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
        ) : (
          <span className="text-red-500" role="alert" aria-live="assertive">
            Game Over! You have no more attempts left. Please click{" "}
            <strong>New Game</strong> to start again.
          </span>
        )}
      </p>
      <div
        className="text-green-500 font-bold text-2xl"
        role="status"
        aria-live="polite"
      >
        {gameWon && (
          <div>
            <span>You won the game!</span>
            <br />
            <span className="text-gray-800 animate-pulse text-sm">
              developed by Nowshad Halimzai
            </span>
          </div>
        )}
      </div>

      <div
        className="grid mt-8 gap-y-2 grid-cols-5 gap-x-2 w-[90%] md:w-[80%]"
        role="group"
        aria-label="Dice grid"
      >
        {diceElements}
      </div>
      <button
        className={`text-white px-6 py-2 rounded md:mt-4 mt-12 ${
          gameWon ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
        }`}
        onClick={rollDice}
        ref={newGameRef}
        aria-label={gameOver || gameWon ? "Start a new game" : "Roll the dice"}
      >
        {gameOver || gameWon ? "New Game" : "Roll"}
      </button>
    </div>
  );
};

export default Tenzies;
