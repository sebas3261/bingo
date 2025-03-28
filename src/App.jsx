import { useState } from "react";
import { useNavigate } from "react-router";
import "./App.css"

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSaveName = () => {
    if (name == ""){
      return
    }
    if(name == "SofiaSanchezSandoval"){
      navigate("/master")
      return
    }
    localStorage.setItem("nombre", name);
    navigate("/game")
  }

  return(
    <div className="backApp">
    <div className="box">
      <h1>Nombre</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div onClick={()=>{handleSaveName()}} className="sendApp">enviar</div>
    </div>
    </div>
  )  
}

export default App
