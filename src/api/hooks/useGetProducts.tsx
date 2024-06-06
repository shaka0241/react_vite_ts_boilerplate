// import { apiUrl } from "../config";

export const useGetProducts = () => {
  const getProducts = async () => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  return {
    getProducts,
  };
};