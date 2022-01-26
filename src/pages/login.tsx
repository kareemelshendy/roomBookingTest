import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { LoginHOC } from "../hoc/login-hoc/login-hoc";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>تسجيل الدخول</title>
      </Head>
      <LoginHOC />
    </>
  );
};

export default Login;
