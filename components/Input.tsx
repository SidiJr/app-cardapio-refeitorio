import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: "text" | "number" | "date" | "select";
  options?: { label: string; value: string }[];
} & TextInputProps;

export default function Input({
  label,
  value,
  onChangeText,
  type = "text",
  options = [],
  ...props
}: InputProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {type === "date" ? (
        <>
          <input
            type="date"
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            style={styles.input as any}
          />
        </>
      ) : type === "number" ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          {...props}
        />
      ) : type === "select" ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={value}
            onValueChange={onChangeText}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma opção" value="" />
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="default"
          {...props}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
