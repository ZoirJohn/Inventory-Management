import { Card, CardBody, CardHeader } from "@heroui/card";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { NavLink } from "react-router-dom";

export default function InventoryLink({ title, id, description, creatorName, createdAt }: { title: string; id: string; description: string; creatorName: string; createdAt: string }) {
	const createdDate = new Date(createdAt).toLocaleDateString(localStorage.getItem("lang") || "en", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	function handleOpenMenu(e:MouseEvent){
		e.preventDefault();
		e.stopPropagation();
	}
	return (
		<NavLink to={id}>
			<Card className="w-100 p-4 gap-4 hover:shadow-lg transition-shadow group relative">
				<CardHeader className="flex gap-3 p-0">
					<h3 className="text-3xl font-semibold truncate">{title}</h3>
					<Dropdown>
						<DropdownTrigger
							onClick={handleOpenMenu}
							className="top-6 right-6 absolute"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 dark:fill-white">
								<path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
							</svg>
						</DropdownTrigger>
						<DropdownMenu variant="solid">
							<DropdownItem key="delete" className="text-danger" color="danger">
								Delete file
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardHeader>
				<CardBody className="p-0 flex flex-col gap-3">
					<div className="flex-1">
						<p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-full bg-[#006fee] dark:bg-[#86bbf7] flex items-center justify-center text-white dark:text-gray-900 text-sm font-bold">{creatorName.charAt(0).toUpperCase()}</div>
								<span className="text-base font-medium text-gray-700 dark:text-gray-300">{creatorName}</span>
							</div>
							<span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">ID: {id.slice(0, 8)}</span>
						</div>
						<div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">{createdDate}</div>
					</div>
				</CardBody>
			</Card>
		</NavLink>
	);
}
