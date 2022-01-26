import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Room } from "../../models";
import { Service } from "../../models/servcies.model";
import axios from "../../utils/axios";
import { BadgeComponent } from "../badge/badge";
import { Button } from "../button/button";

import { Map } from "../map/map";
import { ReadOnlyMap } from "../readOnlyMap/readOnlyMap";

import styles from "./room-description.module.scss";

export interface RoomDesc {
  buttons: boolean;
  room: Room | undefined;
}

export const RoomDescription = ({ buttons, room }: RoomDesc) => {
  const [fav, setfav] = useState(false);
  const router = useRouter();
  const { roomid } = router.query;

  useEffect(() => {
    if (room?.isFavourite) {
      setfav(true);
    }
  }, [room?.isFavourite]);

  return (
    <>
      <div className={styles.roomTop}>
        <h2 className="heading heading-bold heading-3">{room?.name}</h2>
        <div className={styles.titleContent}>
          <div className={styles.priceAndUser}>
            <div className={` ${styles.price}`}>
              <p>{room?.nightPrice}L.E</p>
            </div>
            <div className={`${styles.users}`}>
              <i className="fas fa-user"></i>
              <p>{room?.capacity}</p>
            </div>
          </div>

          {buttons && (
            <div className={styles.buttons}>
              <div className={styles.favButton}>
                <Button
                  btnBorderDarkGrey={fav ? "btn-border-danger" : "btn-border-darkGrey"}
                  width="w-100"
                  onClick={async () => {
                    const response = await axios.patch(`users/favourites/${room?._id}`);
                    console.log(response.data);
                    setfav(!fav);
                    // mutate(`/rooms?pageNumber=2&limit=16`);
                  }}
                >
                  <i className={`fas fa-heart ms-6`}></i>
                  المفضلة
                </Button>
              </div>

              <div className={styles.bookButton}>
                <Button
                  onClick={() => {
                    router.push(`/rooms/${roomid}/book`);
                  }}
                  btnPrimary="btn-primary"
                  width="w-100"
                  disabled={room?.busy}
                >
                  أحجز
                </Button>
              </div>

              {/* <button className="btn btn-primary w-100 border-r  ">احجز</button> */}
            </div>
          )}
        </div>
      </div>
      <div className={` mt-1 ${styles.details}`}>
        <h3 className="heading heading-bold heading-darkGrey">التفاصيل</h3>
        <p>{room?.description}</p>
      </div>

      <div className={`mt-1 ${styles.services}`}>
        <h3 className="heading heading-bold heading-darkGrey">الخدمات المقدمة</h3>
        <div className={styles.services_content}>
          {room?.services?.map((service: Service) => {
            return <BadgeComponent key={service._id} title={service.name} bg="bg-warning" icon={`${service.name}`} />;
          })}
          {/* <BadgeComponent title="واي فاي" bg="bg-warning" icon="fas fa-wifi" />
          <BadgeComponent title="تكييف" bg="bg-warning" icon="fas fa-snowflake" />
          <BadgeComponent title="مطبخ" bg="bg-warning" icon="fas fa-utensils" /> */}
        </div>
      </div>

      <div className={`mt-1 ${styles.location}`}>
        <h3 className="heading heading-bold heading-darkGrey">العنوان</h3>
        <div className={styles.map}>
          <ReadOnlyMap borderRadius="border-r" location={room?.location?.coordinates} />
          {/* <Map borderRadius="border-r" location={room?.location?.coordinates}/> */}
        </div>
      </div>
    </>
  );
};
