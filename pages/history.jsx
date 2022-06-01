import React from "react";
import Layout from "../components/Layout/MainLayout";
import HistoryCard from "../components/HistoryCard";
import cookies from "next-cookies";
import axiosServer from "../utils/axiosServer";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  try {
    const dataCookies = cookies(context);
    const params = context.query;
    const page = !params?.page ? 1 : params.page;
    const limit = !params?.limit ? 5 : params.limit;
    const filter = !params?.filter ? "" : params.filter;
    const result = await axiosServer.get(
      `/transaction/history?page=${page}&limit=${limit}&filter=${filter}`,
      {
        headers: {
          Authorization: `Bearer ${dataCookies.token}`,
        },
      }
    );
    return {
      props: {
        data: result.data.data,
        pagination: result.data.pagination,
        filter: filter,
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

export default function History(props) {
  const router = useRouter();

  const histories = props.data;
  const pagination = props.pagination;
  const filter = props.filter;

  const handleChangeFilter = (e) => {
    router.push(`/history?page=${pagination.page}&filter=${e.target.value}`);
  };

  const handlePagination = (e) => {
    router.push(
      `/history?page=${e.selected + 1}${filter ? `&filter=${filter}` : ""}`
    );
  };

  return (
    <Layout title={"Transaction History | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 overflow-hidden position-relative">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fs-5 fw-bold">Transaction History</h2>
          <select
            className="form-select bg-secondary bg-opacity-25 border-0 w-25"
            aria-label="transaction history filter"
            onChange={handleChangeFilter}
          >
            <option defaultValue={""} value="">
              -- Select Filter --
            </option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div className="scrollable-wrapper" style={{ height: "75%" }}>
          {histories.map((history) => (
            <div key={history.id}>
              <HistoryCard data={history} />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center position-absolute bottom-0 start-50 translate-middle-x">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pagination.totalPage}
            onPageChange={handlePagination}
            containerClassName={"pagination mb-4"}
            pageClassName={"page-item px-1"}
            pageLinkClassName={"page-link rounded"}
            previousClassName={"page-item visually-hidden"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item visually-hidden"}
            nextLinkClassName={"page-link"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            activeLinkClassName={"text-white shadow"}
          />
        </div>
      </div>
    </Layout>
  );
}
