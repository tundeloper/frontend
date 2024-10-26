import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Text } from "react-native";

// ======icon==============
import { Octicons } from "@expo/vector-icons";

//////components--------
import {
  StyledContainer,
  Colors,
  ButtonStyle,
  ButtonText,
  MainContainer,
  ScreenTitles,
  GenerateCryptoContainer,
  GenerateCryptoIcon,
  GenerateCryptoTitle,
  GenerateCryptoDetails,
  CryptoInputContainer,
  CryptoAddressInput,
  CryptoCopyBtn,
} from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { refer } from "../util/auth";
import { useContext } from "react";
import { Context } from "../store/context";

const { backgroundColor, inputPlaceholder, white } = Colors;
const Referral = ({ navigation }) => {
  const [referLink, setReferLink] = useState("");
  const ctx = useContext(Context);
  useEffect(() => {
    const data = async () => {
      const response = await refer(ctx.token);
      setReferLink(response.link);
    };
    data();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Referral</ScreenTitles>
          <GenerateCryptoContainer>
            <GenerateCryptoIcon
              source={require("../assets/icons/cryptowallet.png")}
            />
            <GenerateCryptoTitle>
              Refer your friends and get N200
            </GenerateCryptoTitle>
            <GenerateCryptoDetails>
              Earn referral bonus when your friends signs up {"\n"} and trade
              successfully.
            </GenerateCryptoDetails>
            <CryptoInputContainer>
              <CryptoAddressInput
                placeholder={referLink}
                placeholderTextColor={white}
                editable={false}
              />
              <CryptoCopyBtn>
                <ButtonText>Copy</ButtonText>
              </CryptoCopyBtn>
            </CryptoInputContainer>
          </GenerateCryptoContainer>
        </MainContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

export default Referral;
