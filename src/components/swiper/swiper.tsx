import SwiperClass from "swiper/types/swiper-class";
import styles from "./swiper.module.scss";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ImageModel, Room } from "../../models";
import { Blurhash } from "react-blurhash";
SwiperCore.use([FreeMode, Navigation, Thumbs]);

export const SwiperComponent = ({ room }: { room: Room | undefined }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass>();
  const [isImageReady, setIsImageReady] = useState(false);
  return (
    <>
      <section>
        <Swiper slidesPerView={1} spaceBetween={30} loop={true} navigation className={`mySwiper`} dir="ltr" thumbs={{ swiper: thumbsSwiper }} controller={{ control: controlledSwiper }}>
          {room?.images?.map((image: ImageModel) => {
            return (
              <SwiperSlide key={image.placeholder}>
                <div className={styles.swiperImage}>
                  {image && (
                    <>
                      <Blurhash hash={image?.placeholder} width={"100%"} height={"100%"} />
                      <Image
                        src={image?.original ? image?.original : "/"}
                        layout="fill"
                        alt="cover image"
                        onLoad={() => {
                          setIsImageReady(true);
                        }}
                        className={isImageReady ? "imageReady" : "imageNotReady"}
                      />
                    </>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={room?.images.length} freeMode={true} watchSlidesProgress={true} className="mySwiper2">
          {room?.images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <div className={styles.control}>
                  {image && (
                    <>
                      <Blurhash hash={image?.placeholder} width={"100%"} height={"100%"} className="card_blurhash" />

                      <Image
                        src={image?.original ? image?.original : "/"}
                        layout="fill"
                        objectFit="cover"
                        alt="cover image"
                        onLoad={() => {
                          setIsImageReady(true);
                          // setTimeout(() => {}, 50000)
                        }}
                        className={isImageReady ? "imageReady" : "imageNotReady"}
                      />
                    </>
                  )}
                </div>{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
};
