export const Footer = () => {
	return (
		<footer className='flex items-center w-full px-5 py-8 bg-secondary'>
			<div className='flex gap-1 text-sm text-gray-400'>
				<span>
					©&nbsp;
					{new Date().getFullYear()}
				</span>
				<p>
					Copyright FSW Barber
				</p>
			</div>
		</footer>
	);
};
