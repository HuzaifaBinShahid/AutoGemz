import React, { useState } from "react";
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "../../hooks/use-color-scheme";
import DropdownArrow from "../../components/ui/svgs/DropdownArrow";

interface DropdownProps {
  placeholder: string;
  options?: string[];
  value?: string;
  onSelect?: (value: string) => void;
  customIcon?: React.ReactNode;
}

export function Dropdown({ placeholder, options = [], value, onSelect, customIcon }: DropdownProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect?.(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownRow}>
        <TouchableOpacity
          style={[styles.dropdown, isDark && styles.dropdownDark]}
          onPress={() => setIsOpen(true)}
        >
          <Text
            style={[
              styles.text,
              isDark && styles.textDark,
              !value && styles.placeholder,
              !value && isDark && styles.placeholderDark,
            ]}
          >
            {value || placeholder}
          </Text>
        </TouchableOpacity>
        {customIcon ? (
          <TouchableOpacity style={styles.iconButton} onPress={() => setIsOpen(true)}>
            {customIcon}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.iconButton} onPress={() => setIsOpen(true)}>
            <DropdownArrow backgroundColor={value ? "#DC3729" : undefined} />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.optionsContainer, isDark && styles.optionsContainerDark]}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  index === 0 && styles.firstOption,
                  index === options.length - 1 && styles.lastOption,
                ]}
                onPress={() => handleSelect(option)}
              >
                <Text style={[styles.optionText, isDark && styles.optionTextDark]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  dropdownRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: "center",
  },
  dropdownDark: {
    backgroundColor: "#FFFFFF0D",
    borderWidth: 1,
    borderColor: "#393939",
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  textDark: {
    color: "#FFFFFF",
  },
  placeholder: {
    color: "#ABABAB",
  },
  placeholderDark: {
    color: "#FFFFFFB2",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    minWidth: 200,
    maxHeight: 300,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  optionsContainerDark: {
    backgroundColor: "#111111",
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  firstOption: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  lastOption: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  optionTextDark: {
    color: "#FFFFFF",
  },
});

