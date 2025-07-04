import React from "react";
import { BaseForm, Field } from "@/components/Form";

interface Meal {
  id: number;
  nome: string;
  codigo: string;
}

export const FormMeal = () => {
  const fields: Field<Meal>[] = [
    { name: "nome", label: "Nome", type: "text" },
    { name: "codigo", label: "Código", type: "text" },
  ];

  return <BaseForm<Meal> fields={fields} route="prato" navigate="/meals"/>;
};

export default FormMeal;
