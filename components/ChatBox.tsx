import { colors } from "@/assets/styles/variables";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  avatar: ImageSourcePropType;
  name: string;
  time: string;
  message: string;
  badges?: string[];
  onPress?: () => void;
};

const ChatBox: React.FC<Props> = ({
  avatar,
  name,
  time,
  message,
  badges,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 20 }}>
      <View style={styles.chatBox}>
        <View style={styles.imageContainer}>
          <Image
            source={avatar}
            style={styles.image}
            alt={name}
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoTop}>
            <Text style={styles.infoTopTextLeft}>{name}</Text>
            <Text style={styles.infoTopTextRight}>{time}</Text>
          </View>
          <View style={styles.infoBottom}>
            <Text numberOfLines={2} style={styles.infoBottomTextLeft}>
              {message}
            </Text>
            {badges && (
              <View style={styles.infoBottomRight}>
                {badges.map((badge, i) => (
                  <View style={styles.infoBottomBadge} key={i}>
                    <Text style={styles.infoBottomBadgeText}>{badge}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatBox: {
    gap: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  imageContainer: {
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  infoTop: {
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  infoTopTextLeft: {
    fontSize: 15,
    fontFamily: "inter-medium",
    lineHeight: 18,
    letterSpacing: -0.1,
    color: "#ffffff",
  },
  infoTopTextRight: {
    fontSize: 13,
    lineHeight: 16,
    color: colors.secondary,
    fontFamily: "inter-regular",
  },
  infoBottom: {
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  infoBottomTextLeft: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    color: colors.secondary,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.6,
    fontFamily: "inter-regular",
  },
  infoBottomRight: {
    flexShrink: 0,
    gap: 4,
    flexDirection: "row",
  },
  infoBottomBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 4,
    backgroundColor: colors.primaryBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  infoBottomBadgeText: {
    color: "#ffffff",
    fontSize: 13,
    lineHeight: 14,
    fontFamily: "inter-regular",
    textAlign: "center",
    includeFontPadding: false,
  },
});

export default ChatBox;
