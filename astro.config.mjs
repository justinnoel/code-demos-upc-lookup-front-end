export default /** @type {import('astro').AstroUserConfig} */ ({
	devOptions: {
		hostname: "0.0.0.0",
		port: 3010,
		hmrPort: 12322,
	},
	renderers: ["@astrojs/renderer-preact"],
});
