const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function checkRes(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

function getItems() {
  return fetch(`${baseUrl}/items`, { headers: headers })
    .then(checkRes)
    .catch((error) => {
      console.error(error);
    });
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkRes)
    .catch((error) => {
      console.error(error);
    });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headers,
  })
    .then(checkRes)
    .catch((error) => {
      console.error(error);
    });
}

export { getItems, addItem, deleteItem };
