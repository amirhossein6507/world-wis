import React from "react";
import styles from "./Button.module.css";
import { useNavigate } from "react-router";

function ButtonBack() {
  const navigate = useNavigate();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      className={`${styles.back} ${styles.btn}`}
    >
      &larr;Back
    </button>
  );
}

export default ButtonBack;
