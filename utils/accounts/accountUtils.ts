import { AccountType } from "../../types/account/accountTypes";
import { theme } from "../../src/config/Theme";

export const calcCardStyles = (item: AccountType, depositAccount: number) => {
  const secondaryTextColor =
    item.secondaryTextColor == "default" ? "black" : item.secondaryTextColor;

  const backGroundColor =
    depositAccount == item.accountId && item.backGroundColor == "default"
      ? "white"
      : depositAccount == item.accountId
      ? item.backGroundColor
      : theme.colors.faded;
  const mainTextColor = "default"
    ? theme.colors.primary
    : item.mainTextColor
    ? item.mainTextColor
    : "black";

  return { secondaryTextColor, backGroundColor, mainTextColor };
};
