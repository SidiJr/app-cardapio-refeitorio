import React, { useEffect, useState } from "react";
import { BaseForm, Field } from "@/components/Form";
import api from "@/api";

enum TipoCardapio {
  Almoco = 0,
  Jantar = 1,
}

interface Menu {
  id: number;
  codigo: string;
  data_cardapio: Date;
  tipo_cardapio: number;
  pratos?: number[];
}

export const FormMenu = () => {
  const [pratoOptions, setPratoOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    api.get("/prato").then((res) => {
      setPratoOptions(
        res.data.map((prato: any) => ({
          label: prato.nome,
          value: prato.id.toString(),
        }))
      );
    });
  }, []);

  const fields: Field<Menu>[] = [
    { name: "codigo", label: "Código", type: "text" },
    { name: "data_cardapio", label: "Data", type: "date" },
    {
      name: "tipo_cardapio",
      label: "Tipo do Cardápio",
      type: "select",
      options: [
        { label: "Almoço", value: "0" },
        { label: "Janta", value: "1" },
      ],
    },
    {
      name: "pratos",
      label: "Pratos",
      type: "select",
      options: pratoOptions,
      multiple: true,
    },
  ];

  return <BaseForm<Menu> fields={fields} route="cardapio" navigate="/menus" />;
};

export default FormMenu;
