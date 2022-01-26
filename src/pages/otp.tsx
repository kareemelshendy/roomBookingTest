import Layout from "../components/layout/layout";
import { OTPHOC } from "../hoc/otp-hoc/otp-hoc";

const OTP = () => {
  return (
    <Layout title="كود التحقق">
      <OTPHOC />
    </Layout>
  );
};

export default OTP;
