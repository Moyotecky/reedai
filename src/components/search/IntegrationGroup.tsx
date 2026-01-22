import type { Integration } from "@/lib/CONSTANTS";

interface IntegrationGroupProps {
    items: Integration[];
    groupIndex: number;
}

interface ListItemProps {
    item: Integration;
    groupIndex: number;
    index: number;
}

const IntegrationGroup = ({ items, groupIndex }: IntegrationGroupProps) => {
    return (
        <div className="">
            {groupIndex === 1 && <p className="font-semibold">Integrates with</p>}

            <ul className="mt-1 space-y-1">
                {items.map((item, index) => (
                    <ListItem
                        key={item.name}
                        item={item}
                        groupIndex={groupIndex}
                        index={index}
                    />
                ))}
            </ul>
        </div>
    );
};

export default IntegrationGroup;

// --- Sub Component ---
const ListItem = ({ item, groupIndex, index }: ListItemProps) => {
    return (
        <>
            {/* When this is group 2 and item index 2 then only display second label */}
            {groupIndex === 2 && index === 2 && <li className="font-semibold">Coming soon</li>}

            <li
                key={item.name}
                className="flex items-center gap-2 text-white-70 text-sm">
                <img
                    src={item.icon_url}
                    alt={item.name}
                    className="w-4"
                />
                <span>{item.name}</span>
            </li>
        </>
    );
};
