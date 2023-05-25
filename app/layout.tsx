import './globals.css'
import localFont from 'next/font/local'

const gilmer = localFont({
	src: [
		{
			path: './fonts/Gilmer/Gilmer Regular.otf',
			weight: '400',
			style: 'normal'
		},
		{
			path: './fonts/Gilmer/Gilmer Bold.otf',
			weight: '700',
			style: 'normal'
		}
	]
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={gilmer.className} lang="en">
			<body>{children}</body>
		</html>
	)
}
