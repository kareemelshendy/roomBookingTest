import { profile } from "console";
import { GetServerSideProps } from "next";
import Layout from "../../../../components/layout/layout";
import { EditProfileTabHOC } from "../../../../hoc/profile-edit-tab-hoc/profile-edit-tab-hoc";
import { Owner } from "../../../../models";
import axios from "../../../../utils/axios";

const EditInformation = ({ user }: { user: Owner }) => {
  return (
    <Layout title="تعديل الصفحة الشخصية">
      <EditProfileTabHOC fallbackUser={user} />
    </Layout>
  );
};

export default EditInformation;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const profileId = context?.params?.profileId as string;

  try {
    const response = await axios.get(`/users/${profileId}`);
    const user = response.data;

    return {
      props: {
        user: user,
      },
    };
  } catch (error) {
    return {
      props: {
        user: {},
      },
    };
  }
};
