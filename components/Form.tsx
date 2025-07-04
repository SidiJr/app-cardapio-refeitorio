import api from "@/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";

interface Option {
  label: string;
  value: string;
}

export interface Field<T> {
  name: keyof T;
  label: string;
  type?: "number" | "text" | "date" | "select";
  options?: Option[];
}

interface FormViewProps<T> {
  fields: Field<T>[];
  route: string;
  navigate: string;
}

export const BaseForm = <T extends Record<string, any>>({
  fields,
  route,
  navigate
}: FormViewProps<T>) => {
  const { id } = useLocalSearchParams() as { id?: string };
  const [formData, setFormData] = useState<Partial<T>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await api.get<T>(`${route}/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [route, id]);

  const handleChange = (name: keyof T, value: string) => {
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
        window.alert("Sucesso: Dados salvos com sucesso!");
         router.push(navigate as any);
      } else {
        window.alert("Erro: Resposta inesperada do servidor.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      window.alert("Erro: Não foi possível salvar os dados.");
    }
  };

  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <Input
          key={`input-${String(field.name)}`}
          label={field.label}
          value={formData[field.name]?.toString() || ""}
          onChangeText={(text) => handleChange(field.name, text)}
          type={field.type}
          options={field.options || []}
        />
      ))}

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
