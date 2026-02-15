import { NavLink } from "react-router-dom";

const links = {
	inventory: "Inventory",
	settings: "Settings",
	users: "Users",
};
type TLinkKeys = keyof typeof links;

export default function Navigation() {
	return (
		<nav>
			<div className="flex justify-center items-center h-16 container">
				<ul className="flex gap-4">
					{(Object.keys(links) as TLinkKeys[]).map((key, i) => {
						return (
							<NavLink to={key} key={key + i} className="text-lg!">
								{links[key]}
							</NavLink>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
