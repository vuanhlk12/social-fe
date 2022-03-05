import style from "./messenger.module.scss";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import api from "../../utils/helper";
import config from "utils/config";
import TextField from "@material-ui/core/TextField";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button } from "@material-ui/core";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  const user = useSelector((state) => state?.auth?.user);
  const scrollRef = useRef();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    socket.current = io(config.SOCKET_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await api({
          method: "get",
          url: "/conversations/" + user._id,
        });
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await api({
          method: "get",
          url: "/messages/" + currentChat?._id,
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    !!currentChat?._id && getMessages();
  }, [currentChat]);

  const onSubmit = async (value) => {
    const newMessage = value?.newMessage;
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await api({
        method: "post",
        url: "/messages",
        data: message,
      });
      reset({ newMessage: "" });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className={style.messenger}>
        <div className={style.chatMenu}>
          <div className={style.chatMenuWrapper}>
            <input
              placeholder="Search for friends"
              className={style.chatMenuInput}
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c?._id}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className={style.chatBox}>
          <div className={style.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={style.chatBoxTop}>
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m?._id}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={style.chatBoxBottom}
                  >
                    <Controller
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <TextField
                          style={{ width: "100%" }}
                          placeholder="write something..."
                          label="Chat"
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          error={!!error}
                          // helperText={error?.message}
                        />
                      )}
                      name="newMessage"
                      control={control}
                      rules={{ required: "Đây là trường bắt buộc" }}
                    />

                    <Button variant="contained" color="primary" type="submit">
                      Send
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <span className={style.noConversationText}>
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className={style.chatOnline}>
          <div className={style.chatOnlineWrapper}>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
