/**
 * @file Handles sign in email function
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
import { emailStepValidationSchema } from "../../utils/validation";
import ButtonComponent from "../../components/layout/ButtonComponent";
import PaddingComponent from "../../components/layout/PaddingComponent";
import LeftHeader from "../../components/header/LeftHeader";

export default function SignInEmailScreen({ navigation }) {
  const colours = useColours();
  const styles = useGlobalStyles();

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
          validationSchema={emailStepValidationSchema}
          initialValues={{ email: "" }}
          onSubmit={(values) =>
            navigation.navigate("SignInPassword", { emailData: values.email })
          }
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
                  This is how we identify your account.
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
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <View style={styles.secondaryMessage}>
                  <Text style={styles.secondaryMessageText}>
                    Don't have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.link}> Get Started</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }} />
                <View style={styles.btnContainer}>
                  <ButtonComponent
                    text="Next"
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
