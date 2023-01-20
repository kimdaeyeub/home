import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 20px;
`;

const Line = styled.div`
  height: 10px;
  border-radius: 20px;
  border: 2px solid white;
  background-color: white;
  width: 60px;
  display: flex;
  justify-content: ${(prop) => (prop.mode ? "end" : "start")};
  align-items: center;
`;
const ModeBtn = styled(motion.button)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(prop) => (prop.mode ? "#808080" : "white")};
  border: none;
`;

const Icon = styled.span``;
function Foot({ onLightMode, onDarkMode, mode }) {
  return (
    <Container>
      {mode ? (
        <Line mode={mode}>
          <ModeBtn mode={mode} onClick={onLightMode} layoutId="circle">
            <Icon>🌙</Icon>
          </ModeBtn>
        </Line>
      ) : (
        <Line mode={mode}>
          <ModeBtn mode={mode} onClick={onDarkMode} layoutId="circle">
            <Icon>☀️</Icon>
          </ModeBtn>
        </Line>
      )}
    </Container>
  );
}

export default Foot;
