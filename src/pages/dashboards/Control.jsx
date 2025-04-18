import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

export default function Control() {
  const [loading, setLoading] = useState(true);
  const [iframeSrc, setIframeSrc] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');
    
    const iframeSrc = `http://localhost:3003/auth/dash-url?token=${token}`;
    setIframeSrc(iframeSrc);
    setLoading(false);
  }, [navigate]);

  if (loading || !iframeSrc) return <div>Carregando...</div>; 

  return (
    <MainLayout>
      <IframeContainer>
        <iframe
          src={'https://app.powerbi.com/view?r=eyJrIjoiMTIzNjA0ZDAtZjQ1MC00NmQ4LTk5ZWYtN2Q2Y2ZjOTRhYmJkIiwidCI6IjBlMzkyZmY3LTU5ZjktNGE0OS04NTZmLTdkM2I4YWM4YTUxYSJ9'}
          title="Dashboard"
          frameBorder="0"
          allowFullScreen
        />
      </IframeContainer>
    </MainLayout>
  );
}

const IframeContainer = styled.div`
  width: 100%;
  height: 100vh;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
