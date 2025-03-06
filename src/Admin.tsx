import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";

interface RatingConfig {
  descriptions: string[];
  links: string[];
}

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [config, setConfig] = useState<RatingConfig>({
    descriptions: ["", "", "", "", ""],
    links: ["", ""],
  });

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('configuration.json');
        if (!response.ok) {
          throw new Error('Error al cargar el archivo de configuración');
        }
        const data: RatingConfig = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Error loading configuration:", error);
        message.error("Error al cargar la configuración.");
      }
    };

    loadConfig();
  }, []);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const handleFinish = async (values: any) => {
    const newConfig: RatingConfig = {
      descriptions: values.descriptions,
      links: values.links,
    };
  
    try {
      const response = await fetch('http://localhost:5000/configuration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfig),
      });
      const result = await response.json();
      if (response.ok) {
        message.success(result.message);
        setConfig(newConfig);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      console.error("Error saving configuration:", error);
      message.error("Error al guardar la configuración.");
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Configuración de Calificación</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ width: "300px" }}>
        <Form.Item
          label="Descripción de Calificación"
          name="descriptions"
          rules={[{ required: true, message: "Por favor ingresa las descripciones." }]}
        >
          <Input.Group>
            {config.descriptions.map((desc, index) => (
              <Input
                key={index}
                placeholder={`Descripción ${index + 1}`}
                value={desc} // Cambiado a value
                style={{ marginBottom: "8px" }}
                onChange={(e) => {
                  const newDescriptions = [...config.descriptions];
                  newDescriptions[index] = e.target.value;
                  setConfig((prev) => ({ ...prev, descriptions: newDescriptions }));
                  form.setFieldsValue({ descriptions: newDescriptions }); // Actualiza el formulario
                }}
              />
            ))}
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="Enlace"
          name="links"
          rules={[{ required: true, message: "Por favor ingresa los enlaces." }]}
        >
          <Input.Group>
            {config.links.map((link, index) => (
              <Input
                key={index}
                placeholder={`Link ${index + 1}`}
                value={link} // Cambiado a value
                style={{ marginBottom: "8px" }}
                onChange={(e) => {
                  const newLinks = [...config.links];
                  newLinks[index] = e.target.value;
                  setConfig((prev) => ({ ...prev, links: newLinks }));
                  form.setFieldsValue({ links: newLinks }); // Actualiza el formulario
                }}
              />
            ))}
          </Input.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin;
