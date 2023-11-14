import React, { useState } from "react";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { getMessages, sendMessage } from "./graphService"; // You'll create this file to handle Graph API calls

function Mails() {
  const [messages, setMessages] = useState([]);
  const [mailbody, setMailbody] = useState(
    "Hello, Greetings, This been a pleasure to do business with you"
  );

  async function handleSend() {
    try {
      const provider = Providers.globalProvider;
      const accessToken = await provider.getAccessToken();

      if (
        provider &&
        provider.state === ProviderState.SignedIn &&
        accessToken
      ) {
        console.log(accessToken,mailbody);
        sendMessage(accessToken,mailbody)
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }


    async function fetchMessages() {
      try {
        const provider = Providers.globalProvider;
        const accessToken = await provider.getAccessToken();

        if (
          provider &&
          provider.state === ProviderState.SignedIn &&
          accessToken
        ) {
          console.log("Fetching");
          const fetchedMessages = await getMessages(accessToken);
          setMessages(fetchedMessages.value); // Assuming fetchedMessages contains an array under 'value'
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    // fetchMessages();
 

  return (
    <div>
      <div className="mockup-browser border bg-base-300">
        <div className="mockup-browser-toolbar">
          <div className="input">BNY Threadcraft</div>
        </div>
        <div className=" px-4 py-8 bg-base-200">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="/1.webp" />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="/2.avif" />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble py-4">
              <ul>
                {/* {console.log(messages)} */}
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className="text-xl mb-4 font-bold">
                      {message.subject}
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: message.body.content }}
                    />
                  </div>
                ))}
              </ul>
            </div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>

          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="/2.avif" />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble py-4">
              <ul>
                <div key={"asdas"}>
                  <div className="text-xl mb-4 font-bold">New Mail</div>
                  <div>{mailbody}</div>
                </div>
              </ul>
            </div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <div className="flex items-center">
          <textarea
            onChange={(e) => setMailbody(e.target.value)}
            placeholder="Bio"
            className="textarea textarea-bordered textarea-md w-full max-w-xs"
          ></textarea>
          <button className="btn btn-primary" onClick={handleSend}>
            Send Message
          </button>
          <button className="btn btn-primary" onClick={fetchMessages}>
            Fetch Mails
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mails;
