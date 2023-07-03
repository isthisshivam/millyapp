import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

import {
  UpdateVehicle,
  DeleteVehicle,
} from "../../../../../../store/actions/VehicleActions";

import VehicleTypeModal from "../../vehicleModals/VehicleTypeModal";
import VehicleYearModal from "../../vehicleModals/VehicleYearModal";
import VehicleMakeModal from "../../vehicleModals/VehicleMakeModal";
import VehicleModelModal from "../../vehicleModals/VehicleModelModal";
import EffectiveDate from "../../../../../../components/EffectiveDate";
import { styles } from "./style";
import { config } from "../../../../../../config/Config";
import StatusHandler from "../../../../../../../utils/StatusHandler";
import { formatDateYYMMDD } from "../../../../../../../utils/utils";

const EditVehicleDetails = ({ navigation, route }) => {
  const { id } = route.params;
  const state = useSelector((state) => state.vehicles);
  const vehicles = useSelector((state) => state.vehicles.vehicles).filter(
    (item) => item.id === id
  );
  const vehicleData = vehicles[0];

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [isSafeToTransfer, setisSafeToTransfer] = useState(false);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    type: vehicleData?.type,
    year: vehicleData?.year,
    make: vehicleData?.make,
    model: vehicleData?.model,
    effectiveDate: vehicleData?.paymentDate,
    buyAmount: vehicleData?.paymentAmount,
    id: id,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    showSuccess: false,
    showDelete: false,
  });

  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };
  const submit = () => {
    setStatus({
      ...status,
      loading: true,
    });

    let data = {
      type: payload.type,
      year: payload.year,
      make: payload.make,
      model: payload.model,
      buyDate: formatDateYYMMDD(payload.effectiveDate),
      buyAmount: payload.buyAmount,
      id: id,
    };
    dispatch(UpdateVehicle(data));
  };

  function ToggleDelete() {
    setStatus({
      ...state,
      showDelete: true,
    });
  }

  function deleteItem() {
    setStatus({
      loading: true,
    });
    let data = {
      id: [id],
    };

    dispatch(DeleteVehicle(data));
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Update Vehicle Details </Text>
        </View>

        {state.loading ? (
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
              source={require("../../../../../../components/ui/loading-spinner.json")}
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
                  {payload.type === "" ? (
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
                    setShowModal2(true);
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
                    setShowModal3(true);
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
                    setShowModal4(true);
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
              <Text style={styles.label}>Payment Amount:</Text>
              <TextInput
                style={styles.input}
                keyboardType={"decimal-pad"}
                value={payload.buyAmount?.toString()}
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
              <TouchableOpacity onPress={submit} style={styles.buttonActive}>
                <Text style={styles.buttonText}>Save Vehicle Information</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginTop: config.hp("2%") }}>
              <TouchableOpacity onPress={() => ToggleDelete()}>
                <Text style={{ fontSize: 16 }}>Delete Vehicle</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
      <Modal visible={showModal} transparent={true} animationType={"slide"}>
        <VehicleTypeModal
          setShowModal={setShowModal}
          setShowModal2={setShowModal2}
          handleChange={handleChange}
          type={payload.type}
        />
      </Modal>
      <Modal visible={showModal2} transparent={true} animationType={"slide"}>
        <VehicleYearModal
          setShowModal={setShowModal2}
          setShowModal3={setShowModal3}
          handleChange={handleChange}
          year={payload.year}
        />
      </Modal>
      <Modal visible={showModal3} transparent={true} animationType={"slide"}>
        <VehicleMakeModal
          setShowModal={setShowModal3}
          setShowModal4={setShowModal4}
          handleChange={handleChange}
          make={payload.make}
          year={payload.year}
        />
      </Modal>
      <Modal visible={showModal4} transparent={true} animationType={"slide"}>
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
        deleteItem={deleteItem}
      ></StatusHandler>
    </View>
  );
};

export default EditVehicleDetails;
