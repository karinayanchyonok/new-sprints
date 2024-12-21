export const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
      authorization: 'da898504-0ad6-47da-95b0-8c5743c373ad',
      'Content-Type': 'application/json'
    }
}

/*
.then(res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
*/

export const getUserInformation = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    });
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    });
};

export const updateProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`
          })
    });
};

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`
        })
    })
}

export const deleteCard = (cardId) =>{
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
}

export const putLike = (cardId) =>{
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    })
}

export const deleteLike = (cardId) =>{
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    });
};

export const changeAvatar = (avatar) =>{
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${avatar}`
        })
    });
};

/*TODO all under this line from task 11*/