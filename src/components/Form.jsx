import { useState } from "react";
import { useApi } from "../hooks/useApi";

export default function Form({ setResponse, setError }) {
  const { callApi } = useApi();

  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const base = () => `https://api.green-api.com/waInstance${id}`;

  const handle = async (url, options) => {
    try {
      setError("");
      setResponse("Loading...");

      const data = await callApi(url, options);
      setResponse(data);

    } catch (e) {
      setError(e.message);
      setResponse("Ошибка");
    }
  };

  return (
    <div className="left">
      <input placeholder="idInstance" onChange={e => setId(e.target.value)} />
      <input placeholder="ApiTokenInstance" onChange={e => setToken(e.target.value)} />

      <button onClick={() => handle(`${base()}/getSettings/${token}`)}>
        getSettings
      </button>

      <button onClick={() => handle(`${base()}/getStateInstance/${token}`)}>
        getStateInstance
      </button>

      <input placeholder="phone" onChange={e => setPhone(e.target.value)} />
      <input placeholder="message" onChange={e => setMessage(e.target.value)} />

      <button onClick={() =>
        handle(`${base()}/sendMessage/${token}`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            chatId: phone + "@c.us",
            message
          })
        })
      }>
        sendMessage
      </button>

      <input placeholder="file url" onChange={e => setFileUrl(e.target.value)} />

      <button onClick={() =>
        handle(`${base()}/sendFileByUrl/${token}`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            chatId: phone + "@c.us",
            urlFile: fileUrl,
            fileName: "file"
          })
        })
      }>
        sendFileByUrl
      </button>
    </div>
  );
}
