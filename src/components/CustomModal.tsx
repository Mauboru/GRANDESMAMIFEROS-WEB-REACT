import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import styled from "styled-components";

const icons = {
  success: <FaCheckCircle color="green" size={28} />,
  error: <FaExclamationCircle color="red" size={28} />,
  info: <FaInfoCircle color="blue" size={28} />,
  warning: <FaExclamationTriangle color="orange" size={28} />,
};

const titles = {
  success: "Sucesso",
  error: "Erro",
  info: "Informação",
  warning: "Atenção",
};

const CustomModal = ({ show, onHide, type = "info", message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {icons[type]} <span className="ms-2">{titles[type]}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={onHide}>Fechar</StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;

const StyledButton = styled(Button)`
  background-color: #0d6efd;
  border: none;
  &:hover {
    background-color: #0b5ed7;
  }
`;
