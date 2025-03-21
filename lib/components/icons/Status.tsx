import Image from "next/image";

interface StatusProps {
	status: "attempted" | "completed";
	isActive: boolean;
}

export default function Status({ status, isActive }: StatusProps) {
	const getStatusSrc = () => {
		if (isActive) return `/assets/svgs/Status_${status}_active.svg`;
		return `/assets/svgs/Status_${status}_inactive.svg`;
	};

	return <Image src={getStatusSrc()} alt="Status" width={24} height={24} />;
}
