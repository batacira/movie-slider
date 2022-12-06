import { FormEvent, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { signIn } = useAppContext();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setUserError("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
      if (
        error.message.includes("user-not-found") ||
        error.message.includes("invalid-email")
      ) {
        setUserError("User not found");
      } else if (error.message.includes("wrong-password")) {
        setPasswordError("Wrong password");
      }
    }
  }

  return (
    <div className={styles.loginModal}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <p className={styles.label}>Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className={styles.error}>{userError} &nbsp;</p>
        <p className={styles.label}>Password</p>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={styles.error}>{passwordError} &nbsp;</p>
        <button>Submit</button>
      </form>
    </div>
  );
}
