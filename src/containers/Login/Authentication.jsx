import styled from "styled-components";
import AccountBox from "./index";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Authentication = () => {
  return (
    <AppContainer>
      <AccountBox />
    </AppContainer>
  );
};

export default Authentication;
