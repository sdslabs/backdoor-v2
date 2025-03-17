import Image from "next/image";

interface SearchProps {
  hover: boolean;
  active: boolean;
}

export default function Info({ hover, active }: SearchProps) {
  const getBookmarkSrc = () => {
    if (active && hover) return "/assets/svgs/download_hoffaon.svg";
    if (active && !hover) return "/assets/svgs/download_honaon.svg";
    if (!active && hover) return "/assets/svgs/download_hoffaoff.svg";
    return "/assets/svgs/download_honaoff.svg";
  };

  return (
    <Image
      src={getBookmarkSrc()}
      alt="Bookmark"
      width={24} 
      height={24}
    />
  );
}