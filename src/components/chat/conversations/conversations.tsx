import Image from "next/image"
import styles from "./conversations.module.scss"

export const Conversations = () => {
  return (
    <div className={`${styles.chat_right} `}>
      <form className={styles.search} action="">
        <div className={`form-group ${styles.group}`}>
          <label htmlFor="search" className={styles.label}>
            بحث
          </label>
          <input type="text" />
          <button type="submit" className={styles.search_button}>
            <i className="fas fa-search"></i>
          </button>
          <button type="button" className={styles.add_chat}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </form>

      <div className={styles.chat_conversations}>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status_active}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status_active}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status_active}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status_active}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
        <a className={styles.conversation}>
          <div className={styles.conversation_image}>
            <div className={styles.status_active}></div>
            <Image src="/person.jpg" width="51px" height="51px" objectFit="cover" alt="user profile image" />
          </div>
          <div className={styles.conversation_content}>
            <h4 className={styles.conversation_username}>محمد عبد القادر</h4>
            <p className={styles.conversation_message}>الغرفه كويسه و نضيفه عايز احجزها بعد ازن حضرتك</p>
          </div>
          <div className={styles.messages_Number}>
            <p>5</p>
          </div>
        </a>
      </div>
    </div>
  )
}
