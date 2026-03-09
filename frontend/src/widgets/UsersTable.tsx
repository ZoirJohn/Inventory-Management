import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useTranslation } from "react-i18next";
import useUsers from "@/entities/hooks/useUsers";
import { Alert } from "@heroui/alert";
import { client } from "@/entities/client";
import { UserProvider } from "@/shared/UserProvider";

export default function UsersTable() {
	const { t } = useTranslation();
	const { user,refetch } = useContext(UserProvider);
	const { users, loading, error } = useUsers();
	const [localError, setLocalError] = useState("");
	useEffect(() => {
		if (!localError) return;
		const timer = setTimeout(() => setLocalError(""), 5000);
		return () => clearTimeout(timer);
	}, [localError]);

	const columns = [
		{ key: "name", label: t("name") },
		{ key: "email", label: t("email") },
		{ key: "role", label: t("role") },
		{ key: "actions", label: t("actions") },
	];

	if (loading) return <div className="container">Loading...</div>;
	if (user == null || (user && user.role != "ADMIN")) return <Navigate to="/inventories" />;

	const dropdownActions = (userId: string) => ({
		makeAdmin: () =>
			client
				.GRANT(userId)
				.catch((e) => setLocalError(e.message))
				.finally(refetch),
		removeAdmin: () =>
			client
				.REVOKE(userId)
				.catch((e) => setLocalError(e.message))
				.finally(refetch),
		deleteUser: () =>
			client
				.DELETE_USER(userId)
				.catch((e) => setLocalError(e.message))
				.finally(refetch),
		blockUser: () =>
			client
				.BAN(userId)
				.catch((e) => setLocalError(e.message))
				.finally(refetch),
		unblockUser: () =>
			client
				.UNBAN(userId)
				.catch((e) => setLocalError(e.message))
				.finally(refetch),
	});

	return (
		<>
			<Table aria-label="Example table with dynamic content">
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.key} className="text-base">
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={columns}>
					{users.map((item: TUser) => {
						return (
							<TableRow key={item.email}>
								{columns.map((col) => {
									return <TableCell key={col.label}>{col.key == "actions" ? <DropdownButton {...dropdownActions(item.id)} /> : item[col.label.toLowerCase() as keyof TUser]}</TableCell>;
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			{(error || localError) && <Alert className="absolute bottom-5 right-5 w-80 bg-danger-50!" color="danger" description={error || localError} title={"Error"} />}
		</>
	);
}

function DropdownButton({ deleteUser, makeAdmin, removeAdmin, blockUser, unblockUser }: { deleteUser: () => void; makeAdmin: () => void; removeAdmin: () => void; blockUser: () => void; unblockUser: () => void }) {
	return (
		<Dropdown>
			<DropdownTrigger className="cursor-pointer">
				<Button className="bg-transparent">
					<svg className="w-6 dark:fill-white bg-transparent" viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
						<path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
					</svg>
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Action event example">
				<DropdownItem key="make-admin" className="flex flex-nowrap" startContent={<AdminIcon />} onClick={makeAdmin}>
					Make ADMIN
				</DropdownItem>
				<DropdownItem key="remove-admin" startContent={<UserIcon />} onClick={removeAdmin}>
					Remove ADMIN
				</DropdownItem>
				<DropdownItem key="block-user" className="flex flex-nowrap" startContent={<BlockIcon />} onClick={blockUser}>
					Block user
				</DropdownItem>
				<DropdownItem key="unblock-user" startContent={<UnblockIcon />} onClick={unblockUser}>
					Unblock user
				</DropdownItem>
				<DropdownItem key="delete-user" className="text-danger" color="danger" startContent={<RemoveIcon />} onClick={deleteUser}>
					Delete user
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}

function AdminIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6">
			<path d="M256 312C322.3 312 376 258.3 376 192C376 125.7 322.3 72 256 72C189.7 72 136 125.7 136 192C136 258.3 189.7 312 256 312zM226.3 368C127.8 368 48 447.8 48 546.3C48 562.7 61.3 576 77.7 576L329.2 576C293 533.4 272 478.5 272 420.4L272 389.3C272 382 273 374.8 274.9 368L226.3 368zM477.3 552.5L464 558.8L464 370.7L560 402.7L560 422.3C560 478.1 527.8 528.8 477.3 552.6zM453.9 323.5L341.9 360.8C328.8 365.2 320 377.4 320 391.2L320 422.3C320 496.7 363 564.4 430.2 596L448.7 604.7C453.5 606.9 458.7 608.1 463.9 608.1C469.1 608.1 474.4 606.9 479.1 604.7L497.6 596C565 564.3 608 496.6 608 422.2L608 391.1C608 377.3 599.2 365.1 586.1 360.7L474.1 323.4C467.5 321.2 460.4 321.2 453.9 323.4z" />
		</svg>
	);
}
function UserIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6">
			<path d="M286.1 368C384.6 368 464.4 447.8 464.4 546.3C464.4 562.7 451.1 576 434.7 576L78.1 576C61.7 576 48.4 562.7 48.4 546.3C48.4 447.8 128.2 368 226.7 368L286.1 368zM562.3 172.1C571.7 162.7 586.9 162.7 596.2 172.1C605.5 181.5 605.6 196.7 596.2 206L562.3 239.9L596.2 273.8C605.6 283.2 605.6 298.4 596.2 307.7C586.8 317 571.6 317.1 562.3 307.7L528.4 273.8L494.5 307.7C485.1 317.1 469.9 317.1 460.6 307.7C451.3 298.3 451.2 283.1 460.6 273.8L494.5 239.9L460.6 206C451.2 196.6 451.2 181.4 460.6 172.1C470 162.8 485.2 162.7 494.5 172.1L528.4 206L562.3 172.1zM256.4 312C190.1 312 136.4 258.3 136.4 192C136.4 125.7 190.1 72 256.4 72C322.7 72 376.4 125.7 376.4 192C376.4 258.3 322.7 312 256.4 312z" />
		</svg>
	);
}
function RemoveIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 fill-danger group-hover:fill-black">
			<path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L343.5 309.7C398.5 298.8 440 250.2 440 192C440 125.7 386.3 72 320 72C261.8 72 213.2 113.5 202.3 168.5L73 39.1zM267.6 369.4C179.9 380.6 112 455.5 112 546.3C112 562.7 125.3 576 141.7 576L474.2 576L267.6 369.4z" />
		</svg>
	);
}
function BlockIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6">
			<path d="M431.2 476.5L163.5 208.8C141.1 240.2 128 278.6 128 320C128 426 214 512 320 512C361.5 512 399.9 498.9 431.2 476.5zM476.5 431.2C498.9 399.8 512 361.4 512 320C512 214 426 128 320 128C278.5 128 240.1 141.1 208.8 163.5L476.5 431.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320z" />
		</svg>
	);
}
function UnblockIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6">
			<path d="M256 160C256 124.7 284.7 96 320 96C351.7 96 378 119 383.1 149.3C386 166.7 402.5 178.5 420 175.6C437.5 172.7 449.2 156.2 446.3 138.7C436.1 78.1 383.5 32 320 32C249.3 32 192 89.3 192 160L192 224C156.7 224 128 252.7 128 288L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 288C512 252.7 483.3 224 448 224L256 224L256 160z" />
		</svg>
	);
}
