let strongPassword = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
let mediumPassword = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);
export const loginRequirements = [
  //Login Requirements to display
  "Must have a number",
  "Must have a number and a special characters",
  "Must have a number with a lowercase and an uppercase letter",
  "Must have a number with a special character, lowercase and an uppercase letter",
];
export function StrengthChecker(password: string) {
  // We then change the badge's color and text based on the password strength
  if (strongPassword.test(password)) {
    let strength = {
      strengthBadgeColor: "green",
      strengthBadgeText: "Strong",
    };
    return strength;
    // setStatus({
    //   ...status,
    //   strengthBadgeColor: theme.colors.primary,
    //
    // });
  } else if (mediumPassword.test(password)) {
    let strength = {
      strengthBadgeColor: "yellow",
      strengthBadgeText: "Medium",
    };
    return strength;
    // setStatus({
    //   ...status,
    //   strengthBadgeColor: "orange",
    //   strengthBadgeText: "Medium",
    // });
  } else {
    let strength = {
      strengthBadgeColor: "Red",
      strengthBadgeText: "Weak",
    };
    return strength;
    // setStatus({
    //   ...status,
    //   strengthBadgeColor: "Red",
    //   strengthBadgeText: "Weak",
    // });
  }
}

////Does password: string  contain a number
export function isNumber(s) {
  var boolToReturn = false;
  if (s) {
    s.split("").forEach((item) => {
      if (!isNaN(item)) {
        boolToReturn = true;
      }
    });
  }
  return boolToReturn;
}
