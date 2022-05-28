import React from "react";
import Head from "next/head";

export default function AuthLayout(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <main>{props.children}</main>
    </>
  );
}
