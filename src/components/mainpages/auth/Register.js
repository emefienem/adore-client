import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircle } from "@fortawesome/free-solid-svg-icons";
// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3, 23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8, 24}$/;

// const Register = () => {
//   const userRef = useRef();
//   const errRef = useRef();

//   const [user, setUser] = useState("");
//   const [validName, setValidName] = useState(false);
//   const [userFocus, setUserFocus] = useState(false);

//   const [pwd, setPwd] = useState("");
//   const [validPwd, setValidPwd] = useState(false);
//   const [pwdFocus, setPwdFocus] = useState(false);

//   const [matchPwd, setMatchPwd] = useState("");
//   const [validMatch, setValidMatch] = useState(false);
//   const [matchFocus, setMatchFocus] = useState(false);

//   const [errMsg, setErrMsg] = useState('')
//   const [success, setSuccess] = useState(false)

//   useEffect(() => {
//     userRef.current.focus()
//   }, [])

//   useEffect(() => {
//     const result = USER_REGEX.test(user);
//     console.log(result);
//     console.log(user);
//     setValidName(result);
//   }, [user]);
//   return <div>Register</div>;
// };

// export default Register;

const Register = () => {
  const [user, setUser] = useState({
    user: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (error) {
      // <div>{error.response.data.msg}</div>;
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register </h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={onChangeInput}
          value={user.name}
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={onChangeInput}
          value={user.email}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit">Register</button>
          <Link to="/Login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
