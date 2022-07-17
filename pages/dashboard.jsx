import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "../components/Layout/MainLayout";
import blankProfile from "../public/profiles/blank.png";
import HistoryCard from "../components/HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import currency from "../utils/currency";
import { getUserByIdRedux } from "../store/actions/user";
import { setHistoryNotifRedux } from "../store/actions/historyNotif";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import axiosServer from "../utils/axiosServer";
import axios from "../utils/axios";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export async function getServerSideProps(context) {
  try {
    const dataCookies = cookies(context);
    const historyDashboard = await axiosServer.get(
      `/transaction/history?page=1&limit=4`,
      {
        headers: {
          Authorization: `Bearer ${dataCookies.token}`,
        },
      }
    );
    const historyNotif = await axiosServer.get(
      `/transaction/history?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${dataCookies.token}`,
        },
      }
    );
    return {
      props: {
        historyDashboard: historyDashboard.data.data,
        historyNotif: historyNotif.data.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination:
          error.response?.status === 403
            ? "/auth/login"
            : `/error?msg=${error.response?.data.msg}`,
        permanent: false,
      },
    };
  }
}

export default function Dashboard(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);
  const histories = props.historyDashboard;
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    getUserById();
    getDashboardData();
    setHistoryNotif();
  }, []);

  const getUserById = async () => {
    await dispatch(getUserByIdRedux(userData.id));
  };

  const setHistoryNotif = () => {
    dispatch(setHistoryNotifRedux(props.historyNotif));
  };

  const getDashboardData = async () => {
    const result = await axios.get(`/dashboard/${userData.id}`);
    setDashboardData(result.data.data);
  };

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data:
          Object.keys(dashboardData).length !== 0
            ? dashboardData.listIncome.map((item) => item.total)
            : [],
        backgroundColor: "#4c64ec",
        barThickness: 12,
        borderRadius: 12,
      },
      {
        label: "Expense",
        data:
          Object.keys(dashboardData).length !== 0
            ? dashboardData.listExpense.map((item) => item.total)
            : [],
        backgroundColor: "#9da6b5",
        barThickness: 12,
        borderRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <MainLayout title={"Dashboard | FazzPay"}>
      <div className="row balance-row" style={{ height: "29%" }}>
        <div className="col-12 h-100">
          <div
            className="rounded shadow bg-primary px-4 py-3 d-flex justify-content-between align-items-center mb-3 mb-md-0"
            style={{ height: "85%" }}
          >
            <div>
              <p className="text-white mb-1">Balance</p>
              <h2 className="text-white fs-2 fw-bold mb-2">
                {currency.format(userData.balance)}
              </h2>
              <p className="text-white fs-7 opacity-75 m-0">
                {userData.noTelp}
              </p>
            </div>
            <div className="d-none d-md-flex flex-column justify-content-center align-items-stretch">
              <button
                type="button"
                className="btn btn-light dashboard__btn-white d-block border text-start px-4 mb-2"
                onClick={() => router.push("/transfer")}
              >
                <i className="bi bi-arrow-up text-white me-2"></i>Transfer
              </button>
              <button
                type="button"
                className="btn btn-light dashboard__btn-white d-block border text-start px-4"
                data-bs-toggle="modal"
                data-bs-target="#topupModal"
              >
                <i className="bi bi-plus-lg text-white me-2"></i>Topup
              </button>
            </div>
          </div>
          <div className="row gx-3 mb-3 d-flex d-md-none">
            <div className="col-6">
              <button
                type="button"
                className="btn bg-secondary bg-opacity-25 d-block text-center w-100 fw-semibold"
                onClick={() => router.push("/transfer")}
              >
                <i className="bi bi-arrow-up text-primary me-2"></i>Transfer
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn bg-secondary bg-opacity-25 d-block text-center w-100 fw-semibold"
                data-bs-toggle="modal"
                data-bs-target="#topupModal"
              >
                <i className="bi bi-plus-lg text-primary me-2"></i>Topup
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row stat-history-row" style={{ height: "71%" }}>
        <div className="col-md-7 h-100 order-2 order-md-1">
          <div className="bg-white rounded shadow px-4 py-3 h-100">
            <div className="row mb-3">
              <div className="col-6 px-3">
                <p className="fs-5 text-success mb-1">
                  <i className="bi bi-arrow-down"></i>
                </p>
                <p className="mb-1 fw-semibold">Income</p>
                <p className="fs-5 fw-bold text-success">
                  {currency.format(dashboardData.totalIncome)}
                </p>
              </div>
              <div className="col-6 px-3">
                <p className="fs-5 text-danger mb-1">
                  <i className="bi bi-arrow-up"></i>
                </p>
                <p className="mb-1 fw-semibold">Expense</p>
                <p className="fs-5 fw-bold text-danger">
                  {currency.format(dashboardData.totalExpense)}
                </p>
              </div>
            </div>
            <div style={{ height: "auto" }}>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <div className="col-md-5 h-100 mb-4 mb-md-0 order-1 order-md-2">
          <div className="bg-white rounded shadow px-4 pt-3 pb-1 h-100 overflow-hidden">
            <div className="mb-4 d-flex justify-content-between align-items-start">
              <h2 className="fs-5 fw-bold">Transaction History</h2>
              <Link href="/history">
                <a className="text-primary fw-semibold">See all</a>
              </Link>
            </div>
            {histories.map((history) => (
              <div key={history.id}>
                <HistoryCard data={history} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
