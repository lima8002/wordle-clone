import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useMMKVBoolean } from "react-native-mmkv";
import { storage } from "./storage";

export type Ref = BottomSheetModal;

const SettingsModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const { dismiss } = useBottomSheetModal();

  const [hard, setHard] = useMMKVBoolean("hard-mode", storage);
  const [dark, setDark] = useMMKVBoolean("dark-mode", storage);
  const [highContrast, setHighContrast] = useMMKVBoolean(
    "contrast-mode",
    storage
  );
  const toggleDark = () => setDark((prev) => !!!prev);
  const toggleHighContrast = () => setHighContrast((prev) => !!!prev);
  const toggleHard = () => setHard((prev) => !!!prev);

  // useEffect(() => {
  //   console.log("SettingsModal ref set:", JSON.stringify(ref, null, 2));
  // }, [ref]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={dismiss}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      handleComponent={null}
    >
      <View style={styles.contentContainer}>
        <View style={styles.modalBtns}>
          <Text style={styles.containerHeadline}>SETTINGS</Text>
          <TouchableOpacity onPress={() => dismiss()}>
            <Ionicons name="close" size={28} color={Colors.light.gray} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTextBig}>Hard Mode</Text>
            <Text style={styles.rowTextSmall}>Words are longer and harder</Text>
          </View>
          <Switch
            onValueChange={toggleHard}
            value={hard}
            trackColor={{ true: "##000" }}
            ios_backgroundColor="#9a9a9a"
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTextBig}>Dark Mode</Text>
            <Text style={styles.rowTextSmall}>Change the app's theme</Text>
          </View>
          <Switch
            onValueChange={toggleDark}
            value={dark}
            trackColor={{ true: "##000" }}
            ios_backgroundColor="#9a9a9a"
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTextBig}>High Contrast Mode</Text>
            <Text style={styles.rowTextSmall}>
              Increase contrast for better readability
            </Text>
            <Switch
              onValueChange={toggleHighContrast}
              value={highContrast}
              trackColor={{ true: "##000" }}
              ios_backgroundColor="#9a9a9a"
            />
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default SettingsModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerHeadline: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    flex: 1,
  },
  modalBtns: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#888",
  },
  rowText: {
    flex: 1,
  },
  rowTextBig: {
    fontSize: 18,
  },
  rowTextSmall: {
    fontSize: 14,
    color: "#5e5e5e",
  },
});
