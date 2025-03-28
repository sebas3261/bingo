import React, { useState } from "react";
import { database } from "../firebase";
import { ref, set } from "firebase/database";

export default function Master() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() === "") return;

    // Guardar el mensaje en Firebase
    set(ref(database, "messages/latest"), {
      text: message,
      timestamp: Date.now(),
    });

    setMessage("");
  };

  return (
    <div>
      <h1>Emisor</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
