import { GetServerSideProps } from "next";
import Layout from "../../../../components/layout/layout";
import { IncomingRequestDetailsHOC } from "../../../../hoc/request-reservations-details-tap-hoc/request-reservations-details-hoc";
import { Reservations } from "../../../../models";
import axios from "../../../../utils/axios";

const RequestDetails = ({ reservation }: { reservation: Reservations }) => {
  return (
    <Layout title="التفاصيل">
      <IncomingRequestDetailsHOC reservationFallback={reservation} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const requestid = context?.params?.requestid;

  try {
    const response = await axios(`/bookings/${requestid}
    `);
    const reservation = response.data;
    // console.log(reservation);
    return {
      props: {
        reservation,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export default RequestDetails;
