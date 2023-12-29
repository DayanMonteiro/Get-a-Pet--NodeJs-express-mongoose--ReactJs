import React, { useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./Input";
import Select from "./Select";

function PetForm({ handleSubmit, petData, btnText }) {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];
  // gambiarra pq n funciona com process.env
  const REACT_APP_API = "http://localhost:5000";

  function onFileChange(e) {
    // console.log(Array.from(e.target.files));
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  }

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  function handleColor(e) {
    setPet({
      ...pet,
      color: e.target.options[e.target.selectedIndex].text,
    });
  }

  const submit = (e) => {
    e.preventDefault();
    //  console.log("cadastro de pet", pet);
    handleSubmit(pet);
  };

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {(preview.length > 0 ? preview : pet.images || []).map(
          (image, index) => (
            <img
              src={
                preview.length > 0
                  ? URL.createObjectURL(image)
                  : `${REACT_APP_API}/images/pets/${image}`
              }
              alt={pet.name}
              key={`${pet.name}+${index}`}
            />
          )
        )}
      </div>
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={pet.name || ""}
      />
      <Input
        text="Idade do Pet"
        type="number"
        name="age"
        placeholder="Digite a idade"
        handleOnChange={handleChange}
        value={pet.age || ""}
      />
      <Input
        text="Descrição do Pet"
        type="text-area"
        name="description"
        placeholder="Digite uma breve descrição do pet"
        handleOnChange={handleChange}
        value={pet.description || ""}
      />
      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso aproximado"
        value={pet.weight || ""}
        handleOnChange={handleChange}
      />
      <Select
        name="color"
        text="Selecione a categoria"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}

export default PetForm;
