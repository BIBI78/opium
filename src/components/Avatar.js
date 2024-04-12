import styles from "../styles/Avatar.module.css";
import defaultProfileImage from "../assets/defaultpic.jpg";

const Avatar = ({ src, height = 45, text }) => {
  if (src) {
    if (src.includes("default") && src.includes("/v1")) {
      src = src.replace("/v1/", "/v1712922538/")
    }
  }

  return (
    <span>
      <img
        className={styles.Avatar}
        src={src || defaultProfileImage}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
