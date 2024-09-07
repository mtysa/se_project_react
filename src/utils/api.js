const baseUrl = "http://localhost:3001";

function checkRes(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};

const updateUserInfo = (name, avatar, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkRes);
};

function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkRes);
}

function addItem(name, imageUrl, weather, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkRes);
}

function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

export { checkRes, getUserInfo, updateUserInfo, getItems, addItem, deleteItem };
