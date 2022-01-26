import styles from "./room.module.scss";

import { Button } from "../button/button";
import { ProfileImage } from "../profileImage/profile-image";
import { SwiperComponent } from "../swiper/swiper";
import { RoomDescription } from "../room-description/room-description";
import { OwnerCard } from "../owner-card/owner-card";
import { Room } from "../../models";
import Link from "next/link";

// install Swiper modules
// SwiperCore.use()
export interface RoomProps {
  room: Room | undefined;
  isLoading: boolean;
}

export const RoomComponent = ({ room, isLoading }: RoomProps) => {
  // console.log("isLoading", isLoading)
  if (isLoading) return <div>Loading</div>;
  console.log(room);
  return (
    <>
      <section>
        <div className="container mt-3 mb-3">
          <div className="row">
            <div className="col">
              <SwiperComponent room={room} />
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="col-lg-9 ">
            <div className={` shadow_sm ${styles.room}`} dir="rtl">
              <RoomDescription buttons={true} room={room} />
            </div>
          </div>
          <div className="col-lg-3 ">
            <OwnerCard owner={room?.owner} />
          </div>
        </div>
      </div>
    </>
  );
};
