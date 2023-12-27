import api from "../../../utils/api";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./AddPet.module.css";

import PetForm from "../../form/PetForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function AddPet() {
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
        <PetForm btnText="Cadastrar Pet" />
      </div>
    </section>
  );
}

export default AddPet;
