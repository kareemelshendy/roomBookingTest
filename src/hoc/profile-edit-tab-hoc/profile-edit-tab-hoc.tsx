import { useRouter } from "next/router";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { OwnerCard } from "../../components/owner-card/owner-card";
import { useProfile } from "../../hooks/use-profile.hook";
import { Owner } from "../../models";
import { EditInformationHOC } from "../password-information-edit-hoc/information";
import { EditPasswordHOC } from "../password-information-edit-hoc/password";

export const EditProfileTabHOC = ({ fallbackUser }: { fallbackUser: Owner }) => {
  const [key, setKey] = useState("information");
  const router = useRouter();
  const profileId = router.query.profileId as string;
  const { user, isLoading, isError } = useProfile(profileId, fallbackUser);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;
  return (
    <>
      <div className="container mt-3">
        <h2 className="heading heading-bold heading-3  mb-3" dir="rtl">
          تعديل الحساب
        </h2>
        <div className="row">
          <div className="col-md-12">
            <div className="request__tap-container">
              <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k: any) => setKey(k)} className="requestTab shadow_sm">
                <Tab eventKey="information" title="البيانات الشخصية">
                  <EditInformationHOC user={user} />
                </Tab>
                <Tab eventKey="password" title="كلمة المرور">
                  <EditPasswordHOC />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
