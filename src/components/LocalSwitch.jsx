import { Alert, Switch, TouchableOpacity } from "react-native";
import useLocalAuth from "../hooks/useLocalAuth";

export default function LocalSwitch() {
  const { isEnabled, toggleAuth, isNotSupported } = useLocalAuth();

  return (
    <>
      {isNotSupported ? (
        <TouchableOpacity
          onPress={() => Alert.alert("Not supported on your device.")}
        >
          <Switch
            onValueChange={toggleAuth}
            disabled={isNotSupported}
            value={isEnabled}
          />
        </TouchableOpacity>
      ) : (
        <Switch onValueChange={toggleAuth} value={isEnabled} />
      )}
    </>
  );
}
