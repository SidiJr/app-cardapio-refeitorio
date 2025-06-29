import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";
import { Link, LinkProps } from "expo-router";

type RouteParams = Record<string, string>;

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  href?: LinkProps["href"] | string;
  params?: RouteParams;
};

export default function CustomButton({
  children,
  variant = "primary",
  size = "md",
  style,
  onPress,
  href,
  params,
}: ButtonProps) {
  const buttonStyles = {
    ...styles.base,
    ...styles[variant],
    ...styles[size],
    ...style,
  };

  // Se tiver href, renderiza como Link
  if (href) {
    const linkProps =
      typeof href === "string" ? { href: href as LinkProps["href"] } : { href };

    return (
      <Link {...linkProps} asChild>
        <TouchableOpacity style={buttonStyles}>
          <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
      </Link>
    );
  }

  // Botão normal
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 120,
  },
  primary: {
    backgroundColor: "#3b82f6",
  },
  secondary: {
    backgroundColor: "#f43f5e",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#64748b",
  },
  sm: {
    paddingVertical: 6,
    minHeight: 36,
  },
  md: {
    paddingVertical: 10,
    minHeight: 44,
  },
  lg: {
    paddingVertical: 14,
    minHeight: 52,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
