import api from "../../../utils/api";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./AddPet.module.css";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function AddPet() {
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <p>Formulário</p>
    </section>
  );
}

export default AddPet;
