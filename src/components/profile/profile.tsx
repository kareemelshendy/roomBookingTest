import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useRooms } from "../../hooks/use-rooms.hook";
import { Owner, Room, RoomPage } from "../../models";
import { useCurrentUser } from "../../slices/authSlice";
import { RootState } from "../../store/store";
import { Button } from "../button/button";
import { Card } from "../card/card";
import { ProfileBackGround } from "../profile-backgreound/profile-background";
import { ProfileImage } from "../profileImage/profile-image";
import { RoomsGrid } from "../rooms-grid/rooms-grid";
import styles from "./profile.module.scss";
import { useSWRConfig } from "swr";
import { Pagination } from "../pagination/pagination";
import { NoData } from "../no-data/no-data";
interface Props {
  user: Owner | undefined;
  fallbackPage: RoomPage;
  profileId: string;
}
export const ProfileComponent = ({ user, fallbackPage, profileId }: Props) => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { roomsPage, isLoading, isError } = useRooms(pageNumber, fallbackPage, profileId);
  const currentUser = useSelector(useCurrentUser);

  return (
    <>
      <ProfileBackGround />
      <div className="container mb-3" dir="rtl">
        <div className="row">
          <div className={styles.profile_top}>
            <div className={styles.profile_container}>
              <ProfileImage width="160px" height="160px" src={user?.profileImage?.original ? user?.profileImage?.original : "/"} />
              <div className={styles.profile_content}>
                <h2 className={styles.profile_usename}>{user?.name} </h2>
                <p>
                  <i className="fas fa-door-open"></i>
                  {user?.roomCount} غرفة
                </p>
              </div>
            </div>
            {currentUser?._id === user?._id && (
              <div className={styles.button}>
                <Button
                  width="w-100"
                  btnBorderPrimary="btn-border-primary"
                  onClick={() => {
                    router.push(`/profile/${currentUser?._id}/edit`);
                  }}
                >
                  تعديل الحساب
                </Button>
              </div>
            )}
          </div>
        </div>

        {roomsPage?.data?.length === 0 && <NoData title="لا يوجد غرف" />}
        <div className="row mt-3">
          <RoomsGrid rooms={roomsPage?.data} />
        </div>
        {roomsPage?.data && roomsPage?.data?.length > 0 && <Pagination pageCount={roomsPage?.pageCount} />}
      </div>
    </>
  );
};
