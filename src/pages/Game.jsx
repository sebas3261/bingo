import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Game() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const storedName = localStorage.getItem("nombre");
        if (!storedName) {
            navigate("/");
            return;
        }
        setName(storedName);
    }, []);

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

    return (
        <div>
            <h1>Receptor - Hola {name}</h1>
            {messages[messages.length - 1]}
        </div>
    );
}
