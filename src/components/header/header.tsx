import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { destroyCookie } from "nookies";
import { logout, useCurrentUser } from "../../slices/authSlice";
import { useNotificationsCount } from "../../hooks/use-notification-count.hook";
import { NotificationDropDown } from "../notifications-dropdown/notifocations-dropdown";

const Header = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const currentUser = useSelector(useCurrentUser);
  const token = useSelector((state: RootState) => state.auth.token);
  const [notiCount, setNotiCount] = useState(0);
  const dispatch = useDispatch();
  const { count } = useNotificationsCount();
  useEffect(() => {
    if (count) {
      setNotiCount(count);
    }
  }, [count]);

  function handleShow() {
    setShow(false);
  }
  return (
    <>
      <header className="sticky-top">
        {currentUser ? (
          <Navbar bg="white" expand="md" sticky="top" className="navbar shadow_sm">
            <Container className="flex-row-reverse">
              <Link href="/">
                <a className="navbar-brand">
                  <Image src="/Shape-header.png" width="51px" height="47px" objectFit="cover" alt="الصورة الشخصية" />
                </a>
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown
                    className="profile-dropdown"
                    title={
                      <div className="dropdown">
                        <div className="profile">
                          <Image src={currentUser?.profileImage ? currentUser?.profileImage?.thumbnail : "/"} width="47px" height="47px" objectFit="cover" className="dropdown-img" alt="" />
                          <p className="dropdown-text">
                            مرحبا {currentUser?.name}
                            <i className=" fas fa-chevron-down dropdown-down"></i>
                          </p>
                        </div>
                      </div>
                    }
                    id="basic-nav-dropdown"
                  >
                    <Link href={`/profile/${currentUser?._id}?pageNumber=1`}>
                      <a className="profile-item dropdown-item" role="link">
                        الملف الشخصي
                      </a>
                    </Link>
                    <Link href="/incoming-requests?pageNumber=1">
                      <a className="profile-item dropdown-item">الطلبات الواردة</a>
                    </Link>

                    <Link href="/reservations?pageNumber=1">
                      <a className="profile-item dropdown-item">حجوزاتي</a>
                    </Link>
                    <Link href={`/favourite`}>
                      <a className="profile-item dropdown-item">المفضلات</a>
                    </Link>
                    <NavDropdown.Item
                      className="profile-item"
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      تسجيل الخروج
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    className="notifications-dropdown"
                    title={
                      <div className="dropdown">
                        <div className="notifications">
                          <i className="fas fa-bell  icon"></i>
                          {notiCount > 0 && (
                            <div className="number">
                              <p>{notiCount}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    }
                    onClick={() => {
                      setNotiCount(0);
                    }}
                    id="basic-nav-dropdown"
                  >
                    <NotificationDropDown />
                  </NavDropdown>
                  <NavDropdown
                    className="chat-dropdown"
                    title={
                      <div className="dropdown">
                        <div className="chat">
                          <i className="fas fa-comment-dots icon"></i>
                          <div className="number">
                            <p>2</p>
                          </div>
                        </div>
                      </div>
                    }
                    id="basic-nav-dropdown"
                  >
                    <Link href="/chat">
                      <a className=" dropdown-item messages" dir="rtl">
                        <div className="messages-img">
                          <Image src="/person.jpg" width="47px" height="47px" objectFit="cover" alt="" className="image" />
                        </div>
                        <div className="chat-content">
                          <h3 className="username">محمد عبد القادر</h3>
                          <p
                            className="
                  message"
                          >
                            الغرفة كويسة ونضيفة عايز احجزها بعد اذنك ممكن استلمها امته
                          </p>
                        </div>

                        <div className="number">
                          <p>5</p>
                        </div>
                      </a>
                    </Link>
                    <Link href="/chat">
                      <a className=" dropdown-item messages" dir="rtl">
                        <div className="messages-img">
                          <Image src="/person.jpg" width="47px" height="47px" objectFit="cover" alt="" className="image" />
                        </div>
                        <div className="chat-content">
                          <h3 className="username">محمد عبد القادر</h3>
                          <p
                            className="
                  message"
                          >
                            الغرفة كويسة ونضيفة عايز احجزها بعد اذنك ممكن استلمها امته
                          </p>
                        </div>

                        <div className="number">
                          <p>5</p>
                        </div>
                      </a>
                    </Link>
                    <Link href="/chat">
                      <a className=" dropdown-item messages" dir="rtl">
                        <div className="messages-img">
                          <Image src="/person.jpg" width="47px" height="47px" objectFit="cover" alt="" className="image" />
                        </div>
                        <div className="chat-content">
                          <h3 className="username">محمد عبد القادر</h3>
                          <p
                            className="
                  message"
                          >
                            الغرفة كويسة ونضيفة عايز احجزها بعد اذنك ممكن استلمها امته
                          </p>
                        </div>

                        <div className="number">
                          <p>5</p>
                        </div>
                      </a>
                    </Link>
                    <Link href="/chat">
                      <a className=" dropdown-item messages" dir="rtl">
                        <div className="messages-img">
                          <Image src="/person.jpg" width="47px" height="47px" objectFit="cover" alt="" className="image" />
                        </div>
                        <div className="chat-content">
                          <h3 className="username">محمد عبد القادر</h3>
                          <p
                            className="
                  message"
                          >
                            الغرفة كويسة ونضيفة عايز احجزها بعد اذنك ممكن استلمها امته
                          </p>
                        </div>

                        <div className="number">
                          <p>5</p>
                        </div>
                      </a>
                    </Link>
                  </NavDropdown>
                  <Link href="/add-room">
                    <a className="heading-4 heading-bold heading-primary">إضافة غرفة +</a>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : (
          <Navbar bg="white" expand="md" sticky="top" className="navbar shadow_sm">
            <Container className="flex-row-reverse">
              <Link href="/">
                <Navbar.Brand>
                  <Image src="/Shape-header.png" width="51px" height="47px" objectFit="cover" alt="الصورة الشخصية" />
                </Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Link href="/create-account">
                    <a className="heading-4 heading-bold heading-primary create_account">إنشاء حساب</a>
                  </Link>
                  <Link href="/login">
                    <a className="heading-4 heading-bold heading-primary create_account">تسجيل دخول</a>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
      </header>

      <Modal show={show} onHide={handleShow} dialogClassName="disable">
        <Modal.Header closeButton>
          <Modal.Title>تسجيل الخروج</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل تريد تسجيل الخروج ؟</Modal.Body>
        <Modal.Footer>
          <div className="button">
            <Button btnBorderPrimary="btn-border-primary" width="w-100" onClick={handleShow}>
              تراجع
            </Button>
          </div>
          <div className="button">
            <Button
              btnPrimary="btn-primary"
              width="w-100"
              onClick={() => {
                router.push("/auth");
                dispatch(logout());
                destroyCookie(null, "userToken");
                setShow(false);
              }}
            >
              خروج
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
