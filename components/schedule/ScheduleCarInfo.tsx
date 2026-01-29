import { useColorScheme } from "../../hooks/use-color-scheme";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ThemedCalendarIcon from "../../components/ui/svgs/ThemedCalendarIcon";
import ThemedMeterIcon from "../../components/ui/svgs/ThemedMeterIcon";
import EditIcon from "../../components/ui/svgs/EditIcon";
import DeleteIcon from "../../components/ui/svgs/DeleteIcon";

interface ScheduleCarInfoProps {
  image: any;
  title: string;
  year: string;
  mileage: string;
  currentHighestBid: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ScheduleCarInfo({
  image,
  title,
  year,
  mileage,
  currentHighestBid,
  onEdit,
  onDelete,
}: ScheduleCarInfoProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [time, setTime] = useState({ hours: 0, minutes: 5, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  const timeDisplay = `${formatTime(time.hours)}D ${formatTime(time.minutes)}H ${formatTime(time.seconds)}S`;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} contentFit="cover" />
        <View style={styles.availableBadge}>
          <Text style={styles.availableText}>AVAILABLE</Text>
        </View>
      </View>

      <View style={styles.statusTimeContainer}>
        <LinearGradient
          colors={["rgba(220, 55, 41, 0.75)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)", "rgba(203, 61, 29, 0.55)", "rgba(220, 55, 41, 0.5)"]}
          locations={[0.03, 0.27, 0.74, 0.9059, 1.0]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.75, y: 1 }}
          style={styles.statusTimeGradient}
        >
          <Text style={styles.statusTimeText}>{timeDisplay}</Text>
        </LinearGradient>
      </View>

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <View style={styles.redLine} />
            <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={1}>
              {title}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={onEdit}>
              <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <DeleteIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <ThemedCalendarIcon />
            <Text style={[styles.infoText, isDark && styles.infoTextDark]}>{year}</Text>
          </View>
          <View style={styles.infoItem}>
            <ThemedMeterIcon />
            <Text style={[styles.infoText, isDark && styles.infoTextDark]}>{mileage}</Text>
          </View>
        </View>
        <Text style={[styles.bidText, isDark && styles.bidTextDark]}>
          CURRENT HIGHEST BID:  {currentHighestBid}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginBottom: 16,
    overflow: "hidden",
    padding: 12,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 16 / 9,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  availableBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#3EB549",
    paddingHorizontal: 12,
  },
  availableText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  details: {
    padding: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "black",
    fontWeight: "700",
  },
  infoTextDark: {
    color: "#FFFFFF",
  },
  bidText: {
    fontSize: 10,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  bidTextDark: {
    color: "#FFFFFF",
  },
  statusTimeContainer: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 12,
    overflow: "hidden",
    width: "100%",
  },
  statusTimeGradient: {
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTimeText: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
  },
});
