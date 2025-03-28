import React, { useState } from "react";
import { database } from "../firebase";
import { ref, set } from "firebase/database";
import dictionary from "../../dictionary.json";

export default function Master() {
  const [wordsLeft, setWordsLeft] = useState(Object.keys(dictionary));
  const [currentWord, setCurrentWord] = useState(null);
  const [sentWords, setSentWords] = useState([]); 
  

  const sendMessage = () => {
    if (!currentWord) {
      alert("Selecciona una palabra antes de enviar.");
      return;
    }

    // Guardar la definición en Firebase
    set(ref(database, "messages/latest"), {
      text: currentWord.definition,
      word: currentWord.word,
      timestamp: Date.now(),
    })
      .then(() => {
        console.log("Mensaje enviado a Firebase");
        setSentWords((prev) => [...prev, currentWord]); // 🔹 Guardar palabra enviada
      })
      .catch((error) => console.error("Error al enviar a Firebase:", error));
  };

  function getRandomWord() {
    if (wordsLeft.length === 0) {
      alert("Ya no hay más palabras disponibles.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * wordsLeft.length);
    const selectedWord = wordsLeft[randomIndex];

    // Filtramos para eliminar la palabra seleccionada
    setWordsLeft(wordsLeft.filter((word) => word !== selectedWord));

    setCurrentWord({ word: selectedWord, definition: dictionary[selectedWord] });
  }

  const restart = () => {
    // Reiniciar Firebase
    set(ref(database, "messages"), {
      latest: { text: "restart", word: "", timestamp: Date.now() },
      previousWords: [], // Borra las palabras previas
    });

    set(ref(database, "gameOver"), false); // Reinicia el estado de fin del juego

    // Reiniciar el estado local
    setWordsLeft(Object.keys(dictionary));
    setCurrentWord(null);
    setSentWords([]); // 🔹 Limpiar palabras enviadas

    console.log("Juego reiniciado");
  };

  return (
    <div>
      <h1>Seleccion de palabras</h1>

      {currentWord && (
        <div>
          <h2>{currentWord.word}</h2>
          <p>{currentWord.definition}</p>
        </div>
      )}

      <button onClick={getRandomWord}>Obtener Palabra</button>
      <button onClick={sendMessage}>Enviar palabra</button>
      <button onClick={restart}>Restart</button>

      <h2>Palabras enviadas:</h2>
      <ul>
        {sentWords.map((wordObj, index) => (
          <li key={index}>
            <strong>{wordObj.word}:</strong> {wordObj.definition}
          </li>
        ))}
      </ul>
    </div>
  );
}
