import { useRouter } from "next/router";
import { ProfileComponent } from "../../components/profile/profile";
import { useProfile } from "../../hooks/use-profile.hook";
import { Owner, RoomPage } from "../../models";

interface Props {
  profileId: string;
  fallbackUser: Owner;
  fallbackPage: RoomPage;
}
export const ProfileHOC = ({ profileId, fallbackUser, fallbackPage }: Props) => {
  const { user, isLoading, isError } = useProfile(profileId, fallbackUser);

  if (isError) return <div>حدث خطئ ما</div>;
  if (isLoading) return <div>isLoading...</div>;
  return (
    <>
      <ProfileComponent user={user} fallbackPage={fallbackPage} profileId={profileId} />
    </>
  );
};
