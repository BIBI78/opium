import styles from "../styles/Avatar.module.css";
import defaultProfileImage from "../assets/defaultpic.jpg";

/**
 * Component for rendering avatars.
 * 
 * Renders an avatar image with optional text.
 */
const Avatar = ({ src, height = 45, text }) => {
  // Check if src is a default image and replace the version number
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

