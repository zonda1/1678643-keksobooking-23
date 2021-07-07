
const getOffers = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) =>
    {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) =>
    {
      onSuccess(json);
    })
    .catch((err) =>
    {
      onError(err);
    });
};

const sendOffer=(onSuccess,onFail,body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      type:'multipart/form-data',
      body,
    },
  )
    .then((resolve) => {
      if (resolve.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() =>
    {
      onFail();
    });
};


export {getOffers,sendOffer};
