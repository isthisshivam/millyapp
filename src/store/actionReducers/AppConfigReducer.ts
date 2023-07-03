const initialState = [
  {
    name: "homeBanner",
    bitPanel: {},
    contents: undefined,
  },
];
const Get_Config = "Get_Config";
const Get_BitPanel = "Get_BitPanel";

export const AppConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Config:
      let banners = action.payload;
      let loginBanner = banners.filter((item) => item.type == 4);
      let header = banners.filter((item) => item.type == 3);
      return { ...state, loginBanner: loginBanner[0] };
    case Get_BitPanel:
      return { ...state, bitPanel: action.payload };

    default:
      return state;
  }
};
