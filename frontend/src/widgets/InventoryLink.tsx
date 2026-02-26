import { Card, CardBody, CardHeader } from "@heroui/card";
import { NavLink } from "react-router-dom";

export default function InventoryLink({
  title,
  id,
  description,
  creatorName,
  createdAt,
}: {
  title: string;
  id: string;
  description: string;
  creatorName: string;
  createdAt: string;
}) {
  const createdDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <NavLink to={id}>
      <Card className="w-100 p-4 gap-4 hover:shadow-lg transition-shadow">
        <CardHeader className="flex gap-3 p-0">
          <h3 className="text-3xl font-semibold truncate">{title}</h3>
        </CardHeader>
        <CardBody className="p-0 flex flex-col gap-3">
          <div className="flex-1">
            <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#006fee] dark:bg-[#86bbf7] flex items-center justify-center text-white dark:text-gray-900 text-sm font-bold">
                  {creatorName.charAt(0).toUpperCase()}
                </div>
                <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                  {creatorName}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                ID: {id.slice(0, 8)}
              </span>
            </div>
            <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
              {createdDate}
            </div>
          </div>
        </CardBody>
      </Card>
    </NavLink>
  );
}
