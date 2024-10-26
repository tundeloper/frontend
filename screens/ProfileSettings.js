import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

// ======icon==============
import { Octicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";

//////components--------
import {
  StyledContainer,
  Colors,
  MainContainer,
  ScreenTitles,
  ContentMarginTop,
  ProfileImageContainer,
  UploadProfileImage,
  ProfilePicture,
  SmallInputContainer,
  ProfileInputSmall,
  StyledTextInputLabel,
  StyledTextInput,
  ButtonText,
  StyledFormArea,
  ProfileInputField,
  ProfleInputfieldContainer,
  StyledButton,
  ProfileNameContainer,
  ProfileNameText,
  UserNameText,
  ImageContainer,
  CameraIconBg,
  CameraIconContainer,
  TextLink,
  TextLinkContent,
  AlertPopUpMessage,
  AlertPopUpErrorText,
  AlertPopUpText,
} from "../styles/styles";
import { Context } from "../store/context";
import { update } from "../util/auth";
import Snackbar from "../components/snackBar";

const defaultProfileImage = require("../assets/images/nopicture.png");

const { backgroundColor, inputPlaceholder, primary, inputBg, white , danger, success} = Colors;

const ProfileSettings = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
  });
  const ctx = useContext(Context);
  const { token } = ctx;
  const [image, setImage] = useState(null);
  console.log(image);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    // Use a setTimeout to clear the error message after 3 seconds
    if (errorMessage) {
      const errorTimeout = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      // Cleanup the timeout when the component unmounts or when the error message changes
      return () => clearTimeout(errorTimeout);
    }
  }, [errorMessage]);

  useEffect(() => {
    // Use a setTimeout to hide the success message after 3 seconds
    if (showUpdateSuccessAlert) {
      const successTimeout = setTimeout(() => {
        setShowUpdateSuccessAlert(false);
      }, 3000);
      
      // Cleanup the timeout when the component unmounts or when the success message changes
      return () => clearTimeout(successTimeout);
    }
  }, [showUpdateSuccessAlert]);



  const updateHandler = async () => {
    const data = {
      name: `${userData.firstName} ${userData.lastName}`,
      username: userData.username,
      email: userData.email,
    };
    try {
      const result = await update(data, token);
      if (result.status === "success") {
        setShowUpdateSuccessAlert(true); // Show success message
        const params = {
          token: result.jwtToken,
          name: result.user.name,
          wallet_Balance: result.user.wallet_Balance,
          username: result.user.username,
          email: result.user.email,
        };
        ctx.saveCredential(params);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again."); // Display an error message
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Update Profile</ScreenTitles>
          <ContentMarginTop />

          <ProfileImageContainer>
            <ImageContainer>
              <CameraIconContainer onPress={pickImage}>
                <CameraIconBg>
                  <Ionicons name="camera" size={27} color={white} />
                </CameraIconBg>
              </CameraIconContainer>
              <UploadProfileImage>
                <ProfilePicture>
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <Image
                      source={defaultProfileImage}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </ProfilePicture>
              </UploadProfileImage>
            </ImageContainer>

            <ProfileNameContainer>
              <ProfileNameText>{ctx.name}</ProfileNameText>
              <UserNameText>{ctx.username && `@${ctx.username}`}</UserNameText>
            </ProfileNameContainer>
          </ProfileImageContainer>
          {/* input fields=============== */}
          <StyledFormArea>
            <SmallInputContainer>
              <ProfileInputSmall
                placeholder="First name"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(text) => {
                  setUserData({ ...userData, firstName: text });
                }}
              />
              <ProfileInputSmall
                placeholder="Last name"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(text) => {
                  setUserData({ ...userData, lastName: text });
                }}
              />
            </SmallInputContainer>
            <ProfleInputfieldContainer>
              <ProfileInputField
                placeholder="Username"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(text) => {
                  setUserData({ ...userData, username: text });
                }}
              />
              <ProfileInputField
                placeholder="Phone number"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(text) => {
                  setUserData({ ...userData, phone: text });
                }}
              />
              <ProfileInputField
                placeholder="Email"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(text) => {
                  setUserData({ ...userData, email: text });
                }}
              />
            </ProfleInputfieldContainer>
            <StyledButton onPress={updateHandler}>
              <ButtonText>UPDATE</ButtonText>
            </StyledButton>
            <TextLink onPress={() => navigation.navigate("UserVerification")}>
              <TextLinkContent>Request verification</TextLinkContent>
            </TextLink>
          </StyledFormArea>
        </MainContainer>
      </StyledContainer>
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

const styles = StyleSheet.create({
  cameraIcon: {
    flex: 1,
    position: "absolute",
    marginTop: 30,
  },
});

export default ProfileSettings;
