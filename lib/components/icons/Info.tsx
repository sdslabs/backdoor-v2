import Image from "next/image";

interface InfoProps {
	hover: boolean;
	active: boolean;
}

export default function Info({ hover, active }: InfoProps) {
	const getInfoSrc = () => {
		if (active && hover) return "/assets/svgs/info_hoffaon.svg";
		if (active && !hover) return "/assets/svgs/info_honaon.svg";
		if (!active && hover) return "/assets/svgs/info_hoffaoff.svg";
		return "/assets/svgs/info_honaoff.svg";
	};

	return <Image src={getInfoSrc()} alt="Info" width={24} height={24} />;
}
