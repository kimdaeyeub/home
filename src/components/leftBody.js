import styled from "styled-components";

const Container = styled.div`
  top: 0;
  background-color: white;
  width: 70%;
  margin-top: 10%;
  height: 80%;
  border-radius: 30px;
  transform: rotate(-8deg);
  box-shadow: 4px 4px 25px -20px rgba(23, 22, 23, 0.88);
  margin-left: 14%;
  z-index: -1;
`;
const Box = styled.div`
  background-color: white;
  transform: rotate(-8deg);
  width: 100%;
  height: 100%;
  border-radius: 30px;
  box-shadow: 4px 4px 30px -11px rgba(23, 22, 23, 0.88);
`;
const ImageBox = styled.div`
  background-color: white;
  transform: rotate(12deg);
  width: 100%;
  height: 100%;
  border-radius: 30px;
  box-shadow: 4px 4px 30px -11px rgba(23, 22, 23, 0.88);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const FakeImage = styled.img`
  width: 100%;
  height: 80%;
  background-color: #34495e;
  margin-bottom: 10px;
  border-radius: 20px;
`;
const Image = styled.img`
  width: 100%;
  height: 80%;
  border: 2px solid black;
  border-radius: 30px;
  margin-bottom: 10px;
`;
const TextBox = styled.div`
  display: flex;
  margin:20px;
  flex-direction: column;
  height:20%
  justify-content: space-between;
  align-items: end;
  box-sizing:border-box;
  gap:20px;
  font-family: 'Nanum Pen Script', cursive;
  font-size:30px;
`;
function LeftBody({ letters }) {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    <Container>
      <Box>
        <ImageBox>
          {letters ? <Image src={letters.attachmentUrl} /> : <FakeImage />}
          <TextBox>
            <span>{`${year}. ${month}. ${day}`}</span>
            {letters ? <span>{letters.imgTitle}</span> : <span>사랑해</span>}
          </TextBox>
        </ImageBox>
      </Box>
    </Container>
  );
}

export default LeftBody;
