import { UserModel } from "../types/UserModel";
const avatarImg = process.env.REACT_APP_ASSETS_BUCKET + "/avatars/avatar5.webp";

const testUser: UserModel = {
  id: 1,
  firstName: "Chris",
  lastName: "Johnson",
  imgUrl: avatarImg,
  userName: "@john1989",
  email: {
    name: "chris.johnson@altence.com",
    verified: true,
  },
  phone: {
    number: "+18143519459",
    verified: false,
  },
  sex: "male",
  birthday: "01/26/2022",
};

export const persistToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const readToken = (): string => {
  return localStorage.getItem("accessToken") || "bearerToken";
};

export const persistUser = (user: UserModel): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const readUser = (): UserModel | null => {
  const userStr = localStorage.getItem("user");

  return userStr ? JSON.parse(userStr) : testUser;
};

export const deleteToken = (): void => localStorage.removeItem("accessToken");
export const deleteUser = (): void => localStorage.removeItem("user");
