import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import { Button, Card } from "react-bootstrap";
import { getUsers, setUserActive, setUserInactive } from "../../services/profile";
import { FaEdit } from "react-icons/fa";

export default function Acess() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingStatus, setEditingStatus] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [loadingId, setLoadingId] = useState(null);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await getUsers();
            setRequests(response.data.users || []);
        } catch (error) {
            console.error("Erro ao buscar solicitações:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleEditStatus = (id, currentStatus) => {
        if (editingId === id) {
            setEditingId(null);
        } else {
            setEditingStatus(currentStatus);
            setEditingId(id);
        }
    };

    const handleSaveStatus = async (id, newStatus) => {
        setLoadingId(id);
        try {
            if (newStatus === 'active') {
                await setUserActive(id);
            } else if (newStatus === 'inactive') {
                await setUserInactive(id);
            }
            fetchRequests();
            setEditingId(null);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <MainLayout>
            <h2 className="mb-4">Solicitações de Acesso</h2>
            <Styled.Container>
                {requests.length === 0 && !loading && <p>Nenhuma solicitação pendente.</p>}
                {requests.map((user) => (
                    <Styled.StyledCard key={user.id} border="dark">
                        {loadingId === user.id && (
                            <>
                                <Styled.Overlay />
                                <Styled.Spinner />
                            </>
                        )}
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {user.email}<br />
                                <strong>CPF:</strong> {user.cpf}<br />
                                <strong>Status:</strong>{" "}
                                <Styled.Status status={user.status}>
                                    {user.status}
                                </Styled.Status>
                            </Card.Text>

                            {/* Adiciona o botão de editar */}
                            <div className="d-flex justify-content-end mt-2">
                                {/* Mostrar botões de editar status se o card for o selecionado para edição */}
                                <div className="d-flex gap-4">
                                    {editingId === user.id && (
                                        <>
                                            <Button
                                                variant="success"
                                                onClick={() => handleSaveStatus(user.id, 'active')}
                                                className="mt-3"
                                            >
                                                Ativar
                                            </Button>

                                            <Button
                                                variant="danger"
                                                onClick={() => handleSaveStatus(user.id, 'inactive')}
                                                className="mt-3"
                                            >
                                                Desativar
                                            </Button>
                                        </>
                                    )}

                                    {/* Botão de editar */}
                                    <div className="mt-3">
                                        <Button
                                            variant="info"
                                            onClick={() => handleEditStatus(user.id, user.status)}
                                        >
                                            <FaEdit />
                                        </Button>
                                    </div>
                                </div>
                            </div>


                        </Card.Body>
                    </Styled.StyledCard>
                ))}
            </Styled.Container>
        </MainLayout>
    );
}

const Styled = {
    Container: styled.div`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
    `,
    
    Status: styled.span`
        color: ${({ status }) =>
            status === "active" ? "#4caf50" :
                status === "inactive" ? "#f44336" :
                    status === "pending" ? "#ffc107" : "#fff"};
        font-weight: bold;
        text-transform: capitalize;
    `,

    Overlay: styled.div`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 2;
        border-radius: 12px;
    `,

    Spinner: styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 4px solid rgba(255, 255, 255, 0.2);
        border-top: 4px solid #fff;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        animation: spin 1s linear infinite;
        z-index: 3;

        @keyframes spin {
            to {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
    `,

    StyledCard: styled(Card)`
        position: relative;
        background-color: #1c1c1c;
        color: #fff;
        border-radius: 12px;
        border: 1px solid #444;
        padding: 1rem;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    `,
};
