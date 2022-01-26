import { GetServerSideProps } from "next";
import Layout from "../../components/layout/layout";
import { IncomingRequestHOC } from "../../hoc/incoming-requests-hoc/incoming-requests";
import nookies from "nookies";
import axios from "../../utils/axios";
import { ReservationsPage } from "../../models";
import { fetcher } from "../../utils/fetcher.utils";

interface Props {
  pending: ReservationsPage;
}

const IncomingRequests = ({ pending }: Props) => {
  console.log("pending.....", pending);
  return (
    <Layout title="الطلبات الواردة">
      <IncomingRequestHOC pendingRequests={pending} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const pageNumber = context.query.pageNumber;
  console.log(pageNumber);
  try {
    const pending = await fetcher(`/bookings/providers?limit=16&pageNumber=${pageNumber}&status=PENDING`, cookies.userToken);
    return {
      props: {
        pending,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export default IncomingRequests;
