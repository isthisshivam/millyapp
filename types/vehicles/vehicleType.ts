export type AddVehicleType = {
  year: string;
  make: string;
  model: string;
  buyAmount: number;
  buyDate: string;
  type: string;
};
export type EditVehicleType = {
  year?: string;
  make?: string;
  model?: string;
  buyAmount?: number;
  buyDate?: string;
  type?: string;
  id: number;
};
export type VehicleType = {
  id: number;
  type: string;
  year: string;
  make: string;
  model: string;
  paymentDate: string;
  paymentAmount: number;
};
