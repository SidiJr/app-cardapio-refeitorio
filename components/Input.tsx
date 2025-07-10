import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";

type InputProps = {
  label: string;
  value: string | string[];
  onChangeText: (text: string | string[]) => void;
  type?: "text" | "number" | "date" | "select";
  options?: { label: string; value: string }[];
  multiple?: boolean;
} & TextInputProps;

export default function Input({
  label,
  value,
  onChangeText,
  type = "text",
  options = [],
  multiple = false,
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
      ) : type === "select" && !multiple ? (
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChangeText(e.target.value)}
          style={
            {
              ...styles.input,
              height: 44,
              fontSize: 16,
              padding: 8,
            } as any
          }
        >
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "select" && multiple ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 8,
            backgroundColor: "#fff",
          }}
        >
          {options.map((option) => (
            <View
              key={option.value}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <input
                type="checkbox"
                checked={Array.isArray(value) && value.includes(option.value)}
                onChange={(e) => {
                  let newValue = Array.isArray(value) ? [...value] : [];
                  if (e.target.checked) {
                    newValue.push(option.value);
                  } else {
                    newValue = newValue.filter((v) => v !== option.value);
                  }
                  onChangeText(newValue);
                }}
                style={{ marginRight: 8 }}
              />
              <Text>{option.label}</Text>
            </View>
          ))}
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
