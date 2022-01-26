import styles from "./card.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Room } from "../../models";
import GeoCode from "react-geocode";
import { Blurhash } from "react-blurhash";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { useCurrentUser } from "../../slices/authSlice";
import { useSWRConfig } from "swr";
interface Props {
  room: Room;
  id: string | null;
}
export const Card = ({ room, id }: Props) => {
  const [fav, setfav] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);
  const router = useRouter();
  const user = useSelector(useCurrentUser);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (room?.isFavourite) {
      setfav(true);
    }
  }, [room?.isFavourite]);
  return (
    <div className={styles.card_container} dir="ltr">
      <button
        className={fav ? `${styles.heart} ${styles.heart_fav} ` : styles.heart}
        onClick={async () => {
          const response = await axios.patch(`users/favourites/${room._id}`);
          console.log(response.data);
          setfav(!fav);
          mutate(`/users/profile`);
        }}
      >
        <i className="fas fa-heart"></i>
      </button>

      <Link href={user?._id === room?.owner?._id ? `/preview/${room._id}` : router.pathname === "/reservations" ? `/reservations/${id}/details` : `/rooms/${room._id}`}>
        <a className={`heading-dark  `}>
          <div className={`card ${styles.card} shadow_sm `}>
            <div className={`${styles.card_top}`}>
              {room?.images[0] && (
                <>
                  <Blurhash hash={room?.images[0]?.placeholder} width={"100%"} height={"100%"} className={`card-img-top ${styles.card_blurhash}`} />

                  <Image
                    src={room?.images[0] ? room?.images[0]?.original : "/"}
                    className={` ${styles.card_img} ${isImageReady ? "imageReady" : "imageNotReady"}  `}
                    layout="fill"
                    alt={room.name}
                    onLoad={() => {
                      setIsImageReady(true);
                      // console.log("iamge is loaded")
                      // setTimeout(() => {}, 2000)
                    }}
                  />
                </>
              )}
            </div>

            <div className={`card-body ${styles.card_body}`}>
              <div className={styles.info}>
                <div className={`shadow_sm ${styles.users}`}>
                  <h5>{room.capacity}</h5>
                  <i className="fas fa-user"></i>
                </div>
                <div className={`shadow_sm ${styles.price}`}>
                  <h5>{room.nightPrice} L.E</h5>
                </div>
              </div>

              <h4 className={`heading-5 heading-bold heading-dark ${styles.title}`}>{room.name}</h4>

              <div className={styles.location}>
                {/* <p className={`card-text ${styles.card_text}`}>{room.location}</p> */}
                <i className="fas fa-map-marker-alt"></i>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
