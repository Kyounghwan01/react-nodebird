import React from "react";
import AppLayout from "./components/AppLayout";
import Head from "next/head";

export default function profile() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>프로필 페이지</AppLayout>
    </>
  );
}

// pages 페이지 별로, 컴포넌트와 1:1 매칭해준다.
