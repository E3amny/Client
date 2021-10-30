import React, { useState } from "react";
import { BsFillChatRightTextFill } from "react-icons/bs";
import Chat from "./chat";
// import { Link } from "react-router-dom";

function Home({ socket }) {
  let username = localStorage.getItem('customerName')
  let roomname = localStorage.getItem("CurrentUserId");
  const [show, setShow] = useState();
  const sendData = () => {
    if (username && roomname) {
      socket.emit("joinRoom", { username, roomname });
      setShow(!show);
    } else {
      alert("username and roomname are must !");
     
    }
  };

  return (
    <>
      <BsFillChatRightTextFill onClick={sendData} className="chat-icon" />
      {show && (
        <Chat
          username={username}
          roomname={roomname}
          socket={socket}
          onBlur={() => {
            setTimeout(() => {
              setShow(!show);
            }, 100);
          }}
        ></Chat>
      )}
    </>
  );
}

export default Home;
