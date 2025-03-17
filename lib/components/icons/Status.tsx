import Image from "next/image";

interface SearchProps {
    status:string
}

export default function Download({ status}: SearchProps) {
  const getBookmarkSrc = () => {
    if (status) return `/assets/svgs/Status_${status}.svg`;
    return "/assets/svgs/Status_completed.svg";
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