import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import heartImage from "../assets/hearts.png";

const LogoBox = styled.button`
  display: flex;
  align-items: center;
  width: 200px;
  height: 100%;
  margin-left: 20px;
  margin-top: 10px;
  background-color: transparent;
  display: flex;
  border: ${(prop) => (prop.mode ? "3px solid white" : "none")};
  justify-content: space-evenly;
  border-radius: 25px;
`;
const Logo = styled.h1`
  font-size: 40px;
  color: ${(prop) => (prop.mode ? "white" : "black")};
  font-family: "Nanum Pen Script", cursive;
`;
const ItemLine = styled.div`
  width: 80%;
  height: 60%;
  margin: 10px;
  margin-top: 10px;
  border-bottom: 4px solid white;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;
  padding-bottom: 0;
  margin-right: 10px;
`;

const Button = styled(motion.button)`
  width: 40px;
  margin-bottom: 5px;
  height: 40px;
  border-radius: 50%;
  font-size: 30px;
  color: white;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #f5f6fa;
`;

const ItemBox = styled.div`
  width: 100px;
  min-width: 150px;
  height: 100%;
  border: 2px solid white;
  margin-right: 10px;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  background-color: white;
`;

const Item = styled.a`
  outline: none;
  text-decoration: none;
  color: black;
  font-family: "Nanum Pen Script", cursive;
  font-size: 30px;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
`;
function NavBar({ mode, onClick, siteList, openModal }) {
  const [rotate, setRotate] = useState(0);
  const toggleBtn = () => {
    setRotate(rotate == 0 ? 135 : 0);
  };
  return (
    <>
      <LogoBox onClick={openModal} mode={mode}>
        <Logo mode={mode}>대엽</Logo>
        <Img src={heartImage} />
        <Logo mode={mode}>단비</Logo>
      </LogoBox>
      <ItemLine>
        {siteList.map((data) => (
          <ItemBox key={data.id}>
            <Item href={data.url}>{data.title}</Item>
          </ItemBox>
        ))}
        <Button
          onTap={toggleBtn}
          transition={{ type: "spring" }}
          animate={{ rotateZ: rotate }}
          onClick={onClick}
        >
          +
        </Button>
      </ItemLine>
    </>
  );
}

export default NavBar;
