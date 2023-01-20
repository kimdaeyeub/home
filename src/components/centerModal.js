import React from "react";
import styled from "styled-components";

const Div = styled.div`
  height: 100%;
  overflow-y: scroll;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  aling-items: center;
`;
const Input = styled.input`
  padding: 10px;
  width: ${(prop) => (prop.Width ? "30%" : "20%")};
  border: 2px solid black;
  border-radius: 10px;
  padding-left: 15px;
  margin-left: 20px;
`;
const TextArea = styled.textarea`
  border: 2px solid black;
  border-radius: 20px;
  padding: 20px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  aling-items: start;
  gap: 10px;
  margin-bottom: 10px;
`;
const Left = styled.div`
  display: flex;
  justify-content: end;
`;
const Button = styled.button`
  padding: 10px;
  border: 2px solid black;
  width: 20%;
  border-radius: 10px;
  padding-left: 15px;
`;
const FakeImg = styled.div`
  width: 300px;
  height: 280px;
  border: 2px solid black;
  border-radius: 20px;
`;
const Img = styled.img`
  width: 40%;
  height: 30%;
  border: 2px solid black;
  border-radius: 20px;
`;
const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
`;
const Column = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
`;
const InputTitle = styled.input`
  width: 60%;
  margin-bottom: 15px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
  padding-left: 15px;
  margin-left: 20px;
`;
const CenterModal = ({
  sendLetter,
  letterTitle,
  letterText,
  onChangeTextArea,
  changeLetterTitle,
  attachment,
  onFileChange,
  onClearAttachment,
  imgTitle,
  onChangeImgTitle,
}) => {
  return (
    <Div>
      <Form onSubmit={sendLetter}>
        <Right>
          <Row>
            {attachment ? <Img src={attachment} /> : <FakeImg />}
            <Column>
              <InputTitle
                value={imgTitle}
                onChange={onChangeImgTitle}
                placeholder="사진 이름"
                type="text"
              />

              <InputTitle
                value={letterTitle}
                onChange={changeLetterTitle}
                placeholder="쪽지 제목"
                type="text"
              />
            </Column>
          </Row>
          <TextArea
            onChange={onChangeTextArea}
            value={letterText}
            placeholder="쪽지"
            rows="10"
            cols="30"
          ></TextArea>
        </Right>
        <Left>
          {attachment ? (
            <Button onClick={onClearAttachment}>사진 지우기</Button>
          ) : (
            <Input type="file" accept="image/*" onChange={onFileChange} />
          )}
          <Input value="저장" type="submit" Width={false} />
        </Left>
      </Form>
    </Div>
  );
};

export default CenterModal;
