import { FavoriteComponent } from "../../components/favorite/favorite";
import { useFav } from "../../hooks/use-fav.hook";
import { useProfile } from "../../hooks/use-profile.hook";
import { Owner, Room } from "../../models";

interface Props {
  fallbackUser: Owner;
  profileId: string;
}

export const FavoriteHOC = ({ fallbackUser, profileId }: Props) => {
  // const { user, isLoading, isError } = useProfile(profileId, fallbackUser);
  const { fav, isLoading } = useFav(fallbackUser);

  return <FavoriteComponent rooms={fav} isLoading={isLoading} />;
};
