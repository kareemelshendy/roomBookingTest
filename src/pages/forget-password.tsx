import Layout from "../components/layout/layout";
import { ForgetPasswordHOC } from "../hoc/forget-password-hoc/forget-password-hoc";

const ForgetPassword = () => {
  return (
    <Layout title="نسيت كلمة السر">
      <ForgetPasswordHOC />
    </Layout>
  );
};

export default ForgetPassword;
