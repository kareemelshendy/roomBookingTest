import { GetServerSideProps } from "next";
import Layout from "../components/layout/layout";
import { NotificationsHOC } from "../hoc/notifications-hoc/notifications-hoc";
import axios from "../utils/axios";
import nookies from "nookies";
import { NotificationsPage } from "../models";

const Notifications = ({ notificationsPage }: { notificationsPage: NotificationsPage }) => {

  console.log(notificationsPage)
  return (
    <Layout title="الإشعارات">
      <NotificationsHOC notificationsFallback={notificationsPage} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  console.log(cookies);
  try {
    const response = await axios.get(`/notifications`, {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    });

    const notificationsPage = response.data;

    return {
      props: {
        notificationsPage,
      },
    };
  } catch (error) {
    // console.log(error);
    return {
      props: {},
    };
  }
};

export default Notifications;
