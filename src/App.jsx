import { useState } from "react";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSaveName = () => {
    if (name == ""){
      return
    }
    localStorage.setItem("nombre", name);
    navigate("/game")
  }

  return(
    <div>
      <h1>Nombre</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div onClick={()=>{handleSaveName()}}>enviar</div>
    </div>
  )  
}

export default App
