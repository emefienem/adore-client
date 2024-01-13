import { useState, useEffect } from "react";
import axios from "axios";
const api = process.env.REACT_APP_SERVER_URL;

const UserAPI = (token) => {
  const [message, setMessage] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let timer;

    if (message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(`${api}/user/infor`, {
            headers: { Authorization: token },
          });
          setUser(res.data);
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(res.data.cart);
        } catch (error) {
          setMessage(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) return setMessage("Please login to continue buying");
    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        `${api}/user/addcart`,
        {
          cart: [...cart, { ...product, quantity: 1 }],
        },
        { headers: { Authorization: token } }
      );
      setMessage("This product has been added successfully");
    } else {
      setMessage("This product has been added to the cart");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addCart: addCart,
    cart: [cart, setCart],
    message: [message, setMessage],
    user: user,
  };
};

export default UserAPI;
