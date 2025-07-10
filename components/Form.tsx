import api from "@/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import Toast from "react-native-toast-message";

interface Option {
  label: string;
  value: string;
}

export interface Field<T> {
  name: keyof T;
  label: string;
  type?: "number" | "text" | "date" | "select";
  options?: Option[];
  multiple?: boolean;
}

interface FormViewProps<T> {
  fields: Field<T>[];
  route: string;
  navigate: string;
}

export const BaseForm = <T extends Record<string, any>>({
  fields,
  route,
  navigate,
}: FormViewProps<T>) => {
  const { id } = useLocalSearchParams() as { id?: string };
  const [formData, setFormData] = useState<Partial<T>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await api.get(`${route}/${id}`);
        let data = response.data;
        if (
          Array.isArray(data.pratos) &&
          data.pratos.length &&
          typeof data.pratos[0] === "object"
        ) {
          data.pratos = data.pratos.map((p: any) => String(p.id));
        }
        setFormData(data);
      }
    };
    fetchData();
  }, [route, id]);

  const handleChange = (name: keyof T, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = id
        ? await api.put(`${route}/${id}`, formData)
        : await api.post(route, formData);

      if ([200, 201].includes(response.status)) {
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Dados salvos com sucesso!",
        });
        router.push(navigate as any);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Resposta inesperada do servidor.",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível salvar os dados.",
      });
    }
  };

  return (
    <View style={styles.container}>
      {fields.map((field) => {
        let value: string | string[] = "";
        if (field.multiple) {
          const v = formData[field.name];
          if (Array.isArray(v)) value = v.map(String);
          else if (typeof v === "string") value = [v];
          else value = [];
        } else {
          value =
            formData[field.name] !== undefined
              ? String(formData[field.name])
              : "";
        }
        return (
          <Input
            key={`input-${String(field.name)}`}
            label={field.label}
            value={value}
            onChangeText={(text) => handleChange(field.name, text)}
            type={field.type}
            options={field.options || []}
            multiple={field.multiple}
          />
        );
      })}

      <CustomButton onPress={handleSubmit} style={styles.button}>
        {id ? "Atualizar" : "Salvar"}
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  button: {
    marginTop: 16,
  },
});
