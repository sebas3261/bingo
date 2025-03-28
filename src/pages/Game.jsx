import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue, set } from "firebase/database";
import dictionary from "../../dictionary.json";
import { useNavigate } from "react-router";
import "./Game.css";

export default function Game() {
  const [wordsReceived, setWordsReceived] = useState([]); // Guarda palabras recibidas con su definición
  const [randomWords, setRandomWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [name, setName] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);
  const navigate = useNavigate();

  const toggleSelected = (word) => {
    setSelectedWords((prev) =>
      prev.includes(word)
        ? prev.filter((w) => w !== word) // Si ya está, la quitamos
        : [...prev, word] // Si no está, la agregamos
    );
  };

  useEffect(() => {
    const messagesRef = ref(database, "messages/latest");
    const gameOverRef = ref(database, "gameOver");

    setName(localStorage.getItem("nombre"));

    // Escuchar los mensajes de Firebase
    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.word === "restart") {
          resetGame(); // Si llega "restart", reinicia el juego
        } else {
          // Buscar la palabra correspondiente a la definición recibida
          const matchingWord = Object.keys(dictionary).find(
            (word) => dictionary[word] === data.text
          );

          if (matchingWord) {
            setWordsReceived((prev) => [
              ...prev,
              { word: matchingWord, definition: data.text }
            ]);
          }
        }
      }
    });

    // Escuchar si el juego terminó
    const unsubscribeGameOver = onValue(gameOverRef, (snapshot) => {
      setGameOver(snapshot.val() === true);
    });

    getRandomWords();

    // Limpiar suscripciones al desmontar
    return () => {
      unsubscribeMessages();
      unsubscribeGameOver();
    };
  }, []);

  function getRandomWords() {
    const words = Object.keys(dictionary);
    let selectedWords = [];

    while (selectedWords.length < 9) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const word = words[randomIndex];

      if (!selectedWords.some((item) => item.word === word)) {
        selectedWords.push({ word, definition: dictionary[word] });
      }
    }

    setRandomWords(selectedWords);
  }

  function checkBingo() {
    console.log("🔹 Palabras en Bingo:", randomWords.map((w) => w.word));
    console.log("🔹 Palabras recibidas:", wordsReceived.map((w) => w.word));

    // Compara solo los nombres de las palabras
    const allWordsSent = randomWords.every((item) =>
      wordsReceived.some((received) => received.word === item.word)
    );

    if (allWordsSent) {
      set(ref(database, "gameOver"), true);
      navigate("/won");
      alert("¡BINGO! El juego ha terminado.");
    } else {
      alert("Aún no tienes Bingo. Sigue esperando palabras.");
    }
  }

  function resetGame() {
    setWordsReceived([]); // Limpiar palabras recibidas
    setGameOver(false);
    set(ref(database, "gameOver"), false); // Reiniciar estado en Firebase
    getRandomWords(); // Obtener nuevas palabras aleatorias
    alert("¡El juego se ha reiniciado!");
  }

  return (
    <div className="backGame">
      {gameOver ? (
        <h2>🚨 El juego ha terminado. 🚨</h2>
      ) : (
        <>
          <h2>Última palabra recibida:</h2>
          {wordsReceived.length > 0 ? (
            <div>
              <strong>{wordsReceived[wordsReceived.length - 1].definition}</strong> 
              {/* 🔹 Ahora mostramos la definición en vez de la palabra */}
            </div>
          ) : (
            <p>Esperando...</p>
          )}

          <h2>Definiciones aleatorias:</h2>
          <div className="cardContainer">
            {randomWords.map((item, index) => (
              <div
                key={index}
                className={`card ${
                  selectedWords.includes(item.word) ? "selected" : ""
                }`}
                onClick={() => toggleSelected(item.word)}
              >
                {item.definition} {/* 🔹 Mostramos la definición en vez de la palabra */}
              </div>
            ))}
          </div>
          <button onClick={checkBingo} disabled={gameOver} className="sendApp">
            Bingo
          </button>
        </>
      )}
    </div>
  );
}
