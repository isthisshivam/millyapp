import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

const MyTransition = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

export { MyTransition };
