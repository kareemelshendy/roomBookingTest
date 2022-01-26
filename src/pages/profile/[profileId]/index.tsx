import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/layout";

import { ProfileHOC } from "../../../hoc/profile-hoc/profile-hoc";
import { Owner, RoomPage } from "../../../models";
import axios from "../../../utils/axios";
import { fetcher } from "../../../utils/fetcher.utils";

interface Props {
  user: Owner;
  roomsPage: RoomPage;
}
const Profile = ({ user, roomsPage }: Props) => {
  const router = useRouter();
  const profileId = router.query.profileId as string;

  return (
    <Layout title="الصفحة الشخصية">
      <ProfileHOC profileId={profileId} fallbackPage={roomsPage} fallbackUser={user} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const profileId = context.query.profileId;
  const pageNumber = context.query.pageNumber;
  try {
    const user = await fetcher(`/users/${profileId}`);
    const roomsPage = await fetcher(`/rooms?owners=${profileId}&pageNumber=${pageNumber}`);
    return {
      props: {
        user,
        roomsPage,
      },
    };
  } catch (error) {
    return {
      props: {
        user: {},
        roomsPage: {},
      },
    };
  }
};

export default Profile;
