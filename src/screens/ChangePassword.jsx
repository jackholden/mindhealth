/**
 * @file Handles change password view
 * @author Jack Holden
 */
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";

import useColours from "../hooks/useColours";
import useGlobalStyles from "../hooks/useGlobalStyles";
import { changePasswordValidationSchema } from "../utils/validation";
import ButtonComponent from "../components/layout/ButtonComponent";
import PaddingComponent from "../components/layout/PaddingComponent";
import CenterHeader from "../components/header/CenterHeader";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ChangePassword() {
  const colours = useColours();
  const styles = useGlobalStyles();

  const { handleChangePassword, success, error } = useAuthContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.screen}
    >
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <CenterHeader title="Change Password" />
        <Formik
          validationSchema={changePasswordValidationSchema}
          initialValues={{ opassword: "", npassword: "", cnpassword: "" }}
          onSubmit={(values) => {
            console.log(values);
            const opassword = values.opassword;
            const npassword = values.npassword;
            handleChangePassword({ opassword, npassword });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <PaddingComponent amount={40} />
                <TextInput
                  style={styles.input}
                  placeholder="Old Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  placeholderTextColor="#000"
                  onChangeText={handleChange("opassword")}
                  onBlur={handleBlur("opassword")}
                  value={values.opassword}
                />
                {errors.opassword ? (
                  <Text style={styles.errorText}>{errors.opassword}</Text>
                ) : (
                  <PaddingComponent amount={15} />
                )}
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  placeholderTextColor="#000"
                  onChangeText={handleChange("npassword")}
                  onBlur={handleBlur("npassword")}
                  value={values.npassword}
                />
                {errors.npassword ? (
                  <Text style={styles.errorText}>{errors.npassword}</Text>
                ) : (
                  <PaddingComponent amount={15} />
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Confirm New Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  placeholderTextColor="#000"
                  onChangeText={handleChange("cnpassword")}
                  onBlur={handleBlur("cnpassword")}
                  value={values.cnpassword}
                />
                {errors.cnpassword ? (
                  <Text style={styles.errorText}>{errors.cnpassword}</Text>
                ) : (
                  <PaddingComponent amount={15} />
                )}
                {error[3] !== null && (
                  <Text style={styles.errorText}>{error[3]}</Text>
                )}
                {success[3] !== null && (
                  <Text style={styles.successText}>{success[3]}</Text>
                )}
                <View style={{ flex: 1 }} />
                <View style={styles.btnContainer}>
                  <ButtonComponent
                    text="Change Password"
                    backgroundColor={colours.black}
                    textColor={colours.white}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                  {Platform.OS === "android" && <PaddingComponent />}
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        </Formik>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
