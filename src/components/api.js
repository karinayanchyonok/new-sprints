const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
      authorization: 'da898504-0ad6-47da-95b0-8c5743c373ad',
      'Content-Type': 'application/json'
    }
  }
  
  export const getInitialCard = () => {
      return fetch('', {})
      // ...
  }

  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  } 