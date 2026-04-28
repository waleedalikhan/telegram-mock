import chevronIcon from "@/assets/icons/chevron-icon.png";
import headerCenterOne from "@/assets/images/header/header-center-1.png";
import headerCenterTwo from "@/assets/images/header/header-center-2.png";
import headerCenterThree from "@/assets/images/header/header-center-3.png";
import headerRight from "@/assets/images/header/header-right.png";
import { useSheet } from "@/hooks/useSheet";
import useNodes from "@/stores/nodes";
import { GlassView } from "expo-glass-effect";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const Header: React.FC = () => {
  const selectedNode = useNodes((state) => state.selectedNode);
  const { openSheet } = useSheet();
  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity
          style={styles.left}
          onPress={() => openSheet("nodes")}
        >
          <GlassView pointerEvents="none" style={styles.glassView} />
          <Image
            source={selectedNode?.avatar as ImageSourcePropType}
            alt="header left"
            style={styles.leftImg}
          />
          <Image
            source={chevronIcon}
            alt="chevron icon"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <View style={styles.centerImg}>
          <LinearGradient
            colors={["#01CA67", "#01A6F9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBox}
          />
          <Image source={headerCenterOne} alt="header center one" />
        </View>
        <View style={styles.centerImg}>
          <LinearGradient
            colors={["#01CA67", "#01A6F9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBox}
          />
          <Image source={headerCenterTwo} alt="header center one" />
        </View>
        <View style={styles.centerImgLast}>
          <LinearGradient
            colors={["#01CA67", "#01A6F9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBox}
          />
          <Image source={headerCenterThree} alt="header center one" />
        </View>
      </View>
      <TouchableOpacity style={styles.right}>
        <GlassView pointerEvents="none" style={styles.glassViewRight} />
        <Image
          source={headerRight}
          alt="header right"
          style={styles.rightImg}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    height: 54,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 4,
    position: "relative",
    width: 68,
    height: 44,
  },
  glassView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 68,
    height: 44,
    borderRadius: 22,
  },
  leftImg: {
    width: 36,
    height: 36,
  },
  chevronIcon: {
    marginRight: 6,
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
  },
  centerImg: {
    width: 28,
    height: 28,
    position: "relative",
    marginRight: -8,
  },
  gradientBox: {
    borderRadius: 17,
    position: "absolute",
    top: -3,
    left: -2.5,
    width: 34,
    height: 34,
  },
  centerImgLast: {
    width: 28,
    height: 28,
    position: "relative",
  },
  right: {
    width: 44,
    height: 44,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  glassViewRight: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  rightImg: {
    width: 36,
    height: 36,
  },
});

export default Header;
