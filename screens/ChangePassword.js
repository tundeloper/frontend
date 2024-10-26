import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { Ionicons, Octicons } from "@expo/vector-icons";

import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  StyledTextInput,
  RightIcon,
  ButtonText,
  StyledButton,
  Colors,
  ToSignupPageBox,
  ToSignupPageText,
  TextLink,
  TextLinkContent,
  StyledTextInputLabel,
  ScreenTitles,
  ContentMarginTop,
  AlertPopUpMessage,
  AlertPopUpErrorText,
  AlertPopUpText,
} from "../styles/styles";
import { changePassword } from "../util/auth";
import { Context } from "../store/context";

const { inputPlaceholder, backgroundColor, danger, success } = Colors;

const ChangePassword = ({ navigation }) => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // For error message
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false); // For success message
  const [userData, setUserData] = useState({
    CurrentPassword: "",
    password: "",
    passConfirm: "",
  });

  const ctx = useContext(Context);

  const handleSubmit = async () => {
    try {
      const result = await changePassword(userData, ctx.token);
      ctx.saveCredential({ token: result.data.jwtToken });
      setShowUpdateSuccessAlert(true); // Show success message
      setErrorMessage(""); // Clear any previous error message
      console.log(result);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again."); // Set error message
      setShowUpdateSuccessAlert(false); // Hide success message
      console.log(error);
    }
  };

  useEffect(() => {
    let successMessageTimeout;
    let errorMessageTimeout;

    if (showUpdateSuccessAlert) {
      // Set a timer to hide success message after 3 seconds
      successMessageTimeout = setTimeout(() => {
        setShowUpdateSuccessAlert(false);
      }, 3000);
    }

    if (errorMessage) {
      // Set a timer to clear error message after 3 seconds
      errorMessageTimeout = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
    return () => {
      // Clear the timers when the component unmounts or when messages change
      clearTimeout(successMessageTimeout);
      clearTimeout(errorMessageTimeout);
    };
  }, [showUpdateSuccessAlert, errorMessage]);




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledContainer>
          <StatusBar style="light" backgroundColor={backgroundColor} />
          <ScreenTitles>Change Password</ScreenTitles>
          <ContentMarginTop />
          <InnerContainer>
            <StyledFormArea>
              <StyledTextInputLabel>Current password</StyledTextInputLabel>
              <MyTextInput
                placeholder="Current password"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(text) =>
                  setUserData({ ...userData, CurrentPassword: text })
                }
                // onBlur={handleBlur("password")}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
              />
              <StyledTextInputLabel>New password</StyledTextInputLabel>
              <MyTextInput
                placeholder="Enter new password"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(text) =>
                  setUserData({ ...userData, password: text })
                }
                // onBlur={handleBlur("password")}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
              />
              <StyledTextInputLabel>Confirm password</StyledTextInputLabel>
              <MyTextInput
                placeholder="Confirm new password"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(text) =>
                  setUserData({ ...userData, passConfirm: text })
                }
                // onBlur={handleBlur("password")}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
              />
            

              <StyledButton onPress={handleSubmit}>
                <ButtonText>Update password</ButtonText>
              </StyledButton>

              <ToSignupPageBox>
                <ToSignupPageText>
                  Can't remember your password?
                </ToSignupPageText>
              </ToSignupPageBox>
              <TextLink onPress={() => navigation.navigate("ResetOptions")}>
                <TextLinkContent>Reset Password</TextLinkContent>
              </TextLink>
            </StyledFormArea>
          </InnerContainer>
        </StyledContainer>
      </ScrollView>
        {/* Error Alert */}
     {errorMessage && (
        <AlertPopUpMessage>
           <Octicons name="alert" size={20} color={danger} />
          <AlertPopUpErrorText>{errorMessage}</AlertPopUpErrorText>
        </AlertPopUpMessage>
      )}

      {/* Success Alert */}
      {showUpdateSuccessAlert && (
        <AlertPopUpMessage>
          <Ionicons name="checkmark-circle" size={20} color={success} />
          <AlertPopUpText>Your password has been changed successfully.</AlertPopUpText>
        </AlertPopUpMessage>
      )}

    </SafeAreaView>
  );
};

const MyTextInput = ({ icon, togglePasswordVisibility, ...props }) => {
  return (
    <View>
      <StyledTextInput {...props} />
      {props > 0 && (
        <RightIcon onPress={togglePasswordVisibility}>
          <Octicons
            name={props.secureTextEntry ? "eye-closed" : "eye"}
            size={24}
            color={inputPlaceholder}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default ChangePassword;
