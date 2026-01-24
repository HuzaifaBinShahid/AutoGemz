import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CodeInput } from "./CodeInput";

interface CodeInputGroupProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export function CodeInputGroup({ length = 6, onComplete }: CodeInputGroupProps) {
  const [codes, setCodes] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(any)[]>([]);

  const handleChange = (index: number, text: string) => {
    if (text.length > 1) {
      text = text.slice(-1);
    }

    const newCodes = [...codes];
    newCodes[index] = text;
    setCodes(newCodes);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newCodes.join("");
    if (fullCode.length === length && onComplete) {
      onComplete(fullCode);
    }
  };

  const handleKeyPress = (index: number) => (e: any) => {
    if (e.nativeEvent.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <CodeInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          value={codes[index]}
          onChangeText={(text) => handleChange(index, text)}
          onKeyPress={handleKeyPress(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 24,
  },
});

