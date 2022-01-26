import React from "react";
import Header from "../header/header";
import Head from "next/head";

export interface LayoutProps {
  children: React.ReactNode;
  title: string;
}
const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <main>{props.children}</main>
    </>
  );
};
export default Layout;
