import Image from "next/image"
import { SendMessageHOC } from "../../../hoc/send-message-hoc/send-message-hoc"
import { SendMessage } from "../send-message/send-message"
import styles from "./messages-box.module.scss"

export const MessagesBox = () => {
  return (
    <div className={styles.chat_box}>
      <div className={styles.header}>
        <h3 className={`heading-bold heading-5 heading-secondary  ${styles.username}`}>محمد سمير</h3>
      </div>
      <div className={styles.body}>
        <div className={styles.messages}>
          <div className={styles.message_reciver}>
            <div className={styles.message_info}>
              <div className={styles.image}>
                <Image src="/person.jpg" width="30px" height="30px" alt="صوره المرسل" objectFit="cover" />
              </div>
              <span className={styles.message_time}>
                10:35<span>am</span>
              </span>
            </div>
            <div className={`${styles.message_content} shadow_sm`}>
              <p>لو سمحت كنت عايز أأجر الغرفه بتاعتك 5 أيام ممكن تفاصيل أكتر ؟</p>
            </div>
          </div>

          <div className={styles.message_sender}>
            <div className={styles.message_info}>
              <div className={styles.image}>
                <Image src="/person.jpg" width="30px" height="30px" alt="صوره المرسل" objectFit="cover" />
              </div>
              <span className={styles.message_time}>
                10:35<span>am</span>
              </span>
            </div>
            <div className={`${styles.message_content} shadow_sm`}>
              <p>تمام هبعتلك صور ليها أكتر تتفرج عليها</p>
            </div>
          </div>
          <div className={styles.message_sender}>
            <div className={styles.message_info}>
              <div className={styles.image}>
                <Image src="/person.jpg" width="30px" height="30px" alt="صوره المرسل" objectFit="cover" />
              </div>
              <span className={styles.message_time}>
                10:35<span>am</span>
              </span>
            </div>
            <div className={`${styles.message_content} shadow_sm`}>
              <div className={styles.images}>
                <div className={styles.content_image}>
                  <Image src="/bedroom.jpg" width="60px" height="60px" alt='image' objectFit="cover" />
                </div>
                <div className={styles.content_image}>
                  <Image src="/bedroom.jpg" width="60px" height="60px" alt='image' objectFit="cover" />
                </div>
                <div className={styles.content_image}>
                  <Image src="/bedroom.jpg" width="60px" height="60px" alt='image' objectFit="cover" />
                </div>
                <div className={styles.content_image}>
                  <Image src="/bedroom.jpg" width="60px" height="60px" alt='image' objectFit="cover" />
                </div>

                <div className={styles.content_image}>
                  <Image src="/bedroom.jpg" width="60px" height="60px" alt='image' objectFit="cover" />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.message_reciver}>
            <div className={styles.message_info}>
              <div className={styles.image}>
                <Image src="/person.jpg" width="30px" height="30px" alt="صوره المرسل" objectFit="cover" />
              </div>
              <span className={styles.message_time}>
                10:35<span>am</span>
              </span>
            </div>
            <div className={`${styles.message_content} shadow_sm`}>
              <p>الغرفة كويسة ونضيفة عايز أحجزها بعد إذنك بكام اللليلة !</p>
            </div>
          </div>

          <div className={styles.message_reciver}>
            <div className={styles.message_info}>
              <div className={styles.image}>
                <Image src="/person.jpg" width="30px" height="30px" alt="صوره المرسل" objectFit="cover" />
              </div>
              <span className={styles.message_time}>
                10:35<span>am</span>
              </span>
            </div>
            <div className={`${styles.message_content} shadow_sm`}>
              <p>الغرفة كويسة ونضيفة عايز أحجزها بعد إذنك بكام اللليلة !</p>
            </div>
          </div>
          <div className={styles.message_reciver}>
            <div className={styles.message_info}>
              <div className={styles.image}>
                <Image src="/person.jpg" width="30px" height="30px" alt="صوره المرسل" objectFit="cover" />
              </div>
              <span className={styles.message_time}>
                10:35<span>am</span>
              </span>
            </div>
            <div className={`${styles.message_content} shadow_sm`}>
              <p>الغرفة كويسة ونضيفة عايز أحجزها بعد إذنك بكام اللليلة !</p>
            </div>
          </div>
          <div className={styles.message_reciver}>
            <div className={styles.message_info}>
              <div className={styles.image}>
                <Image src="/person.jpg" width="30px" height="30px" alt="صوره المرسل" objectFit="cover" />
              </div>
              <span className={styles.message_time}>
                10:35<span>am</span>
              </span>
            </div>
            <div className={`${styles.message_content} shadow_sm`}>
              <p>الغرفة كويسة ونضيفة عايز أحجزها بعد إذنك بكام اللليلة !</p>
            </div>
          </div>
          

          <span className={styles.isWriting}>محمد سمير يكتب الان ...</span>
        </div>

        <SendMessageHOC />
      </div>
    </div>
  )
}
