import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Alert } from "@heroui/alert";

import { client } from "@/entities/client";
import useUser from "@/entities/hooks/useUser";

export default function CreateInventory() {
  const { user, loading } = useUser();
  const { register, handleSubmit, reset } = useForm<TInventory>();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const onSubmit: SubmitHandler<TInventory> = async (data) => {
    try {
      const res = await client.CREATE_INVENTORY(data);

      if (res) {
        setSuccess("Inventory created successfully");
        reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw new Error(error.message);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);
  useEffect(() => {
    setTimeout(() => {
      setSuccess("");
    }, 5000);
  }, [success]);
  if (loading) return <div className="container">{t("loading")}</div>;
  if (!user.id) return <Navigate to="/" />;

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-64px)] container">
        <h1 className="text-4xl">{t("createInventory")}</h1>
        <form
          className="flex [&>div]:flex md:[&>div]:flex-row flex-col [&>div]:flex-col [&>div]:items-end gap-4 [&>div]:gap-2 md:gap-6 w-full md:w-2/3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input {...register("title")} required placeholder={t("title")} />
            <Input
              {...register("description")}
              required
              placeholder={t("description")}
            />
          </div>

          <div>
            <Input
              {...register("customString1Name")}
              placeholder={t("string")}
            />
            <Input
              {...register("customString2Name")}
              placeholder={t("string")}
            />
            <Input
              {...register("customString3Name")}
              placeholder={t("string")}
            />
          </div>
          <div>
            <Input {...register("customText1Name")} placeholder={t("text")} />
            <Input {...register("customText2Name")} placeholder={t("text")} />
            <Input {...register("customText3Name")} placeholder={t("text")} />
          </div>
          <div>
            <Input {...register("customInt1Name")} placeholder={t("integer")} />
            <Input {...register("customInt2Name")} placeholder={t("integer")} />
            <Input {...register("customInt3Name")} placeholder={t("integer")} />
          </div>
          <div>
            <Input {...register("customLink1Name")} placeholder={t("link")} />
            <Input {...register("customLink2Name")} placeholder={t("link")} />
            <Input {...register("customLink3Name")} placeholder={t("link")} />
          </div>
          <div>
            <Input
              {...register("customBool1Name")}
              placeholder={t("boolean")}
            />
            <Input
              {...register("customBool2Name")}
              placeholder={t("boolean")}
            />
            <Input
              {...register("customBool3Name")}
              placeholder={t("boolean")}
            />
          </div>

          <Button className="bg-primary text-white grow-0!" type="submit">
            {t("submit")}
          </Button>
        </form>
      </div>
      {error && (
        <Alert
          className="absolute bottom-5 right-5 w-80 bg-danger-50!"
          color="danger"
          description={error}
          title={"Error"}
        />
      )}
      {success && (
        <Alert
          className="absolute bottom-5 right-5 w-80 bg-success-50!"
          color="success"
          description={success}
          title={"Success"}
        />
      )}
    </>
  );
}
