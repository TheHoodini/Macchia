import { MButton } from "../ui/MButton";

import IconOptions from "../../assets/options.svg";
import IconSettings from "../../assets/settings.svg";

export function Header() {

    return (
        <header className="h-16 z-10  w-full border-black border-b-[3px]">
            <div className="mx-6 h-full flex items-center  justify-between">
                <MButton
                    onClick={() => { }}
                    title="Options"
                    icon={IconOptions}
                    iconDimensions={{ width: "25px", height: "25px" }}
                />
                <h1 className="font-black text-4xl font-oswald">MACCHIA</h1>
                <MButton
                    onClick={() => { }}
                    title="Settings"
                    icon={IconSettings}
                    iconDimensions={{ width: "25px", height: "25px" }}
                />
            </div>
        </header>
    );
}