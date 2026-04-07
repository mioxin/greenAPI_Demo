import { useState } from "react";
import Form from "./components/Form";
import ResponseBox from "./components/ResponseBox";
import "./styles.css";

export default function App() {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");

  return (
    <div className="container">
      <Form setResponse={setResponse} setError={setError} />

      <div className="right">
        <h3>Ответ</h3>
        {error && <div className="error">{error}</div>}
        <ResponseBox data={response} />
      </div>
    </div>
  );
}
