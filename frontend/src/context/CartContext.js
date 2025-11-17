// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [planCart, setPlanCart] = useState([]);
  const [addonCart, setAddonCart] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId") || 1;

  const fetchCart = async () => {
    if (!userId) return;
    try {
      const [planRes, addonRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/cart/plan/user/${userId}`),
        axios.get(`http://localhost:8080/api/cart/addon/user/${userId}`),
      ]);

      console.log("🟢 Plans from backend:", planRes.data);
      console.log("🟢 Addons from backend:", addonRes.data);

      // ✅ Backend returns arrays directly
      setPlanCart(Array.isArray(planRes.data) ? planRes.data : []);
      setAddonCart(Array.isArray(addonRes.data) ? addonRes.data : []);

    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      setMessage("⚠️ Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item, type) => {
    try {
      if (type === "plan") {
        await axios.post(`http://localhost:8080/api/cart/add/plan?userId=${userId}&planId=${item.id}`);
      } else {
        await axios.post(`http://localhost:8080/api/cart/add/addon?userId=${userId}&addonId=${item.id}`);
      }
      setMessage(`✅ ${item.name} added to cart!`);
      await fetchCart(); // refresh cart after adding
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      setMessage("❌ Failed to add item.");
    }
  };

  const removePlan = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/plan/${id}`);
      fetchCart();
    } catch (err) {
      console.error("❌ Failed to remove plan:", err);
    }
  };

  const removeAddon = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/addon/${id}`);
      fetchCart();
    } catch (err) {
      console.error("❌ Failed to remove addon:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return (
    <CartContext.Provider
      value={{
        planCart,
        addonCart,
        addToCart,
        removePlan,
        removeAddon,
        message,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);





// // src/context/CartContext.js
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [planCart, setPlanCart] = useState([]);
//   const [addonCart, setAddonCart] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   const userId = localStorage.getItem("userId") || 1; // temporary for testing

//   // Fetch user's cart
//   const fetchCart = async () => {
//   if (!userId) return;
//   try {
//     const planRes = await axios.get(`http://localhost:8080/api/cart/plan/user/${userId}`);
//     const addonRes = await axios.get(`http://localhost:8080/api/cart/addon/user/${userId}`);

//     // ✅ since backend returns plain arrays, set them directly
//     setPlanCart(Array.isArray(planRes.data) ? planRes.data : []);
//     setAddonCart(Array.isArray(addonRes.data) ? addonRes.data : []);

//   } catch (err) {
//     console.error("❌ Failed to fetch cart:", err);
//     setMessage("⚠️ Failed to load cart.");
//   } finally {
//     setLoading(false);
//   }
// };




//   // Add to cart (plan or addon)
//   const addToCart = async (item, type) => {
//     try {
//       if (type === "plan") {
//         await axios.post(`http://localhost:8080/api/cart/add/plan?userId=${userId}&planId=${item.id}`);
//       } else {
//         await axios.post(`http://localhost:8080/api/cart/add/addon?userId=${userId}&addonId=${item.id}`);
//       }
//       setMessage(`✅ ${item.name} added to cart!`);
//       fetchCart();
//     } catch (err) {
//   console.error("❌ Error adding to cart:", err.response ? err.response.data : err.message);
//   setMessage("❌ Failed to add item.");
// }
//   };

//   // Remove Plan
//   const removePlan = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/cart/plan/${id}`);
//       fetchCart();
//     } catch (err) {
//       console.error("❌ Failed to remove plan:", err);
//     }
//   };

//   // Remove Addon
//   const removeAddon = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/cart/addon/${id}`);
//       fetchCart();
//     } catch (err) {
//       console.error("❌ Failed to remove addon:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [userId]);

//   return (
//     <CartContext.Provider
//       value={{
//         planCart,
//         addonCart,
//         addToCart,
//         removePlan,
//         removeAddon,
//         message,
//         loading,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
