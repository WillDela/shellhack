import type { FC } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

// message type
interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // ✅ handle sending message
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    const query = input;
    setInput("");

    // TODO: Replace with Gemini API call
    try {
      // Example: call your backend endpoint that wraps Gemini
      // const response = await fetch("/api/chat", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ query }),
      // });
      // const data = await response.json();

      // Temporary fake bot reply
      const botMessage: Message = { sender: "bot", text: `Gemini would respond to: "${query}"` };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to Gemini API." },
      ]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-3">🤖 Sylly Chatbot</h2>
      <p className="text-muted">Ask me about your courses, assignments, or syllabus.</p>

      {/* Chat window */}
      <div className="card shadow-sm p-3 mb-3" style={{ height: "400px", overflowY: "auto" }}>
        {messages.length === 0 && <p className="text-muted">No messages yet. Start chatting below!</p>}
        {messages.map((msg, idx) => (
          <p
            key={idx}
            className={msg.sender === "user" ? "text-end mb-2" : "text-start mb-2"}
          >
            <span
              className={`px-3 py-2 rounded-3 ${
                msg.sender === "user" ? "bg-primary text-white" : "bg-light border"
              }`}
            >
              {msg.text}
            </span>
          </p>
        ))}
      </div>

      {/* Input */}
      <Form onSubmit={handleSend} className="d-flex gap-2">
        <Form.Control
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </Form>
    </div>
  );
};

export default Chatbot;
