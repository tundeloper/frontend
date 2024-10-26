import React, { useContext, useState } from "react";
import { StatusBar, View, ActivityIndicator, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import axios from "axios"; // Make sure axios is installed
import {
  StyledContainer,
  MainContainer,
  StyledFormArea,
  StyledTextInput,
  ButtonText,
  StyledButton,
  Colors,
  SignupOtpContent,
  SignupOtpText,
} from "../../styles/styles";
import { Context } from "../../store/context";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { resetPasswordOTP } from "../../util/auth";

const { inputPlaceholder, backgroundColor } = Colors;

const ResetOtp = ({ navigation }) => {
  const ctx = useContext(Context);
  const [loading, setLoading] = useState(false);

  const handleOtpVerification = async (value) => {
    console.log(value);
    try {
      setLoading(true);
      const response = await resetPasswordOTP(value.otp, ctx.token);
      console.log(response, "otp");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // Perform OTP verification logic here
    // You can make an Axios request or any other verification method

    // After successful verification, navigate to CreateNewPassword
    navigation.navigate("CreateNewPassword");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <SignupOtpContent>
            <SignupOtpText>Enter the OTP that was sent to you!</SignupOtpText>
          </SignupOtpContent>
          <Formik initialValues={{ otp: "" }} onSubmit={handleOtpVerification}>
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <StyledFormArea>
                <StyledTextInput
                  placeholder="* * * * * *"
                  placeholderTextColor={inputPlaceholder}
                  onChangeText={handleChange("otp")}
                  onBlur={handleBlur("otp")}
                  value={values.otp}
                  keyboardType="numeric"
                />
                <StyledButton
                  onPress={handleSubmit}
                  disabled={loading}
                  style={{ marginTop: 20 }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size={"large"} />
                  ) : (
                    <ButtonText>VERIFY</ButtonText>
                  )}
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </MainContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

export default ResetOtp;
