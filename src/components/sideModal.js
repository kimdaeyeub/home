import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const Header = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 30px 30px;
  background-color: #dfe6e9;
  margin-bottom: 5px;
  background: rgb(255, 242, 218);
  background: linear-gradient(
    0deg,
    rgba(255, 242, 218, 1) 0%,
    rgba(249, 249, 249, 1) 100%
  );
`;
const Box = styled.div`
  height: 25%;
  width: 100%;
  border-bottom: 2px solid rgb(226, 226, 226);
`;
function SideModal() {
  return (
    <Container>
      <Header></Header>
      <Box></Box>
      <Box></Box>
      <Box></Box>
    </Container>
  );
}

export default SideModal;
