import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Header = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3%;
`;

const Box = styled.div`
  padding: 5%;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 20px;
  width: 80%;
  margin-bottom: 30px;
`;
const Title = styled.h1`
  font-size: 33px;
  font-family: "Nanum Pen Script", cursive;
`;
const LetterTitle = styled.h1`
  font-size: 28px;
  line-height: 1.3;
  font-family: "Nanum Pen Script", cursive;
  margin-bottom: 5%;
`;

const P = styled.p`
  font-size: 25px;
  line-height: 1.3;
  font-family: "Nanum Pen Script", cursive;
`;
const LetterDetail = ({ letters, loggedInUser }) => {
  const [letterDetail, setLetterDetail] = useState([]);
  const [title, setTitle] = useState("");
  const onInput = (event) => {
    setLetterDetail([]);
    const {
      target: { value },
    } = event;
    let arrLetters = [];
    if (value === "me") {
      for (let i = 0; i < letters.length; i++) {
        if (letters[i].creatorId == loggedInUser.uid) {
          arrLetters.push(letters[i]);
        }
      }
      setLetterDetail(arrLetters);
      setTitle("내가 쓴 쪽지");
    } else if (value === "you") {
      for (let i = 0; i < letters.length; i++) {
        if (letters[i].creatorId !== loggedInUser.uid) {
          arrLetters.push(letters[i]);
        }
      }
      setLetterDetail(arrLetters);
      setTitle("내가 받은 쪽지");
      console.log("You");
    } else {
      setLetterDetail(letters);
      setTitle("모든 쪽지");
    }
  };
  useEffect(() => {
    setTitle("모든 쪽지");
    setLetterDetail(letters);
  }, []);
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <select onInput={onInput}>
          <option value="all">모든 쪽지</option>
          <option value="me">내가 쓴 쪽지</option>
          <option value="you">내가 받은 쪽지</option>
        </select>
      </Header>
      {letterDetail
        ? letterDetail.map((letter) => (
            <Box key={letter.id}>
              <LetterTitle>제목 : {letter.letterTitle}</LetterTitle>
              <P>{letter.letterText}</P>
            </Box>
          ))
        : null}
    </Container>
  );
};

export default LetterDetail;
