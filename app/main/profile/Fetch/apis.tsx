import { getHeaders } from "@/helpers/getHeaders";
import { userfirebase } from "@/context/firebase";

const SERVER =
  "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/";

export const fetchdata = async (endpoint: string) => {
  const res = await fetch(`${SERVER}${endpoint}`, {
    method: "GET",
    headers: await getHeaders(),
  });
  const data = await res.json();

  return data;
};

export const deleteData = async (endpoint: string) => {
  const { auth } = userfirebase();
  const res = await fetch(`${SERVER}${endpoint}`, {
    method: "GET",
    headers: await getHeaders(),
  });
  const data = await res.json();

  console.log(data);
  return data;
};

export const sellassetfd = async (endpoint: string, data: any) => {
  const { auth } = userfirebase();
  const res = await fetch(`${SERVER}${endpoint}`, {
    method: "POST",
    headers: await getHeaders(),
    body: data,
  });
  const data1 = await res.json();

  console.log(data1);
  return data1;
};
