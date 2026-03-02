type TRandomID =
  | "20-bit-number"
  | "32-bit-number"
  | "9-digit-number"
  | "6-digit-number"
  | "guid"
  | "date-time"
  | "sequence"
  | "fixed";

type TInventory = {
  title: string;
  description: string;
} & Fields;

type Theme = "dark" | "light";

type TUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  blocked: boolean;
  googleId: string | null;
  facebookId: string | null;
  createdAt: string;
  updatedAt: string;
};

type TItem = {
  createdAt: string;
  creatorId: string;
  creatorName: string;
  customBool1: boolean;
  customBool2: boolean;
  customBool3: boolean;
  customId: string;
  customInt1: number;
  customInt2: boolean;
  customInt3: boolean;
  customLink1: string;
  customLink2: string;
  customLink3: string;
  customString1: string;
  customString2: string;
  customString3: string;
  customText1: string;
  customText2: string;
  customText3: string;
  id: string;
};
