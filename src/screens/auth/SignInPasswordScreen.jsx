/**
 * @file Handles sign in password stage form.
 * @author Jack Holden
 */

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";

import useColours from "../../hooks/useColours";
import useGlobalStyles from "../../hooks/useGlobalStyles";
import { useAuthContext } from "../../hooks/useAuthContext";
import { passwordStepValidationSchema } from "../../utils/validation";
import ButtonComponent from "../../components/layout/ButtonComponent";
import PaddingComponent from "../../components/layout/PaddingComponent";
import LeftHeader from "../../components/header/LeftHeader";

export default function SignInPasswordScreen({ route, navigation }) {
  const colours = useColours();
  const styles = useGlobalStyles();

  const { emailData } = route.params;
  const { handleSignIn, error } = useAuthContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.screen}
    >
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <LeftHeader title="Sign In" backBtn={true} />
        <Formik
          validationSchema={passwordStepValidationSchema}
          initialValues={{ password: "" }}
          onSubmit={(values) => {
            const password = values.password;
            handleSignIn({ emailData, password });
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
                <Text style={styles.header}>Hey, {emailData}</Text>
                <PaddingComponent amount={5} />
                <Text style={styles.subHeader}>Enter your password.</Text>
                <PaddingComponent amount={30} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  placeholderTextColor="#000"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {!errors.password && error[0] !== null && (
                  <Text style={styles.errorText}>{error[0]}</Text>
                )}
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <View style={styles.secondaryMessage}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text style={styles.link}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }} />
                <View style={styles.btnContainer}>
                  <ButtonComponent
                    text="Sign In"
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
