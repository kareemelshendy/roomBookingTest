import { GetServerSideProps } from "next";
import Layout from "../../components/layout/layout";
import { ReservationsHOC } from "../../hoc/reservations/reservations-hoc";

import axios from "../../utils/axios";
import nookies from "nookies";
import { ReservationsPage } from "../../models";
import { fetcher } from "../../utils/fetcher.utils";

interface Props {
  pending: ReservationsPage;
}

const Reservations = ({ pending }: Props) => {
  console.log("reservationPage", pending);
  return (
    <Layout title="حجوزاتي">
      <ReservationsHOC pending={pending} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const pageNumber = context.query.pageNumber;
  try {
    const pending = await fetcher(`/bookings/clients?limit=16&pageNumber=${pageNumber}&status=PENDING`, cookies.userToken);
    return {
      props: {
        pending,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default Reservations;
