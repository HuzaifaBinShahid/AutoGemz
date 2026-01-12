import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface BidCountdownBannerProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export function BidCountdownBanner({
  hours = 1,
  minutes = 59,
  seconds = 59,
}: BidCountdownBannerProps) {
  const [time, setTime] = useState({ hours, minutes, seconds });

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BID CLOSE IN</Text>
      <View style={styles.timeContainer}>
        <View style={styles.timeBox}>
          <Text style={styles.timeValue}>{time.hours.toString().padStart(2, "0")}</Text>
          <Text style={styles.timeLabel}>HOURS</Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.timeValue}>{time.minutes.toString().padStart(2, "0")}</Text>
          <Text style={styles.timeLabel}>MINUTES</Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.timeValue}>{time.seconds.toString().padStart(2, "0")}</Text>
          <Text style={styles.timeLabel}>SECONDS</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginVertical: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  timeBox: {
    alignItems: "center",
  },
  timeValue: {
    fontSize: 32,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
