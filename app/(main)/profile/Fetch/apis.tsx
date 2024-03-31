import { getHeaders } from "@/helpers/getHeaders";

const SERVER =
  "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/";

export const fetchBanks = async (firebase_user_id) => {
  if (firebase_user_id) {
    const res = await fetch(`${SERVER}data-get/get-banks/`, {
      method: "GET",
      headers: getHeaders(firebase_user_id),
    });
    const data = await res.json();
    return data;
  }
};

export const fetchCards = async (firebase_user_id) => {
  if (firebase_user_id) {
    const res = await fetch(`${SERVER}/data-get/get-cards/`, {
      method: "GET",
      headers: getHeaders(firebase_user_id),
    });
    const data = await res.json();

    console.log(data);
    return data;
  }
};

export const deleteData = async (firebase_user_id, endpoint) => {
  if (firebase_user_id) {
    const res = await fetch(`${SERVER}${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(firebase_user_id),
    });
    const data = await res.json();

    console.log(data);
    return data;
  }
};
