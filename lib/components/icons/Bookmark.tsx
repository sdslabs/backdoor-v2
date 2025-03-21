import Image from "next/image";

interface BookmarkProps {
	hover: boolean;
	active: boolean;
}

export default function Bookmark({ hover, active }: BookmarkProps) {
	const getBookmarkSrc = () => {
		if (active && hover) return "/assets/svgs/bookmark_hoffaon.svg";
		if (active && !hover) return "/assets/svgs/bookmark_honaon.svg";
		if (!active && hover) return "/assets/svgs/bookmark_hoffaoff.svg";
		return "/assets/svgs/bookmark_honaoff.svg";
	};

	return <Image src={getBookmarkSrc()} alt="Bookmark" width={24} height={24} />;
}
