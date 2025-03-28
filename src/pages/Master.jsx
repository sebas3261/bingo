import React, { useEffect, useState } from "react";

export default function Master() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => console.log("🟢 Conectado al WebSocket");
        
        ws.onmessage = async (event) => {
            const text = await event.data.text(); // Convertir Blob a texto
            console.log("📩 Mensaje recibido:", text);
            setMessages((prev) => [...prev, text]);
        };

        setSocket(ws);

        return () => ws.close();
    }, []);

    const sendMessage = () => {
        if (socket && message.trim()) {
            socket.send(message);
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Chat WebSocket (Emisor)</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
            />
            <button onClick={sendMessage}>Enviar</button>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}
