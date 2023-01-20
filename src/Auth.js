import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Screen = styled.div`
  width: ${(prop) => prop.screenWidth};
  height: ${(prop) => prop.screenHeight};
  background-color: #e1ae68;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 40%;
  height: 70%;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
  box-sizing: border-box;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const Input = styled.input`
  padding: 5%;
  width: ${(prop) => (prop.Width ? "90%" : "50%")};
  border-radius: 10px;
  margin-bottom: 5%;
`;

const Auth = ({ onSubmit, register, handleSubmit }) => {
  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  const handleResize = () => {
    setScreenHeight(`${window.innerHeight.toString()}px`);
    setScreenWidth(`${window.innerWidth.toString()}px`);
  };
  useEffect(() => {
    setScreenHeight(`${window.innerHeight.toString()}px`);
    setScreenWidth(`${window.innerWidth.toString()}px`);
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Screen screenWidth={screenWidth} screenHeight={screenHeight}>
        <Box>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("email")} Width={true} placeholder="Email" />
            <Input
              {...register("password")}
              Width={true}
              type="password"
              placeholder="Password"
            />
            <Input Width={false} type="submit" value="LogIn" />
          </Form>
        </Box>
      </Screen>
    </>
  );
};

export default Auth;
