import DeleteIcon from "../../components/ui/svgs/DeleteIcon";
import EditIcon from "../../components/ui/svgs/EditIcon";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CarDetailsCardProps {
  image: any;
  title: string;
  description: string;
  make: string;
  year: string;
  transmission: string;
  model: string;
  mileage: string;
  registration: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CarDetailsCard({
  image,
  title,
  description,
  make,
  year,
  transmission,
  model,
  mileage,
  registration,
  onEdit,
  onDelete,
}: CarDetailsCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} contentFit="cover" />
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <View style={styles.redLine} />
            <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={1}>
              {title}
            </Text>
          </View>
          <View style={styles.actionIcons}>
            <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
              <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
              <DeleteIcon />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.description, isDark && styles.descriptionDark]}>
          {description}
        </Text>
        <View style={[styles.table, isDark && styles.tableDark]}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.borderRight, styles.borderBottom]}>
              <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>Make</Text>
              <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>{make}</Text>
            </View>
            <View style={[styles.tableCell, styles.borderRight, styles.borderBottom]}>
              <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>Year</Text>
              <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>{year}</Text>
            </View>
            <View style={[styles.tableCell, styles.borderBottom]}>
              <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>Transmission</Text>
              <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>{transmission}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.borderRight]}>
              <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>Model</Text>
              <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>{model}</Text>
            </View>
            <View style={[styles.tableCell, styles.borderRight]}>
              <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>Mileage</Text>
              <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>{mileage}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>Registration</Text>
              <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>{registration}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.divider, isDark && styles.dividerDark]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  imageContainer: {
    padding: 12,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 4,
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  redLine: {
    width: 2,
    height: 16,
    backgroundColor: "#DC3729",
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    flex: 1,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  actionIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 16,
    lineHeight: 20,
  },
  descriptionDark: {
    color: "#FFFFFF",
  },
  table: {
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
  },
  tableDark: {
    backgroundColor: "#1A1A1A",
    borderColor: "#494949",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 12,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: "#E5E5E5",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  tableLabel: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 4,
  },
  tableLabelDark: {
    color: "#FFFFFF",
  },
  tableValue: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  tableValueDark: {
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#737779",
    marginTop: 16,
  },
  dividerDark: {
    backgroundColor: "#737779",
  },
});
