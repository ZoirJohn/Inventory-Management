type RandomID = "20-bit-number" | "32-bit-number" | "9-digit-number" | "6-digit-number" | "guid" | "date-time" | "sequence" | "fixed";

type InventoryInput = {
	title: string;
	description: string;
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
