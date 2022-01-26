import Image from "next/image";
import styles from "./profile-image.module.scss";
interface Props {
  width: string;
  height: string;
  src: string;
}
export const ProfileImage = ({ width, height, src }: Props) => {
  return <Image src={src ? src : "/"} width={width} height={height} objectFit="cover" alt="profile image" className={styles.image} />;
};
