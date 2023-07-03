///Upload image from users library
export const pickImage = async (ImagePicker, setPayload, type, payload) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
  });

  if (!result.cancelled && !result.base64) {
    console.log("File not base64, check that it is an image");
    //Add error handling
    return;
  }
  if (type == "Selfie") {
    setPayload({ ...payload, faceImage: result?.base64 });
  }
  if (type == "Front") {
    setPayload({ ...payload, frontImage: result?.base64 });
  }
  if (type == "Back") {
    setPayload({ ...payload, backImage: result?.base64 });
  }
};

const GetCameraPermissions = async ({
  ImagePicker,
  Device,
  setHasPermission,
}) => {
  if (Device.osName !== "web") {
    const { libraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (libraryStatus !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
  const { status } = await Camera.requestCameraPermissionsAsync();
  setHasPermission(status === "granted");
};
