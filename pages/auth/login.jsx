import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import authImg from "../../public/images/auth-img.png";
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
      const resultLogin = await axios.post("/auth/login", formLogin);
      const { id, pin, token } = resultLogin.data.data;
      Cookies.set("token", token);
      await dispatch(getUserByIdRedux(id));
      setIsError(false);
      setMessage("You're logged in succesfully");
      if (pin) {
        router.push("/dashboard");
      } else {
        router.push("/auth/pin");
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <Layout title={"Login | FazzPay"}>
      <div className="container-lg px-5 py-4 vh-100">
        <div className="row h-100 bg-white shadow rounded border">
          <div
            className="col-7 rounded-start h-100 position-relative overflow-hidden"
            style={{
              backgroundImage: "url(/images/auth-bg-img.png)",
            }}
          >
            <h1 className="h2 fw-bold text-white px-5 py-4 position-absolute top-0 start-0">
              FazzPay
            </h1>
            <div
              className="position-absolute start-50 translate-middle-x"
              style={{ width: "59%", height: "auto", top: "12%" }}
            >
              <Image src={authImg} alt="login page illustration" />
            </div>
            <div className="px-5 py-4 position-absolute bottom-0 start-0">
              <h2 className="h5 fw-bold text-white">
                App that Covering Banking Needs.
              </h2>
              <p className="text-white opacity-75 m-0">
                FazzPay is an application that focussing in banking needs for
                all users in the world. Always updated and always following
                world trends. 5000+ users registered in FazzPay everyday with
                worldwide users coverage.
              </p>
            </div>
          </div>
          <div className="col-5 px-5 d-flex justify-content-center align-items-center">
            <div>
              <h2 className="h4 fw-bold mb-2">
                Start Accessing Your Banking Needs With FazzPay
              </h2>
              <p className="opacity-75 mb-4">
                Transfering money is easier than ever, you can access FazzPay
                wherever you are and whenever you want.
              </p>
              <form onSubmit={handleLogin}>
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
                  <label
                    htmlFor="password"
                    className="form-label visually-hidden"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formLogin.password}
                    onChange={handleChangeForm}
                  />
                </div>
                <Link href="/auth/forgot-password">
                  <a className="fs-7 d-block text-end">Forgot password?</a>
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary fw-bold mt-4 mb-5 w-100"
                >
                  Login
                </button>
              </form>
              <p className="text-center m-0">
                Don't have an account? Let's{" "}
                <Link href="/register">
                  <a className="text-primary fw-bold">Sign Up</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
