import React, { useState } from "react";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { getMessages, sendMessage } from "./graphService"; // You'll create this file to handle Graph API calls
import EmailConversation from "./EmailConversation";
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
        console.log(accessToken, mailbody);
        sendMessage(accessToken, mailbody);
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
          <EmailConversation/>
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
