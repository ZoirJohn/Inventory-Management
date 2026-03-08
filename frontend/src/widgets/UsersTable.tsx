import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useTranslation } from "react-i18next";

import { UserProvider } from "@/shared/UserProvider";
import useUsers from "@/entities/hooks/useUsers";
import { Alert } from "@heroui/alert";

export default function UsersTable() {
  const { t } = useTranslation();
  const { user } = useContext(UserProvider);
  const { users, loading,error } = useUsers();
  const columns = [
    { key: "name", label: t("name") },
    { key: "email", label: t("email") },
    { key: "role", label: t("role") },
    { key: "actions", label: t("actions") },
  ];

  if (user == null || (user && user.role == "ADMIN"))
    return <Navigate to="/inventories" />;
  if (loading) return <div className="container">Loading...</div>;

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
									return <TableCell key={col.label}>{col.key == "actions" ? <DropdownButton /> : item[col.label.toLowerCase() as keyof TUser]}</TableCell>;
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			{error && <Alert className="absolute bottom-5 right-5 w-80 bg-danger-50!" color="danger" description={error} title={"Error"} />}
		</>
  );
}

function DropdownButton() {
  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <Button className="bg-transparent">
          <svg
            className="w-6 dark:fill-white bg-transparent"
            viewBox="0 0 640 640"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => alert(key)}
      >
        <DropdownItem key="admin">Make admin</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete user
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
