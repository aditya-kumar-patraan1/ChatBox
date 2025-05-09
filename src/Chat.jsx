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
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Chat = ({setisChatOpen}) => {

  const [isLightMode,setisLightMode] = useState(true);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [chats, setChats] = useState([]);
  const [data, setData] = useState("");
  const [myclass, setClass] = useState("child-hidden");
  const [isOpen, setisOpen] = useState(true);
  const [myval, setmyval] = useState("open");
  const [applied, setapplied] = useState("show");
  const [myquery, setmyquery] = useState("");
  const [tempUpdate, setTempUpdate] = useState("");
  const [remainFix, setremainFix] = useState("");

  function click(data) {
    setapplied(data ? "hidden" : "show");
    setClass(data ? "child-show" : "child-hidden");
    setmyval(data ? "close" : "open");
    setisOpen(!data);
  }

  function fixData(e) {
    setData(e.target.value);
  }

  function speakText(mytext) {
    if (!mytext) return;
    const utterance = new SpeechSynthesisUtterance(mytext);
    window.speechSynthesis.speak(utterance);
  }

  async function onSend() {
    if (data.trim() === "") return;
    setData("");

    setChats((prevChats) => [...prevChats, { user: data, bot: null }]);
    let O = await generateContent(data);
    let output = O.replace(/\*/g, "");

    setChats((prevChats) => {
      const updatedChats = [...prevChats];
      updatedChats[updatedChats.length - 1].bot = output;
      return updatedChats;
    });
  }

  function perform(mylastquery) {
    click(isOpen);
    setmyquery(mylastquery);
    setremainFix(mylastquery);
  }

  function perform2(updatedQuery) {
    setData(updatedQuery);
    click(isOpen);
  }

  function ending() {
    click(isOpen);
    setmyquery(remainFix);
    setremainFix("empty");
  }

  function fixData2(e) {
    setTempUpdate(e.target.value);
    setmyquery(e.target.value);
  }

  return (
   <div className={`fixed inset-0 z-50 ${isLightMode ? 'bg-gray-100' : 'bg-gray-900'} flex items-center justify-center`}>
  <div className={`w-full h-full sm:rounded-none overflow-hidden flex flex-col border border-gray-300 ${isLightMode ? 'bg-white' : 'bg-gray-800'}`}>

        {/* Header */}
        <div className=" shadow-md px-4 py-3 flex justify-start items-start">
          <div className=" pl-3 sm:text-2xl font-bold flex items-center gap-2">
            {(isLightMode ? <MdDarkMode className="text-[20px] cursor-pointer text-gray-500 mr-3 hover:text-black transform transition duration-300 hover:scale-110 hover:rotate-45" onClick={()=>setisLightMode(prev=>!prev)}/> : <MdLightMode className="text-[20px] cursor-pointer text-gray-500 mr-3 hover:text-white transform transition duration-300 hover:scale-110 hover:rotate-45"  onClick={()=>setisLightMode(prev=>!prev)}/>)}
            <ShareCircleBold className={`${isLightMode ? 'text-black' : 'text-white'} cursor-pointer`}/>
            <span className={`${isLightMode ? "text-blue-600":"text-white"}`}>ChatBox</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {chats.map((chat, index) => (
              <div key={index} className="space-y-2">
                {/* User Message */}
                <div className={`p-4 ${isLightMode ? 'bg-gray-100 text-black' : 'bg-gray-900  text-white'}  rounded-md flex justify-between items-start`}>
                  <div className="flex gap-3">
                    <img
                      src="https://th.bing.com/th/id/OIP.w-f-qDRUjGt9e_SuPTcfcgHaHw?rs=1&pid=ImgDetMain"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="text-sm font-semibold">{chat.user}</div>
                      <div className="text-xs text-gray-500">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => perform(chat.user)}
                    className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                </div>

                {/* Bot Response */}
                <div className={`p-4 rounded-md flex justify-between items-start ${isLightMode ? 'bg-blue-100 text-black' : 'bg-black text-white'}`}>
                  <div className="flex gap-3">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="text-sm">
                        {chat.bot == null ? (
                          <img
                            className="w-5 h-5"
                            src="https://cdnl.iconscout.com/lottie/premium/thumb/loader-dot-dark-point-animation-6790347-5577789.gif"
                          />
                        ) : (
                          chat.bot
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-blue-500">
                    <button onClick={() => speakText(chat.bot)}>
                      <AiFillSound className="hover:cursor-pointer hover:text-blue-700" />
                    </button>
                    <CopyToClipboard
                      className="hover:cursor-pointer hover:text-blue-700"
                      text={chat.bot}
                      onCopy={() => setCopied(true)}
                    >
                      <button>
                        <FaCopy />
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className={` px-4 py-3 flex gap-2 items-center ${isLightMode ? 'bg-white' : 'bg-gray-800'}`}>
          <input
            type="text"
            value={data}
            onChange={fixData}
            placeholder="Enter your query"
            className={`flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 ${isLightMode ? 'text-black' : ' text-white'}`}
          />
          <button
            onClick={onSend}
            className={`bg-blue-500 cursor-pointer text-white rounded-md px-4 py-2 m-2 my-3 hover:scale-90 transform transition-all ease-in-out ${isLightMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            <IoSend className="text-lg" />
          </button>
        </div>

        {/* Edit Modal */}
        <div
          className={`${
            isOpen ? "hidden" : "fixed"
          } inset-0 bg-transparent bg-opacity-40 flex justify-center backdrop-blur-lg items-center z-50`}
        >
          <div className={`p-6 ${isLightMode ? 'bg-white' : 'bg-gray-900'} rounded-lg shadow-lg w-[90%] max-w-xl`}>
            <h3 className={`text-lg font-semibold mb-3 ${isLightMode ? 'text-black' : 'text-white'}`}>Do you want to edit?</h3>
            <textarea
              rows="6"
              defaultValue={myquery}
              onChange={fixData2}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 ${isLightMode ? 'text-black' : 'text-white'}`}
            ></textarea>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => perform2(tempUpdate)}
                className={`bg-blue-500 hover:bg-blue-600 hover:scale-105 transform transition-all ease-in-out ${isLightMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded-md hover:cursor-pointer`}
              >
                <IoSend />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={ending}
                  className={`px-4 py-2  rounded-md hover:cursor-pointer hover:text-white ${isLightMode ? 'text-black border border-black hover:bg-black' : 'text-white border border-white hover:bg-red-600 hover:border-red-600'}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
