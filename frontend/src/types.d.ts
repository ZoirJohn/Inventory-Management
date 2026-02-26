type TRandomID =
  | "20-bit-number"
  | "32-bit-number"
  | "9-digit-number"
  | "6-digit-number"
  | "guid"
  | "date-time"
  | "sequence"
  | "fixed";

type TInventoryRes = {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  customIdPrefix: string;
};

type TInventory = {
  title: string;
  description: string;
} & Fields;

type TFields = {
  customString1Name?: string;
  customString2Name?: string;
  customString3Name?: string;
  customText1Name?: string;
  customText2Name?: string;
  customText3Name?: string;
  customInt1Name?: string;
  customInt2Name?: string;
  customInt3Name?: string;
  customLink1Name?: string;
  customLink2Name?: string;
  customLink3Name?: string;
  customBool1Name?: string;
  customBool2Name?: string;
  customBool3Name?: string;
};

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
