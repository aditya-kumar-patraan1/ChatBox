import { useState } from "react";
import "./App.css";
import { IoSend } from "react-icons/io5";
import generateContent from "./gemini";
import { AiFillSound } from "react-icons/ai";
import { FaCopy, FaEdit } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { VscRobot } from "react-icons/vsc";
import ShareCircleBold from "./assets/ShareCircleBold";
import { ImCross } from "react-icons/im";
import Chat from "./Chat";
import Bubble from "./Bubble";

function App() {

  return (
    <>
      <Chat />
    </>
  );
}

export default App;
