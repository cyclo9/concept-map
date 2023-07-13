import localFont from 'next/font/local'

const firaCode = localFont({
	src: [
		{
			path: '../../fonts/Fira Code/FiraCode-Regular.ttf',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../fonts/Fira Code/FiraCode-Bold.ttf',
			weight: '700',
			style: 'normal'
		}
	]
})

export default function Message({
	type,
	label,
	text
}: {
	type: string,
	label: string,
	text?: string
}) {
	
	
	// all messages have different icons and background color
	if (type == 'create') {
		// 'create' messages have a blue background
		return (
			<div className='grid grid-cols-[90px_auto] grid-rows-3 w-full h-[90px] bg-blue-400 rounded-lg'>
				{/* icon div */}
				<div className='flex justify-center items-center col-start-1 col-end-2 row-start-1 row-end-3 aspect-square'>
					{/* actual icon goes here */}
					<div className='w-[50px] aspect-square bg-black'>

					</div>
				</div>
				<div className={`flex items-center col-start-2 col-end-3 row-start-2 text-[11pt] ${firaCode.className}`}>{label}</div>
			</div>
		)
	} else if (type == 'update') {
		// 'update' messages have a green background
		// 'update' also has 4 rows instead of 3, to allow for both label and text
		return (
			<div className='grid grid-cols-[90px_auto] grid-rows-4 w-full h-[90px] bg-green-400 rounded-lg'>
				{/* icon div */}
				<div className='flex justify-center items-center col-start-1 col-end-2 row-start-1 row-end-4 aspect-square'>
					{/* actual icon goes here */}
					<div className='w-[50px] aspect-square bg-black'>

					</div>
				</div>
				<div className={`flex items-center col-start-2 col-end-3 row-start-2 text-[11pt] ${firaCode.className}`}>{label}</div>
				<div className={`flex items-center col-start-2 col-end-3 row-start-3 text-[11pt] ${firaCode.className}`}>{text}</div>
			</div>
		)
	} else if (type == 'delete') {
		// 'delete' messages have a red backaground
		return (
			<div className='grid grid-cols-[90px_auto] grid-rows-3 w-full h-[90px] bg-red-400 rounded-lg'>
				{/* icon div */}
				<div className='flex justify-center items-center col-start-1 col-end-2 row-start-1 row-end-3 aspect-square'>
					{/* actual icon goes here */}
					<div className='w-[50px] aspect-square bg-black'>

					</div>
				</div>
				<div className={`flex items-center col-start-2 col-end-3 row-start-2 text-[11pt] ${firaCode.className}`}>{label}</div>
			</div>
		)
	} else {
		return null
	}
}