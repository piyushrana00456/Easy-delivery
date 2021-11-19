import React from "react";
import styles from "./LoginPage.module.css";
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginLoading,
  loginSuccess,
  loginError,
} from "../../Redux/Auth/action.js";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState("user");
  const dispatch = useDispatch();
  // const { user, token, auth } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      dispatch(loginLoading());
      let url =
        client === "user"
          ? "http://localhost:5000/user-login"
          : "http://localhost:5000/driver-login";
      await axios
        .post(url, {
          email: email,
          password: password,
        })

        .then((res) => {
          const action = loginSuccess(res.data);
          dispatch(action);
          console.log(url);
          localStorage.setItem("user", JSON.stringify(res.data));
        });
    } catch (err) {
      const action = loginError("wrong credentials");
      dispatch(action);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <div className={styles.input_box}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={styles.input_box}>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={`${styles.input_box}${styles.radio}`}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="type"
              name="client_type"
              value={client}
              onChange={(e) => {
                setClient(e.target.value);
              }}
            >
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="User"
                labelPlacement="start"
              />
              <FormControlLabel
                value="driver"
                control={<Radio />}
                label="Driver"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.button_box}>
          <Button
            variant="contained"
            size="medium"
            style={{ width: "100%" }}
            onClick={handleLogin}
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};