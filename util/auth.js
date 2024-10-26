import axios from "axios";

// const loginAndSIgnUp = async (mode, data) => {
//   const response = await axios.post(
//     `https://1fe3-102-88-63-207.ngrok-free.app/api/V1/skyshowNG/${mode}`,
//     data
//   );
//   return response.data;
// };

const url = `https://skyshow.vercel.app/api`;

export async function createUser(payload) {
  const response = await axios.post(`${url}/api/auth/signUp`, payload);
  return response.data;
}

export async function verifyEmailAndNumber(option, data) {
  if (option === "Email") {
    const response = await axios.post(
      `${url}/api/V1/skyshowNG/signUp?email=${data}`
    );
    return response.data;
  }

  if (option === "Number") {
    const response = await axios.post(
      `${url}/api/V1/skyshowNG/signUp?Number=${data}`
    );
    return response.data;
  }
}

export async function login(payload) {
  // console.log(payload);
  const response = await axios.post(`${url}/api/auth/signIn`, payload);
  return response.data;
}

export async function generateBTC(token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(
    `${url}/api/V1/skyshowNG/btc_Wallet_Address`,
    {
      headers,
    }
  );
  return response.data;
}

export async function generateEthereumWallet(token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(
    `${url}/api/V1/skyshowNG/generateEtheriumWallet`,
    {
      headers,
    }
  );
  return response.data;
}

export async function generateUsdt(token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(
    `${url}/api/V1/skyshowNG/generateTetherAddress`,
    {
      headers,
    }
  );
  return response.data;
}

export async function update(data, token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.patch(`${url}/api/V1/skyshowNG/updateMe`, data, {
    headers,
  });
  return response.data;
}

export async function getBankList(data, token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(`${url}/api/V1/skyshowNG/listBank`, {
    headers,
  });
  return response.data;
}

export async function addBank(data, token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(
    `${url}/api/V1/skyshowNG/addBank?AccountNumber=${data.number}&bankName=${data.bankName}`,
    {
      headers,
    }
  );
  return response.data;
}

export async function getSavedBank(token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };
  //rewrite url
  const response = await axios.get(`${url}/api/V1/skyshowNG/savedBank`, {
    headers,
  });
  return response.data;
}

export async function withdraw(data, token) {
  // let amount;
  // amount = `${data.amount}00`;

  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(
    `${url}/api/V1/skyshowNG/withdraw?amount=${data.amount}&desc=${""}&bank=${
      data.selectedBank
    }`,
    {
      headers,
    }
  );
  return response.data;
}

export async function cryptoTransactionHis(token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(
    `${url}/api/V1/skyshowNG/transations_Crypo`,
    {
      headers,
    }
  );
  return response.data;
}

export async function refer(token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(`${url}/api/V1/skyshowNG/refarral_link`, {
    headers,
  });
  return response.data;
}

export async function getgiftCarfHistory(token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(
    `${url}/api/V1/skyshowNG/transations_GiftCard`,
    {
      headers,
    }
  );
  return response.data;
}

export async function ngnHistory(token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.get(`${url}/api/V1/skyshowNG/transations_NGN`, {
    headers,
  });
  return response.data;
}

export async function createUserPin(data, token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.post(`${url}/api/V1/skyshowNG/set_pin`, data, {
    headers,
  });
  return response.data;
}

export async function resetUserPin(data, token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.post(`${url}/api/V1/skyshowNG/reset_pin`, data, {
    headers,
  });
  return response.data;
}

/////// update password
export async function changePassword(data, token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };

  const response = await axios.patch(
    `${url}/api/V1/skyshowNG/Updatepassword`,
    data,
    {
      headers,
    }
  );
  return response.data;
}

export async function resetPassword(data) {
  console.log(data);

  const response = await axios.get(
    `${url}/api/V1/skyshowNG/forgetpassword?Info=${data}`
  );
  return response.data;
}

export async function resetPasswordOTP(data, token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };
  const response = await axios.get(
    `${url}/api/V1/skyshowNG/verity_otp?verify_Info=${data}`,
    { headers }
  );
  return response.data;
}

///// change password
export async function resetPass(data, token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };
  const response = await axios.patch(
    `${url}/api/V1/skyshowNG/resetPassword`,
    data,
    {
      headers,
    }
  );
  return response.data;
}

// coming soon
export async function rateAlert(data, token) {
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "Application/json",
  };
  const response = await axios.post(`${url}/api/V1/skyshowNG/RateAlart`, data, {
    headers,
  });
  return response.data;
}
