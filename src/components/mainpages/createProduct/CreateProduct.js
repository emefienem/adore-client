import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/Loading/Loading";
import "./CreateProduct.css";
const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "How to write code. blah blah blah blah",
  content:
    "lorem ipsumm is the dummy text invented to write nonsense to avoid writing the nonsense like i am writing at that point, wowowowoowondeddffefevrvrvrfvrwfrvvsdvsdvsdv",
  category: "",
  id: "",
};

const CreateProduct = () => {
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState(initialState);
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const navigate = useNavigate();
  const param = useParams();
  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);

  const [callback, setCallBack] = state.productsAPI.callback;

  useEffect(() => {
    setOnEdit(true);
    if (param.id) {
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setImages(false);
      setProduct(initialState);
    }
  }, [param.id, products]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return setMessage("You are not an admin");
      const file = e.target.files[0];
      if (!file) return setMessage("File does not exist");
      if (file.size > 1024 * 1024) return setMessage("Size is too large");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setMessage("file not supported");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post(
        "https://adore-server.onrender.com/api/upload",
        formData,
        {
          headers: { "content-type": "multipart/form", Authorization: token },
        }
      );
      setLoading(false);
      setImages(res.data);
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return setMessage("You are not an admin");
      setLoading(true);
      await axios.post(
        "https://adore-server.onrender.com/api/destroy",
        { public_id: images.public_id },
        { headers: { Authorization: token } }
      );
      setLoading(false);
      setImages(false);
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isAdmin) return setMessage("You are not an admin");
      if (!images) return setMessage("No image found");
      if (onEdit) {
        await axios.put(
          `https://adore-server.onrender.com/api/products/${product._id}`,
          { ...product, images },
          { headers: { Authorization: token } }
        );
      } else {
        await axios.post(
          "https://adore-server.onrender.com/api/products",
          { ...product, images },
          { headers: { Authorization: token } }
        );
      }
      setImages(false);
      setProduct(initialState);
      setCallBack(!callback);
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div className="body2">
      <p style={{ textAlign: "center", color: "#fff", background: "red" }}>
        {message}
      </p>
      <div className="create-product">
        <div className="upload">
          <input type="file" name="file" id="file-up" onChange={handleUpload} />
          {loading ? (
            <div id="file-img">
              <Loading />
            </div>
          ) : (
            <div id="file-img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="product_id">Product_id</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
              disabled={onEdit}
            />
          </div>
          <div className="row">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="description">Description</label>
            <textarea
              rows="5"
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="content">Content</label>
            <textarea
              rows="7"
              type="text"
              name="content"
              id="content"
              required
              value={product.content}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              required
              value={product.category}
              onChange={handleChangeInput}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">
            {onEdit ? "Edit Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
