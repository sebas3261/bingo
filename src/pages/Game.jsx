import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function Game() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, "messages/latest");

    // Escuchar cambios en la base de datos
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages((prev) => [...prev, data.text]);
      }
    });

    return () => {};
  }, []);

  return (
    <div>
      <h1>Receptor</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
