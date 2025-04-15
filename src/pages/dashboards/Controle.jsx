import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";

export default function Controle() {
    return (
        <MainLayout>
            <IframeContainer>
                <iframe
                    src="https://app.powerbi.com/view?r=eyJrIjoiMTIzNjA0ZDAtZjQ1MC00NmQ4LTk5ZWYtN2Q2Y2ZjOTRhYmJkIiwidCI6IjBlMzkyZmY3LTU5ZjktNGE0OS04NTZmLTdkM2I4YWM4YTUxYSJ9&navContentPaneEnabled=false&filterPaneEnabled=false&pageNavigationEnabled=false"
                    title="Dashboard"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </IframeContainer>
        </MainLayout>
    );
}

const IframeContainer = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;

    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
`;
