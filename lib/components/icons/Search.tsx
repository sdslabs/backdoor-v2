import Image from "next/image";

interface SearchProps {
	hover: boolean;
	active: boolean;
}

export default function Search({ hover, active }: SearchProps) {
	const getSearchSrc = () => {
		if (active && hover) return "/assets/svgs/search_hoffaon.svg";
		if (active && !hover) return "/assets/svgs/search_honaon.svg";
		if (!active && hover) return "/assets/svgs/search_hoffaoff.svg";
		return "/assets/svgs/search_honaoff.svg";
	};

	return <Image src={getSearchSrc()} alt="Search" width={24} height={24} />;
}
