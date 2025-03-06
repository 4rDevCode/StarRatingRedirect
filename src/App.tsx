// App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Rating from "./Rating";
import NotFound from "./NotFound";

export default function App() {
  const [config, setConfig] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Cargar el archivo JSON desde la carpeta public
    fetch("configuration.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar la configuración");
        }
        return response.json();
      })
      .then((data) => {
        setConfig(data);
        document.title = data.name; // Establece el título usando el name
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!config) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center"
      }}>
        Cargando...
      </div>
    );
  }
  

  return (
    <Router basename="/opina"> 
      <Routes>
        <Route path="/" element={<Rating />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
