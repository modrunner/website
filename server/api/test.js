export default defineEventHandler(async (event) => {
	return await fetch(`https://api.modrinth.com/`).then(
		async (res) => await res.json()
	);
});
