const responseField = document.getElementById("response");
const errorField = document.getElementById("error");
const buttons = document.querySelectorAll("button");

function setLoading(isLoading) {
  buttons.forEach(btn => btn.disabled = isLoading);
  if (isLoading) {
    responseField.value = "Loading...";
  }
}

function showError(msg) {
  errorField.innerText = msg;
}

function clearError() {
  errorField.innerText = "";
}

function getBaseUrl() {
  const id = document.getElementById("idInstance").value.trim();
  if (!id) throw new Error("Введите idInstance");
  return `https://api.green-api.com/waInstance${id}`;
}

function getToken() {
  const token = document.getElementById("apiTokenInstance").value.trim();
  if (!token) throw new Error("Введите ApiTokenInstance");
  return token;
}

function setResponse(data) {
  responseField.value = JSON.stringify(data, null, 2);
}

async function request(url, options = {}) {
  try {
    clearError();
    setLoading(true);

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP ошибка: ${res.status}`);
    }

    const data = await res.json();
    setResponse(data);

  } catch (err) {
    showError(err.message);
    responseField.value = "Ошибка запроса";
  } finally {
    setLoading(false);
  }
}

// EVENTS
document.getElementById("btnGetSettings").onclick = () => {
  const url = `${getBaseUrl()}/getSettings/${getToken()}`;
  request(url);
};

document.getElementById("btnGetState").onclick = () => {
  const url = `${getBaseUrl()}/getStateInstance/${getToken()}`;
  request(url);
};

document.getElementById("btnSendMessage").onclick = () => {
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!phone || !message) {
    return showError("Введите телефон и сообщение");
  }

  const url = `${getBaseUrl()}/sendMessage/${getToken()}`;

  request(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chatId: phone + "@c.us",
      message: message
    })
  });
};

document.getElementById("btnSendFile").onclick = () => {
  const phone = document.getElementById("phoneFile").value.trim();
  const fileUrl = document.getElementById("fileUrl").value.trim();

  if (!phone || !fileUrl) {
    return showError("Введите телефон и URL файла");
  }

  const url = `${getBaseUrl()}/sendFileByUrl/${getToken()}`;

  request(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chatId: phone + "@c.us",
      urlFile: fileUrl,
      fileName: "file"
    })
  });
};
