import Image from "next/image";
import { Conversations } from "../../components/chat/conversations/conversations";
import { MessagesBox } from "../../components/chat/messages-box/messages-box";
import styles from "./chat-hoc.module.scss";

export const ChatHOC = () => {
  return (
    <section>
      <div className="container mt-3 mb-3" dir="rtl">
        <h2 className=" heading heading-bold heading-secondary heading-3 mb-3">المحادثات</h2>
        <div className="row">
          <div className={` col-md-12 ${styles.chat_container} shadow_sm`}>
            <Conversations />
            <MessagesBox />
          </div>
        </div>
      </div>
    </section>
  );
};
