import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NewVehicle } from "../../../../../store/actions/VehicleActions";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

import VehicleTypeModal from "../vehicleModals/VehicleTypeModal";
import VehicleYearModal from "../vehicleModals/VehicleYearModal";
import VehicleMakeModal from "../vehicleModals/VehicleMakeModal";
import VehicleModelModal from "../vehicleModals/VehicleModelModal";
import EffectiveDate from "../../../../../components/EffectiveDate";
import { styles } from "./style";
import StatusHandler from "../../../../../../utils/StatusHandler";

const AddVehicleDetails = ({ navigation }) => {
  const state = useSelector((state) => state.vehicles);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    type: "Select Type",
    year: undefined,
    make: undefined,
    model: undefined,
    effectiveDate: new Date(),
    buyAmount: undefined,
    id: undefined,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    showSuccess: false,
    disabled: true,
  });

  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  const submit = () => {
    setStatus({
      ...status,
      loading: true,
      disabled: true,
    });

    let data = {
      type: payload.type,
      year: payload.year,
      make: payload.make,
      model: payload.model,
      buyDate: payload.effectiveDate,
      buyAmount: payload.buyAmount,
    };
    dispatch(NewVehicle(data));
  };

  useEffect(() => {
    if (
      payload.type !== undefined &&
      payload.year !== undefined &&
      payload.make !== undefined &&
      payload.model !== undefined &&
      payload.buyDate !== undefined &&
      payload.buyAmount !== undefined
    ) {
      setStatus({
        ...status,
        disabled: false,
      });
    }
  }, [payload]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Add Vehicle Details </Text>
        </View>
        {status.loading ? (
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
              source={require("../../../../../components/ui/loading-spinner.json")}
            />
          </View>
        ) : (
          <>
            <View style={[styles.inputContainer, styles.touchInputContainer]}>
              <Text style={styles.label}>Type</Text>

              <View style={styles.rightSide}>
                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => {
                    setShowModal(true);
                  }}
                >
                  {payload.vehicleType === "" ? (
                    <Text style={styles.inputTouchText}>Type</Text>
                  ) : (
                    <Text style={styles.inputTouchTextSelected}>
                      {payload.type}
                    </Text>
                  )}
                  <Icon name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.inputContainer, styles.touchInputContainer]}>
              <Text style={styles.label}>Year</Text>

              <View style={styles.rightSide}>
                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => {
                    payload.type != "" ? setShowModal2(true) : undefined;
                  }}
                >
                  {payload.year === "" ? (
                    <Text style={styles.inputTouchText}>Year</Text>
                  ) : (
                    <Text style={styles.inputTouchTextSelected}>
                      {payload.year}
                    </Text>
                  )}
                  <Icon name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.inputContainer, styles.touchInputContainer]}>
              <Text style={styles.label}>Make</Text>

              <View style={styles.rightSide}>
                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => {
                    payload.year !== "" ? setShowModal3(true) : undefined;
                  }}
                >
                  {payload.make === "" ? (
                    <Text style={styles.inputTouchText}>Make</Text>
                  ) : (
                    <Text style={styles.inputTouchTextSelected}>
                      {payload.make}
                    </Text>
                  )}
                  <Icon name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.inputContainer, styles.touchInputContainer]}>
              <Text style={styles.label}>Model</Text>

              <View style={styles.rightSide}>
                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => {
                    payload.year !== "" ? setShowModal4(true) : undefined;
                  }}
                >
                  {payload.model === "" ? (
                    <Text style={styles.inputTouchText}>Model</Text>
                  ) : (
                    <Text style={styles.inputTouchTextSelected}>
                      {payload.model}
                    </Text>
                  )}
                  <Icon name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Payment Amount</Text>
              <TextInput
                style={styles.input}
                placeholder={"Payment"}
                keyboardType={"decimal-pad"}
                onChangeText={(value) => {
                  handleChange("buyAmount", value);
                }}
              />
            </View>

            <EffectiveDate
              activeDate={payload.effectiveDate}
              handleChange={handleChange}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={submit}
                style={status.disabled ? styles.button : styles.buttonActive}
                disabled={status.disabled}
              >
                <Text style={styles.buttonText}>Add Vehicle Information</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
      <Modal visible={showModal} transparent={true} animationType={"fade"}>
        <VehicleTypeModal
          setShowModal={setShowModal}
          setShowModal2={setShowModal2}
          handleChange={handleChange}
          type={payload.type}
        />
      </Modal>
      <Modal visible={showModal2} transparent={true} animationType={"fade"}>
        <VehicleYearModal
          setShowModal={setShowModal2}
          setShowModal3={setShowModal3}
          handleChange={handleChange}
          year={payload.year}
        />
      </Modal>
      <Modal visible={showModal3} transparent={true} animationType={"fade"}>
        <VehicleMakeModal
          setShowModal={setShowModal3}
          setShowModal4={setShowModal4}
          handleChange={handleChange}
          make={payload.make}
          year={payload.year}
        />
      </Modal>
      <Modal visible={showModal4} transparent={true} animationType={"fade"}>
        <VehicleModelModal
          setShowModal={setShowModal4}
          handleChange={handleChange}
          make={payload.make}
          year={payload.year}
        />
      </Modal>
      <StatusHandler
        state={state}
        navigation={navigation}
        status={status}
        setStatus={setStatus}
      ></StatusHandler>
    </View>
  );
};

export default AddVehicleDetails;
