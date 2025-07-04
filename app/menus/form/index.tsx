import React from "react";
import { BaseForm, Field } from "@/components/Form";

enum TipoCardapio {
  Almoco = 0,
  Jantar = 1,
}

interface Menu {
  id: number;
  codigo: string;
  data_cardapio: Date;
  tipo_cardapio: number;
}

export const FormMenu = () => {
  const fields: Field<Menu>[] = [
  { name: "codigo", label: "Código", type: "text" },
  { name: "data_cardapio", label: "Data", type: "date" },
  { 
    name: "tipo_cardapio", 
    label: "Tipo do Cardápio", 
    type: "select",
    options: [
      { label: "Almoço", value: "0" },
      { label: "Janta", value: "1" }
    ]
  },
];

  return <BaseForm<Menu> fields={fields} route="cardapio" navigate="/menus"/>;
};

export default FormMenu;
