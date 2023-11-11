const Loading = () => {
	return (
		<div className="grid grid-cols-[repeat(5,10px)] gap-1 ">
			{Array.from({ length: 5 }).map((_, index) => (
				<div
					key={index}
					className={`bg-blue-600 rounded-full w-2.5 h-2.5 animate-scalling-dots`}
					style={{
						animationDelay: `0.${index + 1}s`,
					}}></div>
			))}
		</div>
	);
};

export default Loading;
