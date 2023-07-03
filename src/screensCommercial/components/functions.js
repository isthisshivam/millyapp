export function handleType(type) {
  switch (type) {
    case "1":
      return "Send CCD";

    case "3":
      return "Send CTX";
    case "5":
      return "Send PPD";
    case "12":
      return "Collect CCD";

    case "13":
      return "Collect CTX";

    case "15":
      return "Collect PPD";
  }
}
