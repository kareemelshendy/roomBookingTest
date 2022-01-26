import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import { FavoriteHOC } from "../../hoc/favorite-hoc/favorite-hoc";
import { Owner, Room } from "../../models";
import axios from "../../utils/axios";
import { fetcher } from "../../utils/fetcher.utils";
import nookies from "nookies";

const Favorite = ({ user }: { user: Owner }) => {
  const router = useRouter();
  const profileId = router.query.profileId as string;

  return (
    <Layout title="المفضلات">
      {" "}
      <FavoriteHOC profileId={profileId} fallbackUser={user} />{" "}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  try {
    const user = await fetcher("/users/profile", cookies.userToken);
    return {
      props: {
        user,
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
export default Favorite;
