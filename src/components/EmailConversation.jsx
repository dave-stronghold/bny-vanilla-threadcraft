import React from "react";
function formatDateTime(dateTimeString) {
  const options = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(dateTimeString);
  return date.toLocaleString("en-US", options);
}

const senderMessages = [
  {
    id: "1",
    sender: true,
    subject: "Regarding project update",
    body: {
      content:
        "Hi team, Just a quick update on the project progress. We've made significant headway in the development phase...",
    },
    sentReceivedDateTime: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    sender: true,
    subject: "Meeting rescheduled",
    body: {
      content:
        "Hey, I need to inform you that the meeting scheduled for tomorrow has been rescheduled to next week due to some unavoidable circumstances...",
    },
    sentReceivedDateTime: "2023-11-16T14:45:00Z",
  },
  {
    id: "3",
    sender: true,
    subject: "Task deadline extension",
    body: {
      content:
        "Hi all, Considering the complexity of the task, we're extending the deadline by two days. Please adjust your schedules accordingly...",
    },
    sentReceivedDateTime: "2023-11-17T09:20:00Z",
  },
  // Add more sender messages as needed
];

const receiverMessages = [
  {
    id: "4",
    sender: false,
    subject: "Re: Regarding project update",
    body: {
      content:
        "Hello, Thank you for the update. The progress sounds great! Looking forward to the upcoming milestones and further progress...",
    },
    sentReceivedDateTime: "2023-11-15T11:05:00Z",
  },
  {
    id: "5",
    sender: false,
    subject: "Re: Meeting rescheduled",
    body: {
      content:
        "Hi, Thanks for informing. The rescheduled timing works for me. I appreciate your prompt notification...",
    },
    sentReceivedDateTime: "2023-11-16T15:30:00Z",
  },
  {
    id: "6",
    sender: false,
    subject: "Re: Task deadline extension",
    body: {
      content:
        "Team, Noted the deadline extension. We'll manage the tasks accordingly to meet the updated deadline. Thank you for the heads-up...",
    },
    sentReceivedDateTime: "2023-11-17T10:10:00Z",
  },
  // Add more receiver messages as needed
];

const EmailConversation = () => {
  const combineAndSortMessages = () => {
    const combinedMessages = [...senderMessages, ...receiverMessages];
    return combinedMessages.sort(
      (a, b) =>
        new Date(a.sentReceivedDateTime) - new Date(b.sentReceivedDateTime)
    );
  };

  const messages = combineAndSortMessages();

  return (
    <div>
      {messages.map((message, index) => (
        <div
          className={`chat ${message.sender ? "chat-end" : "chat-start"}`}
          key={message.id}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Sender" src={message.sender ? "/1.webp" : "/2.avif"} />
            </div>
          </div>
          <div className="chat-header">
            {message.sender ? "Sender" : "Receiver"}{" "}
            {/* Use sender or receiver info */}
            <time className="text-xs opacity-50">
              {/* {formatDateTime(message.sentReceivedDateTime)} */}
            </time>{" "}
            {/* Use sent/received date/time */}
          </div>
          <div className="chat-bubble">
            <div className="text-xl mb-4 font-bold">{message.subject}</div>
            <div dangerouslySetInnerHTML={{ __html: message.body.content }} />
          </div>
          <div className="chat-footer opacity-50">
            {message.sender ? "Sent" : "Received"} at{" "}
            {formatDateTime(message.sentReceivedDateTime)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailConversation;
