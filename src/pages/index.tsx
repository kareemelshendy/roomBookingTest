import Layout from "../components/layout/layout";
import Head from "next/head";
import { HomeHOC } from "../hoc/home-hoc/home-hoc";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { RoomPage } from "../models";
import axios from "../utils/axios";

import { parseCookies } from "nookies";

// import axios from "axios"

const Home = ({ roomsPage }: { roomsPage: RoomPage }) => {
  // console.log("fallback", roomsPage)
  return (
    <>
      <Layout title="الصفحة الرئيسية">
        <HomeHOC fallbackPage={roomsPage} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context.query);
  const pageNumber = context.query.pageNumber;
  try {
    const res = await axios.get(`/rooms?pageNumber=${pageNumber}&limit=16`);
    const rooms = res.data;
    return {
      props: {
        roomsPage: rooms,
      },
    };
  } catch {
    return {
      props: {
        roomsPage: {},
      },
    };
  }
};

export default Home;
