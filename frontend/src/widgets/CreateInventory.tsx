import useUser from "@/entities/hooks/useUser";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";

export default function CreateInventory() {
	const { user, loading } = useUser();
	const { register, handleSubmit } = useForm<InventoryInput>();
	const onSubmit: SubmitHandler<InventoryInput> = (data) => console.log(data);

	if (loading) return <h1>Loading...</h1>;
	if (!user.id) return <Navigate to="/" />;
	return (
		<div className="flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-64px)] container">
			<h1 className="text-4xl">Create inventory</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="flex [&>div]:flex md:[&>div]:flex-row flex-col [&>div]:flex-col [&>div]:items-end gap-4 [&>div]:gap-2 md:gap-6 w-full md:w-2/3">
				<div>
					<Input {...register("title")} placeholder="Title" required />
					<Input {...register("description")} placeholder="Description" required />
				</div>

				<div>
					<Input {...register("customString1Name")} placeholder="String" />
					<Input {...register("customString2Name")} placeholder="String" />
					<Input {...register("customString3Name")} placeholder="String" />
				</div>
				<div>
					<Input {...register("customText1Name")} placeholder="Text" />
					<Input {...register("customText2Name")} placeholder="Text" />
					<Input {...register("customText3Name")} placeholder="Text" />
				</div>
				<div>
					<Input {...register("customInt1Name")} placeholder="Integer" />
					<Input {...register("customInt2Name")} placeholder="Integer" />
					<Input {...register("customInt3Name")} placeholder="Integer" />
				</div>
				<div>
					<Input {...register("customLink1Name")} placeholder="Link" />
					<Input {...register("customLink2Name")} placeholder="Link" />
					<Input {...register("customLink3Name")} placeholder="Link" />
				</div>
				<div>
					<Input {...register("customBool1Name")} placeholder="Boolean" />
					<Input {...register("customBool2Name")} placeholder="Boolean" />
					<Input {...register("customBool3Name")} placeholder="Boolean" />
				</div>

				<Button type="submit" className="bg-primary text-white grow-0!">
					Submit
				</Button>
			</form>
		</div>
	);
}
