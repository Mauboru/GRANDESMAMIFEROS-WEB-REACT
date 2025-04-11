import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import logo from "/logomarca.png";
import img1 from "/img1.jpg"; // Primeira imagem
import img2 from "/img2.jpg"; // Segunda imagem
import img3 from "/img3.jpg"; // Terceira imagem
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { FloatingLabel, Form, Modal, Button as BsButton } from "react-bootstrap";
import { login } from "../services/auth";

const backgroundImages = [img1, img2, img3];

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [emailCpf, setEmailCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(emailCpf, senha);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("dataUser", JSON.stringify(response.data));
        navigate("/home");
      } else {
        setShowModal(true);
      }
    } catch (error) {
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.LoginPage>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
  {backgroundImages.map((image, idx) => (
    <Styled.FadeBackground
      key={idx}
      image={image}
      visible={idx === imageIndex}
    />
  ))}
</div>
      <div className="container-fluid h-100 position-relative">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <Styled.LeftPanel className="col-md-8 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5">
            {/* A imagem de fundo já é definida por Styled.Background */}
          </Styled.LeftPanel>
          
          {/* Formulário */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <div className="px-3 w-100">
              <Styled.RightPanel className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center text-white">
                <Styled.Logo
                  src={logo}
                  alt="logo"
                  className="d-block mx-auto mb-4"
                  style={{ maxWidth: "195px" }}
                />

                <form className="w-100" style={{ maxWidth: "320px" }} onSubmit={handleLogin}>
                  <Styled.CustomFloating as={FloatingLabel} controlId="emailCpf" label="Email ou CPF" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="CPF"
                      name="emailCpf"
                      value={emailCpf}
                      onChange={(e) => setEmailCpf(e.target.value)}
                      required
                    />
                  </Styled.CustomFloating>

                  <div className="mb-3">
                    <div style={{ position: "relative" }}>
                      <Styled.CustomFloating as={FloatingLabel} controlId="senha" label="Senha" className="mb-3">
                        <Form.Control
                          type={mostrarSenha ? "text" : "password"}
                          placeholder="Senha"
                          name="senha"
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          required
                        />
                      </Styled.CustomFloating>
                      <Styled.ToggleSenha
                        type="button"
                        onClick={() => setMostrarSenha((prev) => !prev)}
                      >
                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                      </Styled.ToggleSenha>
                    </div>
                  </div>

                  <div className="text-center mb-3">
                    <Styled.Link href="#">Esqueci minha senha</Styled.Link>
                  </div>

                  <hr className="my-4 border-light" />

                  <Styled.Button type="submit" disabled={loading || !emailCpf || !senha}>
                    {loading ? <><FaSpinner className="spin me-2" /> Entrando...</> : "Login"}
                  </Styled.Button>

                  <div className="text-center mt-3">
                    <Styled.Link href="/register">Não tem cadastro? Registre-se aqui!</Styled.Link>
                  </div>
                </form>

                {/* Modal de erro */}
                <Styled.CustomModal show={showModal} onHide={() => setShowModal(false)} centered>
                  <Styled.ModalContent>
                    <h5>Erro ao fazer login</h5>
                    <p>Verifique seu e-mail/CPF e senha e tente novamente.</p>
                    <BsButton variant="danger" onClick={() => setShowModal(false)}>
                      Fechar
                    </BsButton>
                  </Styled.ModalContent>
                </Styled.CustomModal>
              </Styled.RightPanel>
            </div>
          </div>
        </div>
      </div>
    </Styled.LoginPage>
  );
}

const Styled = {
  CustomModal: styled(Modal)`
    .modal-content {
      background-color: #1c1c1c;
      color: white;
      border-radius: 12px;
      border: none;
      padding: 1.5rem;
    }
    .modal-header {
      border-bottom: none;
      padding-bottom: 0;
    }
    .modal-footer {
      border-top: none;
      padding-top: 0.5rem;
      justify-content: center;
    }
  `,
  FadeBackground: styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ image, theme }) => `
    linear-gradient(${theme.colors.primaryTransparent1}, ${theme.colors.primaryTransparent2}),
    url(${image}) no-repeat center center
  `};
  background-size: cover;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 1.2s ease-in-out;
  z-index: 0;
`,

  ModalContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h5 {
      font-size: 1.25rem;
      color: #ff4d4d;
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.95rem;
      text-align: center;
      margin: 0;
      color: #ccc;
    }

    button {
      padding: 0.5rem 1.5rem;
      font-weight: bold;
      border-radius: 8px;
    }
  `,

  ToggleSenha: styled.button`
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.placeholder};
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,

  Logo: styled.img`
    max-width: 175px;
    display: block;
    margin: 0 auto 1rem auto;
    transform: rotate(-2deg);
    animation: shake 3s infinite;

    @keyframes shake {
      0%, 100% { transform: rotate(-2deg) translateX(0); }
      50% { transform: rotate(-2deg) translateX(3px); }
    }
  `,

  LoginPage: styled.div`
    min-height: 100vh;
  `,

  Background: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ bgImage }) => `
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
      url(${bgImage}) no-repeat center center
    `};
    background-size: cover;
    z-index: 0;
  `,

  LeftPanel: styled.div`
  `,

  RightPanel: styled.div`
    position: relative;
    z-index: 1;
    background-color: rgb(224, 234, 223);
    border-radius: 12px;
    width: 100%;
    padding: 2rem 1rem;

    @media (min-width: 768px) {
      max-width: 400px;
      padding: 3rem 2rem;
    }
  `,

  CustomFloating: styled.div`
    .form-control {
        background-color: ${({ theme }) => theme.colors.inputBg};
        border: 1px solid ${({ theme }) => theme.colors.inputBorder};
        color: ${({ theme }) => theme.colors.text};
        padding: 0.8rem 0.75rem;
        border-radius: 4px;

        &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: none;
        }
    }

    label {
        color: ${({ theme }) => theme.colors.placeholder};
    }

    .form-control:focus ~ label {
        color: ${({ theme }) => theme.colors.primary};
    }
  `,

  Input: styled.input`
    background-color: ${({ theme }) => theme.colors.inputBg};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.75rem;
    border-radius: 4px;
    width: 100%;
    &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
    }
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,

  Button: styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    width: 100%;
    font-weight: bold;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:disabled {
      background-color: #555;
      cursor: not-allowed;
      opacity: 0.6;
    }
  `,

  Link: styled.a`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.875rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  `,

};
