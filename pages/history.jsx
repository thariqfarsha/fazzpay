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
    const limit = !params?.limit ? 10 : params.limit;
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
    pagination.page = 1;
    router.push(`/history?page=${pagination.page}&filter=${e.target.value}`);
  };

  const handlePagination = (e) => {
    router.push(
      `/history?page=${e.selected + 1}${filter ? `&filter=${filter}` : ""}`
    );
  };

  return (
    <Layout title={"Transaction History | FazzPay"}>
      <div className="main-card bg-white rounded shadow p-3 p-md-4 d-flex flex-column">
        <div className="mb-4 row justify-content-between align-items-center">
          <div className="col-md d-flex align-items-center mb-3 mb-md-0">
            <button
              className="btn px-1 py-0 me-2 d-block d-md-none"
              onClick={() => router.back()}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <h2 className="fs-5 fw-bold mb-0">Transaction History</h2>
          </div>
          <div className="col-md-3">
            <select
              className="form-select bg-secondary bg-opacity-25 border-0 w-100"
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
        </div>

        <div className="flex-grow-1 position-relative">
          <div className="scrollable-wrapper position-absolute top-0 bottom-0 start-0 end-0">
            {histories.map((history) => (
              <div key={history.id}>
                <HistoryCard data={history} />
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pagination.totalPage}
            onPageChange={handlePagination}
            containerClassName={"pagination mb-0 mt-3"}
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
