import api from "../../../utils/api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./AddPet.module.css";

import PetForm from "../../form/PetForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function AddPet() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerPet(pet) {
    let msgType = "success";

    const formData = new FormData();

    Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (const element of pet[key]) {
          formData.append("images", element);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .post("pets/create", formData, {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);

    if (msgType !== "error") {
      navigate("/pets/mypets");
    }
  }
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
        <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
      </div>
    </section>
  );
}

export default AddPet;
