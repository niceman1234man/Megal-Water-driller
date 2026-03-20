import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FiTrash2, FiMail} from "react-icons/fi";
import { toast } from "react-toastify";

export default function MessageAdmin() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get("/api/messages");
      setMessages(res.data);
    } catch {
      toast.error("Failed to fetch messages");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axiosInstance.delete(`/api/messages/${id}`);
      setMessages(messages.filter((m) => m._id !== id));
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          📩 Contact Messages
        </h1>

        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Message</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 font-semibold text-gray-800">
                      {msg.name}
                    </td>
                    <td className="px-4 py-2 text-blue-600">{msg.email}</td>
                    <td className="px-4 py-2">{msg.subject}</td>
                    <td className="px-4 py-2 text-gray-600 max-w-xs truncate">
                      {msg.message}
                    </td>
                    <td className="px-4 py-2 flex gap-3 justify-center">
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-green-600 hover:text-green-800"
                        title="Reply"
                      >
                        <FiMail size={18} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
