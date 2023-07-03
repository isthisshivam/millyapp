import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { ChangeSettings } from "../../../store/actions/AccountActions";
import LottieView from "lottie-react-native";
import SuccessModal from "../../../components/Modals/SuccessModal";
import ErrorModal from "../../../components/Modals/ErrorModal";
import AccountAlertSection from "./accountAlert/AccountAlertSection";
import AccountCardPreview from "./accountCardPreview/AccountCardPreview";
import ImagePickerSection from "./ImagePickerSection";
import { config } from "../../../config/Config";
import Button from "../../../components/Button";
import { theme } from "../../../config/Theme";
import ColorIcons from "./ColorIcons";
import { styles } from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";

const AccountTileSettings = ({ route, navigation }) => {
  const accounts = useSelector((state) => state.accounts.accounts).filter(
    (item) => item.accountId === route.params.accountId
  );
  const account = accounts[0];
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const appState = useSelector((state) => state.accounts);
  const [image, setImage] = useState(account?.image ? account?.image : "");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const ref = useRef(null);

  const [mainTextColor, setMainTextColor] = useState(
    account?.mainTextColor == "default"
      ? theme.colors.primary
      : account?.mainTextColor
  );
  const [backgroundColor, setBackgroundColor] = useState(
    account?.backGroundColor == "default" ? "white" : account?.backGroundColor
  );
  const [secondaryTextColor, setSecondaryTextColor] = useState(
    account?.secondaryTextColor == "default"
      ? "black"
      : account?.secondaryTextColor
  );

  const [payload, setPayload] = useState({
    nickname: account?.nickname,
    enableStatements: "",
    backgroundColor: backgroundColor,
    mainTextColor: mainTextColor,
    secondaryTextColor: secondaryTextColor,
    accountId: account?.accountId,
    image: image,
  });

  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  useEffect(() => {
    if (appState.status == true) {
      setLoading(false);
      setShowSuccessModal(true);
      //dispatch(GetTileSettings());
    }

    if (appState.status == "Error") {
      setLoading(false);
      setError(appState.error);
      toggleError();
    }
  }, [appState]);

  const closeModal = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  function toggleError() {
    setShowError(!showError);
  }

  function resetDefault() {
    setImage("");
    setPayload({
      ...payload,

      nickname: undefined,
      backgroundColor: "default",
      mainTextColor: "default",
      secondaryTextColor: "default",
    });
    setMainTextColor("default");
    setSecondaryTextColor("default");
    setBackgroundColor("default");
  }
  const save = () => {
    setLoading(true);

    let data = {
      nickname: payload.nickname ? payload.nickname : account?.accountName,
      backGroundColor: backgroundColor,
      mainTextColor: mainTextColor,
      secondaryTextColor: secondaryTextColor,
      accountId: account?.accountId,
      image: image,
    };

    dispatch(ChangeSettings(data));
  };

  let colors = [
    [
      { color: "white", disabled: false },
      { color: "#42a5f5", disabled: false },
      { color: "#ffeb3b", disabled: false },
      { color: "#ff9100", disabled: false },
      { color: "#f44336", disabled: false },

      { color: "black", disabled: false },
      { color: "#00c853", disabled: false },
      { color: "#0d47a1", disabled: false },

      { color: "#e040fb", disabled: false },
      { color: "#f06292", disabled: false },
    ],
    [
      { color: "white", disabled: false },
      { color: "#42a5f5", disabled: false },
      { color: "#ffeb3b", disabled: false },
      { color: "#ff9100", disabled: false },
      { color: "#f44336", disabled: false },

      { color: "black", disabled: false },
      { color: "#00c853", disabled: false },
      { color: "#0d47a1", disabled: false },

      { color: "#e040fb", disabled: false },
      { color: "#f06292", disabled: false },
    ],
    [
      { color: "white", disabled: false },
      { color: "#42a5f5", disabled: false },
      { color: "#ffeb3b", disabled: false },
      { color: "#ff9100", disabled: false },
      { color: "#f44336", disabled: false },

      { color: "black", disabled: false },
      { color: "#00c853", disabled: false },
      { color: "#0d47a1", disabled: false },

      { color: "#e040fb", disabled: false },
      { color: "#f06292", disabled: false },
    ],
  ];

  const slide = [
    {
      title: "Tile Background Color",
      text: "Text 1",
    },
    {
      title: "Main Text Color",
      text: "Text 2",
    },
    {
      title: "Secondary Text Color",
      text: "Text 3",
    },
  ];
  const [carouselItems, setCarouselItems] = useState(slide);

  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={styles.slide}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              color: "black",
              width: "100%",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Text>
        </View>

        <ColorIcons
          index={index}
          setBackgroundColor={setBackgroundColor}
          setMainTextColor={setMainTextColor}
          setSecondaryTextColor={setSecondaryTextColor}
          colors={colors}
        ></ColorIcons>
      </View>
    ),
    []
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Account Nickname</Text>
        <Text style={styles.secondaryTitle}>
          Enter nickname for this account to easily distinguish between
          accounts.
        </Text>
        <View>
          <TextInput
            keyboardType="default"
            style={styles.nickNameInput}
            placeholder={
              payload.nickname !== ""
                ? payload.nickname
                : "Enter a nickname for the account"
            }
            maxLength={20}
            onChangeText={(value) => {
              handleChange("nickname", value);
            }}
          />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tile Appearance</Text>
        <Text style={styles.secondaryTitle}>
          You can also personalize the appearance of the account tile,
          including; card image, and colors.
        </Text>
      </View>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: 25,
          }}
        >
          <LottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../components/ui/loading-spinner.json")}
          />
          <Text style={{ fontSize: 22, paddingVertical: 10 }}>
            This may take a while
          </Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              justifyContent: "space-between",
              paddingVertical: config.hp("2%"),
            }}
          >
            <AccountCardPreview
              mainTextColor={mainTextColor}
              backgroundColor={backgroundColor}
              secondaryTextColor={secondaryTextColor}
              nickname={account?.nickname}
              image={image}
            ></AccountCardPreview>
            <ImagePickerSection setImage={setImage} image={payload.image} />
            <TouchableOpacity
              onPress={resetDefault}
              style={{ alignItems: "center", marginBottom: config.hp("2%") }}
            >
              <Text style={{ fontSize: 18 }}>Rest to default</Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Carousel
                layout="default"
                ref={ref}
                data={carouselItems}
                sliderWidth={config.wp("100%")}
                itemWidth={config.wp("100%")}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveIndex(index)}
              />
            </View>
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeIndex}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: "black",
              }}
              inactiveDotStyle={
                {
                  // Define styles for inactive dots here
                }
              }
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            ></Pagination>
          </View>

          <AccountAlertSection payload={payload} setPayload={setPayload} />
          <View
            style={{
              paddingVertical: config.hp("4%"),
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Button
              text="Save Changes"
              background={theme.colors.primary}
              fontSize={20}
              radius={12}
              color="white"
              height={50}
              width={200}
              onPress={save}
            ></Button>
          </View>
        </View>
      )}

      <SuccessModal
        showSuccessModal={showSuccessModal}
        message="Tile Settings Successfully Saved"
        closeModal={closeModal}
      ></SuccessModal>
      <ErrorModal
        showErrorModal={showError}
        closeErrorModal={toggleError}
        error={error}
      ></ErrorModal>
    </ScrollView>
  );
};

export default AccountTileSettings;
