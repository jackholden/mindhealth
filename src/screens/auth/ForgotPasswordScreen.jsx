/**
 * @file Handles forgot password view
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

import useColours from "../../hooks/useColours";
import useGlobalStyles from "../../hooks/useGlobalStyles";
import { useAuthContext } from "../../hooks/useAuthContext";
import { emailStepValidationSchema } from "../../utils/validation";
import ButtonComponent from "../../components/layout/ButtonComponent";
import PaddingComponent from "../../components/layout/PaddingComponent";
import LeftHeader from "../../components/header/LeftHeader";

export default function ForgotPasswordScreen() {
  const colours = useColours();
  const styles = useGlobalStyles();
  const { handleForgottenPassword, error, success } = useAuthContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.screen}
    >
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <LeftHeader
          title="Forgot Password"
          backBtn={true}
          destinationScreen="SignInEmail"
        />
        <Formik
          validationSchema={emailStepValidationSchema}
          initialValues={{ email: "" }}
          onSubmit={(values, { resetForm }) => {
            handleForgottenPassword(values.email);
            resetForm();
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
                <Text style={styles.header}>What's your email address?</Text>
                <PaddingComponent amount={5} />
                <Text style={styles.subHeader}>
                  This is where we will send your reset email.
                </Text>
                <PaddingComponent amount={30} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  placeholderTextColor="#000"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {error[2] !== null && (
                  <Text style={styles.errorText}>{error[2]}</Text>
                )}
                {success[2] !== null && (
                  <Text style={styles.successText}>{success[2]}</Text>
                )}
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <View style={{ flex: 1 }} />
                <View style={styles.btnContainer}>
                  <ButtonComponent
                    text="Send Reset Email"
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
