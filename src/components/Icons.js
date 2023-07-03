import React from "react";
import { Image } from "react-native";
import { config } from "../config/Config";
import { theme } from "../config/Theme";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

// import Alert from "../../assets/svg/alert.svg";
// import Accounts from "../../assets/svg/Accounts.svg";
// import BillPay from "../../assets/svg/BillPay.svg";
// import MobileDeposit from "../../assets/svg/mobile-deposit.svg";
// import CardControl from "../../assets/svg/CardControl.svg";
// import TransferFunds from "../../assets/svg/TransferFunds.svg";
// import Estatement from "../../assets/svg/e-statements.svg";
// import Emessage from "../../assets/svg/E-message-center.svg";
// import Esafe from "../../assets/svg/e-safe.svg";
// import Reminder from "../../assets/svg/reminderCalender.svg";
// import Logout from "../../assets/svg/logout.svg";
// import Home from "../../assets/svg/Home.svg";
import Menu from "../../assets/svg/HamburgerMenu.svg";
import X from "../../assets/svg/x-icon.svg";
import backArrow from "../../assets/svg/ArrowLeft.svg";
import CheckMark from "../../assets/svg/checkMark.svg";
import Pencil from "../../assets/svg/pencil.svg";
import TrashCan from "../../assets/svg/trash.svg";
import PaperClip from "../../assets/svg/paperClip.svg";

const AccountsIcon = () => {
  return (
    <>
      <MaterialIcons
        name="account-balance-wallet"
        size={32}
        color={theme.colors.primary}
        style={{ width: config.wp("7.9%") }}
      />
    </>
  );
};

const BillPayIcon = ({ stroke }) => {
  return (
    <>
      {/* <Image
        source={require("../../assets/svg/Accounts.svg")}
        height={config.hp("3.5%")}
        width={config.wp("6.1%")}
      /> */}
      <FontAwesome5
        name="money-check-alt"
        size={26}
        color={theme.colors.primary}
        style={{ width: config.wp("7.9%") }}
      />
    </>
  );
};
const MobileDepositIcon = ({ stroke }) => {
  return (
    <Ionicons
      name="camera"
      size={32}
      color={theme.colors.primary}
      style={{ width: config.wp("7.9%") }}
    />
    // <Image
    //   source={require("../../assets/svg/Accounts.svg")}
    //   height={config.hp("5%")}
    //   width={config.wp("7.9%")}
    // />
  );
};

const CardControlIcon = () => {
  return (
    <Image
      source={require("../../assets/svg/Accounts.svg")}
      //stroke={theme.colors.primary}
      height={"100%"}
      width={config.wp("6.1%")}
    />
  );
};
const TransferFundsIcon = ({ stroke }) => {
  return (
    <MaterialCommunityIcons
      name="bank-transfer"
      size={38}
      color={theme.colors.primary}
      style={{ width: config.wp("7.9%") }}
    />
    // <Image
    //   source={require("../../assets/svg/Accounts.svg")}
    //   height={config.hp("5%")}
    //   width={config.wp("6.1%")}
    // />
  );
};
const EStatementsIcon = () => {
  return (
    <Ionicons
      name="receipt"
      size={32}
      color={theme.colors.primary}
      style={{ width: config.wp("7.9%") }}
    />
    // <Image
    //   source={require("../../assets/svg/Accounts.svg")}
    //   //stroke={theme.colors.primary}
    //   height={config.hp("5%")}
    //   width={config.wp("6.1%")}
    // />
  );
};

const EmessageCenterIcon = () => {
  return (
    // <Image
    //   source={require("../../assets/svg/Accounts.svg")}
    //   //stroke={theme.colors.primary}
    //   height={"100%"}
    //   width={config.wp("6.1%")}
    // />
    <Ionicons
      name="ios-chatbox"
      size={32}
      color={theme.colors.primary}
      style={{ width: config.wp("7.9%") }}
    />
  );
};

const EsafeIcon = () => {
  return (
    // <Image
    //   source={require("../../assets/svg/Accounts.svg")}
    //   //stroke={theme.colors.primary}
    //   height={"100%"}
    //   width={config.wp("6.1%")}
    // />
    <Ionicons
      name="lock-open"
      size={32}
      color={theme.colors.primary}
      style={{ width: config.wp("7.9%") }}
    />
  );
};
const RemindersIcon = () => {
  return (
    <Image
      source={require("../../assets/svg/Accounts.svg")}
      //stroke={theme.colors.primary}
      height={"100%"}
      width={config.wp("6.1%")}
    />
  );
};

const AlertIcon = () => {
  return (
    <>
      <Ionicons
        name="notifications"
        size={32}
        color={theme.colors.primary}
        style={{ width: config.wp("7.9%") }}
      />
    </>
  );
};
const LogoutIcon = () => {
  return (
    // <Image
    //   source={require("../../assets/svg/Accounts.svg")}
    //   height={config.hp("5%")}
    //   width={config.wp("6%")}
    // />

    <Ionicons
      name="exit"
      size={32}
      color={theme.colors.primary}
      style={{ width: config.wp("7.9%") }}
    />
  );
};

const HomeIcon = ({ stroke, fill }) => {
  return (
    <Image
      source={require("../../assets/svg/Accounts.svg")}
      height={config.hp("5%")}
      width={config.wp("6%")}
      //stroke={stroke}
      //fill={fill}
    />
  );
};

const HamburgerIcon = ({ stroke }) => {
  return (
    <Menu
      height={config.hp("5%")}
      width={config.wp("6%")}
      //stroke={stroke}
    />
  );
};
const Xicon = ({ height, width, color }) => {
  return (
    <X
      height={config.hp(`${height}%`)}
      width={config.wp(`${width}%`)}
      // stroke={color ? color : theme.colors.primary}
    />
  );
};

const ArrowLeft = ({ stroke, fill }) => {
  return (
    <backArrow
      height={config.hp(`${height}%`)}
      width={config.wp(`${width}%`)}
      stroke={color ? color : theme.colors.primary}
    />
  );
};
const CheckMarkIcon = ({ height, width, color }) => {
  return (
    <CheckMark
      height={config.hp(`${height}%`)}
      width={config.wp(`${width}%`)}
      stroke={color ? color : theme.colors.primary}
      fill={color ? color : theme.colors.primary}
    />
  );
};
const PencilIcon = ({ height, width, color }) => {
  return (
    <Pencil
      height={config.hp(`${height}%`)}
      width={config.wp(`${width}%`)}
      stroke={color ? color : theme.colors.primary}
      fill={color ? color : theme.colors.primary}
    />
  );
};
const TrashCanIcon = ({ height, width, color }) => {
  return (
    <TrashCan
      height={config.hp(`${height}%`)}
      width={config.wp(`${width}%`)}
      stroke={color ? color : theme.colors.primary}
    />
  );
};

const PaperClipIcon = ({ height, width, color }) => {
  return (
    <PaperClip
      height={config.hp(`${height}%`)}
      width={config.wp(`${width}%`)}
      stroke={color ? color : theme.colors.primary}
    />
  );
};
export {
  AlertIcon,
  AccountsIcon,
  BillPayIcon,
  MobileDepositIcon,
  CardControlIcon,
  TransferFundsIcon,
  EStatementsIcon,
  EmessageCenterIcon,
  EsafeIcon,
  RemindersIcon,
  LogoutIcon,
  HomeIcon,
  HamburgerIcon,
  Xicon,
  ArrowLeft,
  CheckMarkIcon,
  PencilIcon,
  TrashCanIcon,
  PaperClipIcon,
};
