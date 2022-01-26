import { useRouter } from "next/router";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { OwnerCard } from "../../components/owner-card/owner-card";
import { useReservation } from "../../hooks/use-reservation.hook";
import { Reservations } from "../../models";
import { RequestDetailsHOC } from "../request-details-hoc/request-details-hoc";
import { RoomDetailsHOC } from "../room-details-hoc/room-details-hoc";

export const IncomingRequestDetailsHOC = ({ reservationFallback }: { reservationFallback: Reservations }) => {
  const [key, setKey] = useState("request-details");
  const router = useRouter();
  const reservationId = router.query.requestid as string;

  const { reservation, isLoading, isError } = useReservation(reservationId, reservationFallback);

  if (isLoading) return <div>...loading</div>;
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="request__tap-container">
              <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k: any) => setKey(k)} className="requestTab shadow_sm">
                <Tab eventKey="request-details" title="تفاصيل الطلب">
                  <RequestDetailsHOC reservation={reservation} />
                </Tab>
                <Tab eventKey="room-details" title="تفاصيل الغرف">
                  <RoomDetailsHOC reservation={reservation} />
                </Tab>
              </Tabs>

              {key === "room-details" && router.pathname === "/reservations/[requestid]/details" && (
                <div className="owner_card">
                  <OwnerCard owner={reservation?.provider} />
                </div>
              )}

              {key !== "room-details" && router.pathname === `/incoming-requests/[requestid]/details` && (
                <div className="owner_card">
                  <OwnerCard owner={reservation?.client} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
