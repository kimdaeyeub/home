import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Foot from "./components/foot";
import LeftBody from "./components/leftBody";
import NavBar from "./components/navBar";
import RightBody from "./components/rightBody";
import SideModal from "./components/sideModal";
import TextInput from "./components/textInput";
import { dbService, storageService } from "./fbase";
import {
  addDoc,
  collection,
  query,
  getDocs,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import CenterModal from "./components/centerModal";
import LetterDetail from "./components/letterDetail";
import { v4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";

const Home = styled.div`
  width: ${(prop) => prop.screenWidth};
  height: ${(prop) => prop.screenHeight};
  background-color: ${(prop) => (prop.mode ? "#34495e" : "#e1ae68")};
  overflow: hidden;
`;
const Body = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  box-sizing: border-box;
  font-family: "Nanum Pen Script", cursive;
`;
const Header = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: "Nanum Pen Script", cursive;
`;
const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: end;
  align-items: end;
  box-sizing: border-box;
  font-family: "Nanum Pen Script", cursive;
`;
const RightBodyBox = styled.div`
  height: 100%;
  width: 35%;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  padding: 40px 40px 40px 0;
  z-index: 1;
`;
const LeftBodyBox = styled.div`
  height: 100%;
  width: 65%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  z-index: 0;
`;
const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
`;
const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
`;
const ModalContent = styled(motion.div)`
  position: fixed;
  top: 0px;
  background-color: white;
  width: 400px;
  height: 100%;
`;

const ModalCenter = styled(motion.div)`
  width: 70%;
  height: ${(prop) => (prop.Height || prop.letterMode ? "90%" : "70%")};
  background-color: white;
  position: fixed;
  top: ${(prop) => (prop.Top || prop.letterMode ? "5%" : "10%")};
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 30px;
  padding: 5%;
  box-sizing: border-box;
`;
function HomePage({ loggedInUser }) {
  const { register, handleSubmit, setValue } = useForm();
  const [toggleModal, setToggleModal] = useState(false);
  const [inputControl, setInputControl] = useState(false);
  const [siteList, setSiteList] = useState([]);
  const [modalType, setModalType] = useState();
  const [mode, setMode] = useState(false);
  const [screenHeight, setScreenHeight] = useState("");
  const [screenWidth, setScreenWidth] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [letterTitle, setLetterTitle] = useState("");
  const [letterText, setLetterText] = useState("");
  const [letters, setLetters] = useState([]);
  const [letterMode, setLetterMode] = useState(false);
  const [attachment, setAttachment] = useState();
  const [imgTitle, setImgTitle] = useState("");

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  const onClick = () => {
    setInputControl((value) => !value);
    setValue("url", "");
    setValue("title", "");
  };
  useEffect(() => {
    const q = query(collection(dbService, "site"), orderBy("createdAt", "asc"));
    onSnapshot(q, (snapshot) => {
      const siteArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      let siteData = [];
      for (let i = 0; i < siteArr.length; i++) {
        if (siteArr[i].creatorId == loggedInUser.uid) {
          siteData.push(siteArr[i]);
        }
      }
      setSiteList(siteData);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(dbService, "letter"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const letterArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      /*for (let i = 0; i < letterArr.length; i++) {
        if (letterArr[i].creatorId == loggedInUser.uid) {
          letterData.push(letterArr[i]);
        }
      }*/
      setLetters(letterArr);
    });
  }, []);

  const sendLetter = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${loggedInUser.uid}/${v4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }

    //트윗 오브젝트
    const letterObj = {
      letterTitle,
      letterText,
      imgTitle,
      createdAt: Date.now(),
      creatorId: loggedInUser.uid,
      attachmentUrl,
    };

    //트윗하기 누르면 nweetObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
    await addDoc(collection(dbService, "letter"), letterObj);

    //state 비워서 form 비우기
    //파일 미리보기 img src 비워주기
    setAttachment("");
    /*try {
      const docRef = await addDoc(collection(dbService, "letter"), {
        letterTitle,
        letterText,
        createdAt: Date.now(),
        creatorId: loggedInUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }*/
    setLetterText("");
    setLetterTitle("");
    setToggleModal((value) => !value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "site"), {
        title,
        url,
        createdAt: Date.now(),
        creatorId: loggedInUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setUrl("");
    setTitle("");
    setInputControl((value) => !value);
  };

  const onChangeUrl = (event) => {
    const {
      target: { value },
    } = event;
    setUrl(value);
  };
  const onChangeTitle = (event) => {
    const {
      target: { value },
    } = event;

    setTitle(value);
  };
  const openModal = () => {
    setModalType(1);
    setToggleModal((value) => !value);
  };
  const addLetter = () => {
    setModalType(2);
    setToggleModal((value) => !value);
    setLetterMode(false);
  };
  const onLetterDetail = () => {
    setModalType(2);
    setToggleModal((value) => !value);
    setLetterMode(true);
  };
  const onLightMode = () => {
    setMode(false);
  };
  const onDarkMode = () => {
    setMode(true);
  };
  const changeLetterTitle = (event) => {
    const {
      target: { value },
    } = event;

    setLetterTitle(value);
  };
  const onChangeImgTitle = (event) => {
    const {
      target: { value },
    } = event;
    setImgTitle(value);
  };
  const onChangeTextArea = (event) => {
    const {
      target: { value },
    } = event;
    setLetterText(value);
  };
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
    <Home mode={mode} screenWidth={screenWidth} screenHeight={screenHeight}>
      {toggleModal ? (
        <Modal>
          <ModalOverlay onClick={openModal}></ModalOverlay>
          {modalType == 1 ? (
            <ModalContent
              transition={{ type: "tween" }}
              initial={{ x: -200 }}
              animate={{ x: 0 }}
            >
              <SideModal />
            </ModalContent>
          ) : (
            <ModalCenter
              transition={{ type: "tween" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1, left: "15%" }}
              Height={false}
              Top={false}
              letterMode={letterMode}
            >
              {letterMode ? (
                <LetterDetail letters={letters} loggedInUser={loggedInUser} />
              ) : (
                <CenterModal
                  changeLetterTitle={changeLetterTitle}
                  onChangeTextArea={onChangeTextArea}
                  sendLetter={sendLetter}
                  letterTitle={letterTitle}
                  letterText={letterText}
                  imgTitle={imgTitle}
                  attachment={attachment}
                  onFileChange={onFileChange}
                  onClearAttachment={onClearAttachment}
                  onChangeImgTitle={onChangeImgTitle}
                />
              )}
            </ModalCenter>
          )}
        </Modal>
      ) : null}
      <Header>
        <NavBar
          mode={mode}
          openModal={openModal}
          onClick={onClick}
          siteList={siteList}
          inputControl={inputControl}
        />
      </Header>
      <Body>
        <LeftBodyBox>
          <LeftBody letters={letters[0]} />
        </LeftBodyBox>
        <RightBodyBox>
          {inputControl ? (
            <TextInput
              onSubmit={onSubmit}
              title={title}
              url={url}
              onChangeTitle={onChangeTitle}
              onChangeUrl={onChangeUrl}
            />
          ) : null}
          <RightBody
            addLetter={addLetter}
            letters={letters}
            onLetterDetail={onLetterDetail}
          />
        </RightBodyBox>
      </Body>
      <Footer>
        <Foot
          mode={mode}
          onLightMode={onLightMode}
          onDarkMode={onDarkMode}
        ></Foot>
      </Footer>
    </Home>
  );
}

export default HomePage;
