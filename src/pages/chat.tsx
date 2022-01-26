import Layout from "../components/layout/layout";
import { ChatHOC } from "../hoc/chat-hoc/chat-hoc";

const Chat = () => {
  return (
    <Layout title="المحادثات">
      <ChatHOC />
    </Layout>
  );
};

export default Chat;
