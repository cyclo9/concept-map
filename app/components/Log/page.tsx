import { useEffect } from "react"

import Message from "./message"
import { Log } from "@/app/lib/types"

export default function Log() {

	const logs = [
		{
			type: 'create',
			label: 'New Node'
		},
		{
			type: 'update',
			label: 'Old Node',
			text: 'location: old_loc -> old_loc'
		},
		{
			type: 'delete',
			label: 'Old Node',
		}
	]

	return (
		<>
			<div className='absolute overflow-auto block w-[400px] h-[205px] bg-white z-[2] p-3'>
				<div className='flex flex-col gap-2'>
					{logs.map((log, i) => {
						return (
							<Message
								key={i}
								type={log.type}
								label={log.label}
								text={log.text}
							/>
						)
					})}
				</div>
			</div>
		</>
	)
}