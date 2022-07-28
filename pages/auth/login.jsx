import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout/AuthLayout";
import axios from "../../utils/axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getUserByIdRedux } from "../../store/actions/user";
import { useRouter } from "next/router";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAllFormFilled = Object.keys(formLogin).every((el) => formLogin[el]);

  useEffect(() => {
    setIsError(false);
    setMessage("");
  }, []);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const resultLogin = await axios.post("/auth/login", formLogin);
      const { id, pin, token } = resultLogin.data.data;
      Cookies.set("token", token);
      await dispatch(getUserByIdRedux(id));
      setIsLoading(false);
      setIsError(false);
      setMessage("You're logged in succesfully");
      if (pin) {
        router.push("/dashboard");
      } else {
        router.push("/auth/pin");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <Layout title={"Login | FazzPay"}>
      <div className="w-100 auth-form">
        <div className="d-none d-md-block">
          <h2 className="h4 fw-bold mb-2">
            Start Accessing Your Banking Needs With FazzPay
          </h2>
          <p className="opacity-75 mb-4">
            Transfering money is easier than ever, you can access FazzPay
            wherever you are and whenever you want.
          </p>
        </div>
        <div className="d-block d-md-none text-center">
          <h2 className="h4 fw-bold mb-4">Login</h2>
          <p className="opacity-75 mb-4">
            Login to your existing account to access all the features in
            FazzPay.
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex-grow-1 d-flex flex-column justify-content-between"
        >
          {message ? (
            isError ? (
              <div className="alert alert-danger py-2" role="alert">
                {message}
              </div>
            ) : (
              <div className="alert alert-success py-2" role="alert">
                {message}
              </div>
            )
          ) : (
            <div className="mt-4"></div>
          )}
          <div>
            <div className="input-with-icon mb-3">
              <i className="bi bi-envelope input-icon text-secondary"></i>
              <label htmlFor="email" className="form-label visually-hidden">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formLogin.email}
                onChange={handleChangeForm}
              />
            </div>
            <div className="input-with-icon mb-3">
              <i className="bi bi-key input-icon text-secondary"></i>
              <label htmlFor="password" className="form-label visually-hidden">
                Password
              </label>
              <input
                type={showPwd ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formLogin.password}
                onChange={handleChangeForm}
              />
              <div role="button" onClick={() => setShowPwd(!showPwd)}>
                <i
                  className={`bi bi-${
                    showPwd ? "eye-slash" : "eye"
                  } text-secondary position-absolute top-50 end-0 translate-middle`}
                ></i>
              </div>
            </div>
            <Link href="/auth/forgot-password">
              <a className="fs-7 d-block text-end">Forgot password?</a>
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-primary fw-bold mt-4 mb-4 w-100"
            disabled={!isAllFormFilled}
          >
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm text-white"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-center m-0">
          Don't have an account? Let's{" "}
          <Link href="/register">
            <a className="text-primary fw-bold">Sign Up</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
