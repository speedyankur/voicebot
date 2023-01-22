import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ChatGPT from "./ChatGPT";
import ChatItem from "../ChatItem/ChatItem";
import "./distaphone.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useSpeechSynthesis } from "react-speech-kit";

const Dictaphone = () => {
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const { speak } = useSpeechSynthesis();
  const {
    transcript,
    listening,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript !== "") {
      messages.push({
        text: finalTranscript,
        author: "Me",
      });
      setMessages(messages);
      setPending(true);
      async function fetchData() {
        const response = await ChatGPT(finalTranscript);
        setPending(false);
        console.log(response);
        const { choices } = response.data;
        if (choices.length > 0) {
          messages.push({
            text: choices[0].text,
            author: "BOT",
          });
          setMessages(messages);
          speak({ text: choices[0].text });
        }
      }
      fetchData();
    }
  }, [interimTranscript, finalTranscript, messages]); // pass `value` as a dependency

  useEffect(
    (msg) => {
      console.log("got new msg", msg);
    },
    [messages]
  ); // pass `value` as a dependency

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <div className="chatbox">
        {messages.map(function (msg, i) {
          return <ChatItem msg={msg} key={i} />;
        })}
        <ClipLoader loading={pending} />
      </div>
      <div className="controls">
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Speak</button>
      </div>
    </div>
  );
};
export default Dictaphone;
