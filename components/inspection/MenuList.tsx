import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RightArrow from "@/components/ui/svgs/RightArrow";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

interface MenuListProps {
  items: MenuItem[];
}

export function MenuList({ items }: MenuListProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {items.map((item, index) => (
        <View key={item.id}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={[styles.menuLabel, isDark && styles.menuLabelDark]}>
                {item.label}
              </Text>
            </View>
            <RightArrow />
          </TouchableOpacity>
          {index < items.length - 1 && (
            <View
              style={[
                styles.divider,
                isDark && styles.dividerDark,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginBottom: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  menuLabel: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  menuLabelDark: {
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginLeft: 16,
  },
  dividerDark: {
    backgroundColor: "#494949",
  },
});
