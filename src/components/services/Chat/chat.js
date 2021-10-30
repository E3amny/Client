// 7ushki.com
import { to_Decrypt, to_Encrypt } from "../../../aes";
import { process } from "../../../reducers/chat/chatReducer";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import './chat.css';

function Chat({ username, roomname, socket }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory()
  let firstName = localStorage.getItem('customerName')
  
  if(socket.connected===false){
      username=''
      roomname=''
    history.push('/')
}

  const dispatch = useDispatch();
  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on("message", (data) => {
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket]);
  const sendData = () => {
    if (text !== "") {
      //encrypt the message here
      const ans = to_Encrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat">
      <div className="user-name">
        <h3>
          Welcome {firstName}
        </h3>
      </div>
      <div className="chat-message">
        {messages.map((elm) => {
          if (elm.username === username) {
            return (
              <div className='message'>
                <p>{elm.text}</p>
                <span>{elm.username}</span>
              </div>
            );
          } else {
            return (
              <div className='message mess-right'>
                <p>{elm.text}</p>
                <span>{elm.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef}></div>
      </div>
      <div className='send'>
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
/*
<div id="live-chat">
		
		<header class="clearfix">
			
			<a href="#" class="chat-close">x</a>

			<h4>Mehmet Mert</h4>

			<span class="chat-message-counter">3</span>

		</header>

		<div class="chat">
			
			<div class="chat-history">
				
				<div class="chat-message clearfix">
					
					<img src="http://lorempixum.com/32/32/people" alt="" width="32" height="32">

					<div class="chat-message-content clearfix">
						
						<span class="chat-time">13:35</span>

						<h5>John Doe</h5>

						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, explicabo quasi ratione odio dolorum harum.</p>

					</div> <!-- end chat-message-content -->

				</div> <!-- end chat-message -->

				<hr>

				<div class="chat-message clearfix">
					
					<img src="http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f320?s=32" alt="" width="32" height="32">

					<div class="chat-message-content clearfix">
						
						<span class="chat-time">13:37</span>

						<h5>Marco Biedermann</h5>

						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

					</div> <!-- end chat-message-content -->

				</div> <!-- end chat-message -->

				<hr>

				<div class="chat-message clearfix">
					
					<img src="http://lorempixum.com/32/32/people" alt="" width="32" height="32">

					<div class="chat-message-content clearfix">
						
						<span class="chat-time">13:38</span>

						<h5>John Doe</h5>

						<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

					</div> <!-- end chat-message-content -->

				</div> <!-- end chat-message -->

				<hr>

			</div> <!-- end chat-history -->

			<p class="chat-feedback">Yazıyor..</p>

			<form action="#" method="post">

				<fieldset>
					
					<input type="text" placeholder="Mesajınızı Yazın" autofocus>
					<input type="hidden">

				</fieldset>

			</form>

		</div> <!-- end chat -->

	</div> <!-- end live-chat -->
 */

