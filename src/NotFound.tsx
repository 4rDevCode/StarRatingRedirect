// NotFound.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // Redirigir al inicio
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", textAlign: "center", padding: "20px" }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Title level={2}>404 - Página No Encontrada</Title>
        <Paragraph>Lo sentimos, la dirección que buscas no existe.</Paragraph>
        <Button type="primary" onClick={handleBack} size="large" style={{ marginTop: "20px" }}>
          Volver al Inicio
        </Button>
      </Col>
    </Row>
  );
};

export default NotFound;
