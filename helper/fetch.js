import { headers } from "../constants/index";

const fetchProducts = async () => {
  const res = await fetch(process.env.API, {
    headers,
  });
  return await res.json();
};

export default fetchProducts;
