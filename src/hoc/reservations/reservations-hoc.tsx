import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useReservations } from "../../hooks/use-reservations.hook";
import { ReservationsPage, Room } from "../../models";
import { AcceptedReservationsHOC } from "../reservations-status-hoc/accepted-hoc/accepted-reservations-hoc";
import { CancelledReservationsHOC } from "../reservations-status-hoc/cancelled-hoc/cancelled-reservations-hoc";
import { CompletedReservationsHOC } from "../reservations-status-hoc/completed-hoc/completed-reservations-hoc";
import { FinishedReservationsHOC } from "../reservations-status-hoc/finished-hoc/finished-reservations-hoc";
import { PendingReservationsHOC } from "../reservations-status-hoc/pending-hoc/pending-reservations-hoc";

interface Props {
  pending: ReservationsPage;
}

export const ReservationsHOC = ({ pending }: Props) => {
  const [key, setKey] = useState("pending");
  return (
    <>
      <div className="container mt-3">
        <h2 className="heading heading-bold heading-3 mb-2" dir="rtl">
          حجوزاتي
        </h2>
        <div className="row">
          <div className="col-md-12">
            <div className="reservations__tap-container">
              <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k: any) => setKey(k)} className="requestTab shadow_sm">
                <Tab eventKey="pending" title="قيد الإنتظار">
                  <PendingReservationsHOC pendingFallback={pending} />
                </Tab>
                <Tab eventKey="accepted" title="موافق عليها">
                  <AcceptedReservationsHOC />
                </Tab>
                <Tab eventKey="completed" title="مكتملة">
                  <CompletedReservationsHOC />
                </Tab>
                <Tab eventKey="cancelled" title="ملغية">
                  <CancelledReservationsHOC />
                </Tab>
                <Tab eventKey="finishid" title="مرفوضة">
                  <FinishedReservationsHOC />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
