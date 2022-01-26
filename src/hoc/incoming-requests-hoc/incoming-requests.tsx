import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ReservationsPage, Room } from "../../models";
import { AcceptedRequestHOC } from "../incoming-requests-status-hoc/accepted-hoc/accepted-request-hoc";
import { CancelledRequestHOC } from "../incoming-requests-status-hoc/cancelled-hoc/cancelled-request-hoc";
import { CompletedRequestHOC } from "../incoming-requests-status-hoc/completed-hoc/completed-request-hoc";
import { FinishedRequestHOC } from "../incoming-requests-status-hoc/finished-hoc/finished-request-hoc";
import { PendingRequestHOC } from "../incoming-requests-status-hoc/pending-hoc/pending-request-hoc";

interface Props {
  pendingRequests: ReservationsPage;
}

export const IncomingRequestHOC = ({ pendingRequests }: Props) => {
  const [key, setKey] = useState("pending");
  return (
    <>
      <div className="container mt-3">
        <h2 className="heading heading-bold heading-3 mb-2" dir="rtl">
          الطلبات الواردة
        </h2>
        <div className="row">
          <div className="col-md-12">
            <div className="reservations__tap-container">
              <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k: any) => setKey(k)} className="requestTab shadow_sm">
                <Tab eventKey="pending" title="قيد الإنتظار">
                  <PendingRequestHOC pendingRequests={pendingRequests} />
                </Tab>
                <Tab eventKey="accepted" title="موافق عليها">
                  <AcceptedRequestHOC />
                </Tab>
                <Tab eventKey="completed" title="مكتملة">
                  <CompletedRequestHOC />
                </Tab>
                <Tab eventKey="cancelled" title="ملغية">
                  <CancelledRequestHOC />
                </Tab>
                <Tab eventKey="finishid" title="مرفوضة">
                  <FinishedRequestHOC />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
