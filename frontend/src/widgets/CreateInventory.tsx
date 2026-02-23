import useUser from "@/entities/hooks/useUser";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";

type Inputs = {
	example: string;
	exampleRequired: string;
};
export default function CreateInventory() {
	const { user, loading } = useUser();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	if (loading) return <h1>Loading...</h1>;
	if (!user.id) return <Navigate to="/" />;
	return (
		<div className="container">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/2 gap-4">
				<Input {...register("example")} />
				<Input {...register("exampleRequired")} />

				{errors.exampleRequired && <span>This field is required</span>}

				<Button type="submit" className="bg-primary text-white">
					Submit
				</Button>
			</form>
		</div>
	);
}
