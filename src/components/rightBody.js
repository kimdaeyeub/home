import { useEffect, useState } from "react";
import styled from "styled-components";
import springImage from "../assets/spring3.png";

const Container = styled.div`
  background-color: white;
  width: 95%;
  height: 100%;
  border-radius: 30px;
  position: relative;
  z-index: -1;
  transform: rotate(-8deg);
  box-shadow: 17px 18px 72px -27px rgba(0, 0, 0, 0.58);
  padding: 20px;
  box-sizing: border-box;
  padding-left: 60px;
  padding-bottom: 15%;
`;
const Spring = styled.img`
  position: absolute;
  left: -10%;
  height: 90%;
  top: 5%;
`;
const P = styled.p`
  font-size: 22px;
  line-height: 1.3;
  font-family: "Nanum Pen Script", cursive;
  color: grey;
  font-size: 25px;
`;
const Button = styled.button`
  width: 40px;
  margin-bottom: 5px;
  height: 40px;
  border-radius: 50%;
  font-size: 30px;
  color: #f5f6fa;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #f5f6fa;
`;
const Title = styled.h1`
  font-size: 25px;
  font-family: "Nanum Pen Script", cursive;
  color: grey;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Box = styled.div`
  height: 90%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
`;
function RightBody({ addLetter, letters, onLetterDetail }) {
  return (
    <>
      <Container>
        <Spring src={springImage} />
        {letters[0] ? (
          <>
            <Header>
              <Title>{letters[0].letterTitle}</Title>
              <Button onClick={addLetter}>+</Button>
            </Header>
            <Box>
              <P onClick={onLetterDetail}>{letters[0].letterText}</P>
            </Box>
          </>
        ) : (
          <>
            <Header>
              <Title></Title>
              <Button onClick={addLetter}>+</Button>
            </Header>
          </>
        )}
      </Container>
    </>
  );
}

export default RightBody;
