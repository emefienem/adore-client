import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [message, setMessage] = useState("");
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `https://adore-server.onrender.com/api/category/${id}`,
          { name: category },
          { headers: { Authorization: token } }
        );
        setMessage(res.data.msg);
      } else {
        const res = await axios.post(
          "https://adore-server.onrender.com/api/category",
          { name: category },
          { headers: { Authorization: token } }
        );
        setMessage(res.data.msg);
      }
      setCategory("");
      setCallback(!callback);
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(
        `https://adore-server.onrender.com/api/category/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      setMessage(res.data.msg);
      setCallback(!callback);
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <p style={{ textAlign: "center", color: "#fff", background: "red" }}>
        {message}
      </p>
      <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">{onEdit ? "Update" : "Save"}</button>
      </form>
      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <button onClick={() => editCategory(category._id, category.name)}>
                Edit
              </button>
              <button onClick={() => deleteCategory(category._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
