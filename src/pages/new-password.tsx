import Layout from "../components/layout/layout";
import { NewPasswordHOC } from "../hoc/new-password-hoc/new-password";

const NewPassword = () => {
  return (
    <Layout title="كلمة المرور الجديدة">
      <NewPasswordHOC />
    </Layout>
  );
};

export default NewPassword;
