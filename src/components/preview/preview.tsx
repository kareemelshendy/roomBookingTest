import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../slices/authSlice";
import { Button } from "../button/button";
import { ProfileBackGround } from "../profile-backgreound/profile-background";
import { ProfileImage } from "../profileImage/profile-image";
import { RoomDescription } from "../room-description/room-description";
import { SwiperComponent } from "../swiper/swiper";
import styles from "./preview.module.scss";
export const PreviewComponent = ({ showDisable, setShowDisable, handleDisable, showDelete, handleDelete, setShowDelete, room, deleteRoom }: any) => {
  const [buttons, setButtons] = useState(false);
  const router = useRouter();
  const currentUser = useSelector(useCurrentUser);
  // console.log(room);
  return (
    <>
      {currentUser ? (
        <>
          <ProfileBackGround />
          <div className="container mb-3" dir="rtl">
            <div className="row">
              <div className={styles.profile_top}>
                <div className={styles.profile_container}>
                  <ProfileImage src={room?.owner?.profileImage?.original} width="160px" height="160px" />
                  <div className={styles.profile_content}>
                    <h2 className={styles.profile_usename}>{room?.owner?.name}</h2>
                    <p>
                      <i className="fas fa-door-open"></i>
                      {room?.owner?.roomCount} غرفة
                    </p>
                  </div>
                </div>

                <div className={styles.buttons}>
                  <div className={styles.button}>
                    <Button
                      width="w-100"
                      btnBorderPrimary="btn-border-primary"
                      onClick={() => {
                        router.push(`/preview/${room?._id}/edit`);
                      }}
                    >
                      <i className="fas fa-pen"></i>
                      تعديل
                    </Button>
                  </div>
                  <div className={styles.button}>
                    <Button
                      width="w-100"
                      btnBorderDarkGrey="btn-border-darkGrey"
                      onClick={() => {
                        setShowDisable(true);
                      }}
                    >
                      <i className="fas fa-times-circle"></i>
                      تعطيل
                    </Button>
                  </div>
                  <div className={styles.button}>
                    <Button
                      width="w-100"
                      btnBorderDanger="btn-border-danger"
                      onClick={() => {
                        setShowDelete(true);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                      حذف
                    </Button>
                  </div>
                </div>
              </div>

              <div className={`${styles.content} mt-3`} dir="ltr">
                <SwiperComponent room={room} />
                <div className="mt-2" dir="rtl">
                  <div className={`shadow_sm ${styles.room}`}>
                    <RoomDescription room={room} buttons={buttons} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal show={showDisable} onHide={handleDisable} dialogClassName="disable">
            <Modal.Header closeButton>
              <Modal.Title>تعطيل خدمة الغرفة</Modal.Title>
            </Modal.Header>
            <Modal.Body>هل تريد تعطيل خدمة الغرفة بشكل مؤقت ؟</Modal.Body>
            <Modal.Footer>
              <div className="button">
                <Button width="w-100" btnBorderPrimary="btn-border-primary" onClick={handleDisable}>
                  تراجع
                </Button>
              </div>
              <div className="button">
                <Button btnPrimary="btn-primary" width="w-100" onClick={handleDisable}>
                  تعطيل
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          <Modal show={showDelete} onHide={handleDelete} dialogClassName="disable">
            <Modal.Header closeButton>
              <Modal.Title>حذف الغرفة</Modal.Title>
            </Modal.Header>
            <Modal.Body>هل تريد حذف الغرفة من قائمتك ؟</Modal.Body>
            <Modal.Footer>
              <div className="button">
                <Button width="w-100" btnBorderPrimary="btn-border-primary" onClick={handleDelete}>
                  تراجع
                </Button>
              </div>
              <div className="button">
                <Button
                  btnPrimary="btn-primary"
                  width="w-100"
                  onClick={() => {
                    handleDelete();
                    deleteRoom();
                  }}
                >
                  حذف
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col  d-flex flex-column  align-items-center justify-content-center ">
              <h2 className="heading heading-bold heading-primary mb-3">يجب تسجيل الدخول أولاً</h2>
              {/* <button className="btn btn-primary mt-2 pt-15">إلي تسجيل الدخول</button> */}
              <Button
                btnBorderPrimary="btn-border-primary"
                width="w-50"
                onClick={() => {
                  router.push("/auth");
                }}
              >
                <i className="fas fa-arrow-left me-1"></i>
                إلي تسجيل الدخول
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
