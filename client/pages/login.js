import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";
import { Button, Dropdown, Form, Grid, Header } from "semantic-ui-react";
import { loginUser } from "../graphql/mutation.js";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth.js";
import { useForm } from "../context/hook.js";
import LoginButtons from "../components/Login/LoginImage";
import LoginImage from "../components/Login/LoginImage";

const login = () => {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (context.user) {
    router.push("/");
  }

  const [serverErrors, setServerErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
    accountType: "User",
  });

  const accountTypeOptions = [
    { text: "User", value: "User" },
    { text: "Counsellor", value: "Counsellor" },
  ];

  const [login, { loading }] = useMutation(loginUser, {
    update(proxy, result) {
      context.login(result.data.loginUser);
      router.push("/");
    },
    onError(err) {
      setServerErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    login();
  }

  return (
    <div
      style={{
        height: "1000px",
        width: "100%",
        backgroundImage:
          "url(" +
          "https://www.cleantechloops.com/wp-content/uploads/2020/06/taboos-mental-health.jpg" +
          ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100%",
        minWidth: "500px",
      }}
    >
      {/* <img
        src="https://www.cleantechloops.com/wp-content/uploads/2020/06/taboos-mental-health.jpg"
        style={{
          maxHeight: "900px",
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      /> */}
      <div
        style={{
          position: "relative",
          margin: "auto",
          width: "30%",
          borderStyle: "solid",
          padding: "20px 20px 20px 20px",
          borderRadius: "20px",
          top: "20%",
          backgroundColor: "white",
          minHeight: "300px",
          minWidth: "400px",
        }}
      >
        <h1
          style={{
            color: "rgb(0,0,0)",
            margin: "auto",
            width: "100%",
            textAlign: "center",
          }}
        >
          Welcome back!
        </h1>
        <Form
          onSubmit={onSubmit}
          className={loading ? "loading" : ""}
          style={{ margin: "auto", width: "100%", textAlign: "center" }}
        >
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <Form.Input
            label="Email"
            placeholder="Email"
            name="email"
            type="text"
            value={values.email}
            onChange={onChange}
            fluid
          />
          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={onChange}
            fluid
          />
          <Form.Dropdown
            placeholder="choose account type"
            name="accountType"
            onChange={onChange}
            selection
            options={accountTypeOptions}
            value={values.accountType}
            fluid
            style={{ textAlign: "center" }}
          />
          <Button type="submit" primary>
            Login
          </Button>
          <Header as="h4">
            New here? <a href="/register">Create an account here</a>
          </Header>
        </Form>
        {Object.keys(serverErrors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(serverErrors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default login;
