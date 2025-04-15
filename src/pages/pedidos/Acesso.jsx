import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import { Button, Card } from "react-bootstrap";

const mockRequests = [
    {
        id: 1,
        name: "João Silva",
        email: "joao@email.com",
        phone: "(11) 91234-5678",
        cpf: "123.456.789-00",
        status: "pendente",
    },
    {
        id: 2,
        name: "Maria Oliveira",
        email: "maria@email.com",
        phone: "(21) 99876-5432",
        cpf: "987.654.321-00",
        status: "pendente",
    },
    {
        id: 3,
        name: "Carlos Souza",
        email: "carlos@email.com",
        phone: "(31) 91111-2222",
        cpf: "111.222.333-44",
        status: "pendente",
    },
];

export default function Acesso() {
    const [requests, setRequests] = useState(mockRequests);

    const handleAprovar = (id) => {
        setRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: "liberado" } : req
            )
        );
    };

    const handleCancelar = (id) => {
        setRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: "cancelado" } : req
            )
        );
    };

    return (
        <MainLayout>
            <h2 className="mb-4">Solicitações de Acesso</h2>
            <Styled.Container>
                {requests.map((user) => (
                    <Styled.StyledCard key={user.id} border="dark">
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {user.email}<br />
                                <strong>Telefone:</strong> {user.phone}<br />
                                <strong>CPF:</strong> {user.cpf}<br />
                                <strong>Status:</strong>{" "}
                                <Styled.Status status={user.status}>
                                    {user.status}
                                </Styled.Status>
                            </Card.Text>

                            {user.status === "pendente" && (
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="success"
                                        onClick={() => handleAprovar(user.id)}
                                    >
                                        Liberar Acesso
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleCancelar(user.id)}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            )}
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

    StyledCard: styled(Card)`
        background-color: #1c1c1c;
        color: #fff;
        border-radius: 12px;
        border: 1px solid #444;
        padding: 1rem;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    `,

    Status: styled.span`
        color: ${({ status }) =>
            status === "liberado" ? "#4caf50" :
                status === "cancelado" ? "#f44336" : "#ffc107"};
        font-weight: bold;
        text-transform: capitalize;
    `,
};
