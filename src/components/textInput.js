import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  z-index: 1;
  width: 25%;
  height: 200px;
  background-color: #ffeaa7;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  padding: 20px;
  justify-content: center;
  position: absolute;
  top: 70px;
  right: 0;
  margin: 10px;
`;

const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
`;
const Box = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 10px;
`;
const Input = styled.input`
  padding: 10px;
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  z-index: 100;
  width: ${(prop) => (prop.Width ? "100%" : "30%")};
  outline: none;
`;
function TextInput({ title, url, onSubmit, onChangeUrl, onChangeTitle }) {
  return (
    <>
      <Container
        transition={{ type: "spring" }}
        initial={{ x: 190 }}
        animate={{ x: 0 }}
      >
        <InputBox onSubmit={onSubmit}>
          <Input
            name="url"
            onChange={onChangeUrl}
            value={url}
            Width={true}
            type="text"
            placeholder="URL"
          />
          <Input
            name="title"
            onChange={onChangeTitle}
            value={title}
            Width={true}
            type="text"
            placeholder="제목"
          />
          <Box>
            <Input Width={false} type="submit" value="Save" />
          </Box>
        </InputBox>
        <motion.div></motion.div>
      </Container>
    </>
  );
}

export default TextInput;
