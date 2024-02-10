'use client';

interface CopyButtonProps {
  children: React.ReactNode;
  textToCopy: string;
}

const CopyButton = ({ children, textToCopy }: CopyButtonProps) => {

	const handleCopy = () => {
		navigator.clipboard.writeText(textToCopy);
	};
  
	return (
		<div onClick={handleCopy}>
			{children}
		</div>
	);
};

export default CopyButton;