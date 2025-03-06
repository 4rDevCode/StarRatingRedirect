import { useEffect, useState } from "react";
import { Rate } from "antd";
import "antd/dist/reset.css";
import "./styles.css";

interface RatingConfig {
  title: string;
  descriptions: string[];
  links: string[];
}

const defaultConfig: RatingConfig = {
  title: "¡Califica tu experiencia!",
  descriptions: [
    "No me ha gustado nada",
    "No me ha gustado",
    "No está mal",
    "Me ha gustado",
    "Me ha encantado",
  ],
  links: ["https://link1.com", "https://link2.com"],
};

export default function Rating() {
  const [, setRating] = useState(0); //rating
  const [config, setConfig] = useState<RatingConfig>(defaultConfig);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`configuration.json`);
        if (!response.ok) {
          throw new Error('Error al cargar el archivo de configuración');
        }
        const json = await response.json();
        setConfig(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConfig();
  }, []);

  const handleChange = (value: number) => {
    setRating(value);
    const url = value >= 4 ? config.links[0] : config.links[1];
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 text-center">
      <h2 className="custom-title font-bold mb-4">{config.title}</h2>
      <div className="flex justify-center">
        <Rate
          className="custom-rate text-8xl md:text-6xl sm:text-4xl xs:text-2xl"
          onChange={handleChange}
          allowHalf
          tooltips={config.descriptions}
        />
      </div>
    </div>
  );
}
