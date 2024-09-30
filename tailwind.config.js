/** @type {import('tailwindcss').Config} */
export default {
content: [
	"./index.html",
	"./src/**/*.{js,ts,jsx,tsx}",
],
// added class for darkmode toggle 
darkMode: 'class',
theme: {
	extend: {
	// config for adding custom predefined colors
		colors: {
			// fire can be added to any styling class attribute that uses colors 
			fire: '#000000'
		} 

	},
},
plugins: [],
}
