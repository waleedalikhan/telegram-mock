import checkIcon from "@/assets/icons/check-icon.png";
import chevronIconGray from "@/assets/icons/chevron-icon-gray.png";
import deleteIcon from "@/assets/icons/delete-icon.png";
import editIcon from "@/assets/icons/edit-icon.png";
import { colors } from "@/assets/styles/variables";
import type { Node } from "@/stores/nodes";
import { useRef } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = Node & {
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isSelected?: boolean;
  onRowWillOpen?: (id: string | number | undefined, close: () => void) => void;
  isFirst?: boolean;
  isLast?: boolean;
};

type RightActionsProps = {
  drag: SharedValue<number>;
  onEdit?: () => void;
  onDelete?: () => void;
};

const RightActions: React.FC<RightActionsProps> = ({
  drag,
  onEdit,
  onDelete,
}) => {
  const animatedActionsStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          drag.value,
          [-116, 0],
          [0, 48],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(
      drag.value,
      [-58, -10, 0],
      [1, 0.8, 0.4],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <Animated.View style={[s.actions, animatedActionsStyle]}>
      <Pressable style={[s.actionBtn, s.editBtn]} onPress={onEdit}>
        <Image source={editIcon} alt="edit icon" style={s.actionBtnImg} />
      </Pressable>
      <Pressable style={[s.actionBtn, s.deleteBtn]} onPress={onDelete}>
        <Image source={deleteIcon} alt="delete icon" style={s.actionBtnImg} />
      </Pressable>
    </Animated.View>
  );
};

const NodeBar: React.FC<Props> = ({
  id,
  avatar,
  name,
  members,
  role,
  onPress,
  onEdit,
  onDelete,
  isSelected,
  onRowWillOpen,
  isFirst,
  isLast,
}) => {
  const swiperRef = useRef<any>(null);
  const isSwipingRef = useRef(false);
  const lastSwipeAtRef = useRef(0);

  const markSwipeDone = () => {
    lastSwipeAtRef.current = Date.now();
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 140);
  };

  const handleRowPress = () => {
    const wasRecentlySwiped = Date.now() - lastSwipeAtRef.current < 180;
    if (isSwipingRef.current || wasRecentlySwiped) {
      return;
    }
    onPress?.();
  };

  const renderRightActions = (_prog: any, drag: SharedValue<number>) => (
    <RightActions drag={drag} onEdit={onEdit} onDelete={onDelete} />
  );

  return (
    <Swipeable
      ref={swiperRef}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
      overshootRight={false}
      onSwipeableOpenStartDrag={() => {
        isSwipingRef.current = true;
      }}
      onSwipeableCloseStartDrag={() => {
        isSwipingRef.current = true;
      }}
      onSwipeableWillOpen={() => {
        isSwipingRef.current = true;
        onRowWillOpen?.(id, () => swiperRef.current?.close());
      }}
      onSwipeableOpen={markSwipeDone}
      onSwipeableClose={markSwipeDone}
    >
      <Pressable
        onPress={handleRowPress}
        style={[s.container, isFirst && s.first, isLast && s.last]}
      >
        <View style={s.left}>
          <View style={s.imgContainer}>
            <Image
              source={avatar as ImageSourcePropType}
              alt="avatar"
              style={s.img}
            />
          </View>
          <View style={s.leftContent}>
            <Text style={[s.name, isSelected ? s.active : s.inactive]}>
              {name}
            </Text>
            <View style={s.info}>
              {members && <Text style={s.infoText}>{members} members • </Text>}
              <Text style={s.infoText}>{role}</Text>
            </View>
          </View>
        </View>
        <View style={s.rightIcon}>
          <Image
            source={isSelected ? checkIcon : chevronIconGray}
            alt="chevron icon"
            style={[isSelected ? s.activeIcon : s.inactiveIcon]}
          />
        </View>
      </Pressable>
    </Swipeable>
  );
};

const s = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 10,
    paddingVertical: 6,
  },
  actionBtn: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  editBtn: {
    backgroundColor: "#3d3d42",
  },
  deleteBtn: {
    backgroundColor: "#ff3c3c",
  },
  actionBtnImg: {
    width: 20,
    height: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1C1C1E",
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 20,
  },
  first: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  last: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  imgContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: "hidden",
  },
  img: {
    width: 40,
    height: 40,
  },
  leftContent: {
    gap: 4,
  },
  name: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.1,
    fontFamily: "inter-medium",
  },
  active: {
    color: colors.primaryBlue,
  },
  inactive: {
    color: "#2C2D2E",
  },
  info: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    fontFamily: "inter-regular",
    color: colors.secondary,
    lineHeight: 18,
    letterSpacing: -0.6,
  },
  rightIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIcon: {
    width: 15.5,
    height: 11,
  },
  inactiveIcon: {
    width: 6.75,
    height: 12,
  },
});

export default NodeBar;
