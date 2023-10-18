/**
 * @file Handles register account view
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
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";

import useColours from "../../hooks/useColours";
import useGlobalStyles from "../../hooks/useGlobalStyles";
import { useAuthContext } from "../../hooks/useAuthContext";
import useKeyboardVisible from "../../hooks/useKeyboardVisible";

import { registerValidationSchema } from "../../utils/validation";
import ButtonComponent from "../../components/layout/ButtonComponent";
import PaddingComponent from "../../components/layout/PaddingComponent";
import LeftHeader from "../../components/header/LeftHeader";

/**
 * Register
 * @returns
 */
export default function RegisterScreen() {
  const colours = useColours();
  const styles = useGlobalStyles();
  const keyboardShow = useKeyboardVisible();

  const { handleSignup, error } = useAuthContext();

  const hitSlop = { top: 15, left: 5, bottom: 15, right: 5 };

  const edges = keyboardShow ? ["left", "right"] : ["left", "right", "bottom"];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.screen}
    >
      <SafeAreaView style={styles.container} edges={edges}>
        <LeftHeader
          title="Get Started"
          backBtn={true}
          destinationScreen="Welcome"
        />
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{
            displayName: "",
            email: "",
            password: "",
            cpassword: "",
          }}
          onSubmit={(values) => {
            const email = values.email;
            const password = values.password;
            const displayName = values.displayName;
            handleSignup({ email, password, displayName });
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
                <ScrollView style={styles.scroll}>
                  <Text style={styles.header}>Fill in your details</Text>
                  <PaddingComponent amount={5} />
                  <Text style={styles.subHeader}>
                    This is so we can save your journal.
                  </Text>
                  <PaddingComponent amount={30} />
                  {error[1] !== null && (
                    <Text style={styles.errorText}>{error[1]}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    autoCapitalize="none"
                    placeholderTextColor="#000"
                    onChangeText={handleChange("displayName")}
                    onBlur={handleBlur("displayName")}
                    value={values.displayName}
                  />
                  {errors.displayName ? (
                    <Text style={styles.errorText}>{errors.displayName}</Text>
                  ) : (
                    <PaddingComponent amount={15} />
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholderTextColor="#000"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : (
                    <PaddingComponent amount={15} />
                  )}
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
                  {errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : (
                    <PaddingComponent amount={15} />
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    placeholderTextColor="#000"
                    onChangeText={handleChange("cpassword")}
                    onBlur={handleBlur("cpassword")}
                    value={values.cpassword}
                  />
                  {errors.cpassword ? (
                    <Text style={styles.errorText}>{errors.cpassword}</Text>
                  ) : (
                    <PaddingComponent amount={15} />
                  )}
                </ScrollView>

                <View style={{ flex: 1 }} />
                <View style={styles.btnContainer}>
                  <ButtonComponent
                    text="Create Account"
                    backgroundColor={colours.black}
                    textColor={colours.white}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                  {!keyboardShow && (
                    <View style={[styles.paragraph]}>
                      <Text style={[styles.text]}>
                        By signing up you accept MindHealth's{" "}
                      </Text>
                      <TouchableOpacity hitSlop={hitSlop}>
                        <Text style={[styles.text, styles.link]}>
                          Terms of Service
                        </Text>
                      </TouchableOpacity>
                      <Text style={[styles.text]}> and </Text>
                      <TouchableOpacity hitSlop={hitSlop}>
                        <Text style={[styles.text, styles.link]}>
                          Privacy Policy
                        </Text>
                      </TouchableOpacity>
                      <Text style={[styles.text]}>.</Text>
                    </View>
                  )}
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
