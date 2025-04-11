import React, { useState } from "react";
import styled from "styled-components";
import logo from "/logomarca.png";
import bgImage from "/login-bg.jpg";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form } from 'react-bootstrap';
import { registerUser } from "../services/auth";

export default function RegisterUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cpf: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigate = useNavigate();
    const isFormIncomplete = Object.entries(formData)
        .filter(([key]) => key !== "phone" && key !== "email")
        .some(([, value]) => !value.trim());

    const formatPhone = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 11);

        const match = cleaned.match(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})$/);
        if (!match) return cleaned;

        const [, ddd, first, middle, last] = match;
        let formatted = '';
        if (ddd) formatted += `(${ddd}`;
        if (ddd && ddd.length === 2) formatted += ') ';
        if (first) formatted += first;
        if (middle) formatted += ' ' + middle;
        if (last) formatted += '-' + last;

        return formatted.trim();
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setFormData({ ...formData, phone: formatted });
    };

    const formatCpf = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 11);
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

        if (!match) return cleaned;
        const [, part1, part2, part3, part4] = match;

        let formatted = '';
        if (part1) formatted += part1;
        if (part2) formatted += '.' + part2;
        if (part3) formatted += '.' + part3;
        if (part4) formatted += '-' + part4;

        return formatted;
    };

    const handleCpfChange = (e) => {
        const formatted = formatCpf(e.target.value);
        setFormData({ ...formData, cpf: formatted });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        if (!formData.email.trim() && !formData.phone.trim()) {
            setErrors({ general: "Informe pelo menos um email ou telefone." });
            setLoading(false);
            return;
        }

        if (formData.phone.replace(/\D/g, '').length !== 11 && formData.phone.replace(/\D/g, '').length > 0) {
            setErrors({ phone: "O telefone deve ter 11 dígitos (DDD + número)." });
            setLoading(false);
            return;
        }

        if (formData.cpf.replace(/\D/g, '').length !== 11 && formData.cpf.replace(/\D/g, '').length > 0) {
            setErrors({ cpf: "O cpf deve ter 11 dígitos." });
            setLoading(false);
            return;
        }

        try {
            console.log(formData);
            const response = await registerUser(formData);

            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "Erro ao criar conta. Tente novamente." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Styled.RegisterPage>
            <div className="container-fluid h-100">
                <div className="row min-vh-100">
                    <Styled.ContentPanel className="col-12 d-flex flex-column justify-content-center align-items-center text-white p-5">
                        <Styled.FormContainer>
                            <Styled.LogoContainer>
                                <Styled.Logo src={logo} alt="RUN SPRINT LIVE" />
                                <Styled.LogoText>Faça seu Registro!</Styled.LogoText>
                            </Styled.LogoContainer>
                            <form className="w-100" style={{ maxWidth: "320px" }} onSubmit={handleSubmit}>
                                <Styled.CustomFloating as={FloatingLabel} controlId="name" label="Nome" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.name && <Styled.ErrorMsg>{errors.name}</Styled.ErrorMsg>}
                                </Styled.CustomFloating>

                                <Styled.CustomFloating as={FloatingLabel} controlId="email" label="Email" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="E-mail"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    />
                                    {errors.email && <Styled.ErrorMsg>{errors.email}</Styled.ErrorMsg>}
                                </Styled.CustomFloating>

                                <Styled.CustomFloating as={FloatingLabel} controlId="phone" label="Telefone" className="mb-3">
                                    <Form.Control
                                        type="tel"
                                        placeholder="Telefone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                    />
                                    {errors.phone && <Styled.ErrorMsg>{errors.phone}</Styled.ErrorMsg>}
                                </Styled.CustomFloating>

                                <Styled.CustomFloating as={FloatingLabel} controlId="cpf" label="CPF" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="CPF"
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleCpfChange}
                                        required
                                    />
                                    {errors.cpf && <Styled.ErrorMsg>{errors.cpf}</Styled.ErrorMsg>}
                                </Styled.CustomFloating>

                                <Styled.InputWrapper className="mb-3">
                                    <Styled.CustomFloating as={FloatingLabel} controlId="password" label="Senha" className="mb-3">
                                        <Form.Control
                                            type={mostrarSenha ? "text" : "password"}
                                            placeholder="Senha"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                                            title="A senha deve ter no mínimo 8 caracteres, incluindo letra, número e caractere especial."
                                        />
                                        {errors.password && <Styled.ErrorMsg>{errors.password}</Styled.ErrorMsg>}
                                    </Styled.CustomFloating>
                                    <Styled.ToggleSenha
                                        type="button"
                                        onClick={() => setMostrarSenha((prev) => !prev)}
                                    >
                                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                                    </Styled.ToggleSenha>
                                </Styled.InputWrapper>

                                <Styled.Button type="submit" disabled={loading || isFormIncomplete}>
                                    {loading ? <><FaSpinner className="spin me-2" /> Criando...</> : "Criar Conta"}
                                </Styled.Button>

                                {errors.general && (<Styled.ErrorMsg className="text-center mt-2">{errors.general}</Styled.ErrorMsg>)}

                                <div className="text-center mt-3">
                                    <Styled.Link href="/">Já tenho uma conta</Styled.Link>
                                </div>
                            </form>
                        </Styled.FormContainer>
                    </Styled.ContentPanel>
                </div>
            </div>
        </Styled.RegisterPage>
    );
}

const Styled = {
    FormContainer: styled.div`
        background-color: #000;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 0 15px rgba(0,0,0,0.5);
        width: 100%;
        max-width: 380px;
    `,

    RegisterPage: styled.div`
        min-height: 100vh;
    `,

    ContentPanel: styled.div`
        background: ${({ theme }) => `
            linear-gradient(${theme.colors.primaryTransparent1}, ${theme.colors.primaryTransparent2}),
            url(${bgImage}) no-repeat center center
        `};
        background-size: cover;
        background-blend-mode: darken;
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

    InputWrapper: styled.div`
        position: relative;
    `,

    LogoContainer: styled.div`
    display: flex;
    align-items: center; /* Alinha verticalmente */
    justify-content: center; /* Opcional: centraliza o conjunto (logo + texto) horizontalmente */
    gap: 0.75rem;
    margin-bottom: 1rem;
    `,

    Logo: styled.img`
        max-height: 50px; /* altura controlada para facilitar o alinhamento */
    `,

    LogoText: styled.h2`
        font-size: 1.5rem;
        color: white;
        font-weight: bold;
        line-height: 1; /* ajuda a alinhar com a logo */
        margin: 0;
        display: flex;
        align-items: center; /* se quiser alinhar texto com múltiplas linhas */
    `,

    CustomFloating: styled.div`
        .form-control {
            background-color: ${({ theme }) => theme.colors.inputBg};
            border: 1px solid ${({ theme }) => theme.colors.inputBorder};
            color: ${({ theme }) => theme.colors.text};
            padding: 0.5rem 0.6rem;
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

    Button: styled.button`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text};
        border: none;
        padding: 0.5rem;
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
        font-size: 0.85rem;
        text-decoration: none;

        &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.primaryDark};
        }
    `,

    ErrorMsg: styled.span`
        display: block;
        color: #ff4d4d;
        font-size: 0.75rem;
        margin-top: 0.25rem;
    `,
};
