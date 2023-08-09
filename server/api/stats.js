export default defineEventHandler(async (event) => {
	return await fetch(`${useRuntimeConfig().apiUrl}/stats`, {
		headers: {
			'x-api-key': useRuntimeConfig().apiKey,
		},
	})
		.then((res) => {
			console.log(
				`Fetched statistics:\nStatus: ${res.status} ${res.statusText}\nURL: ${res.url}`
			);
			return res;
		})
		.then(async (res) => {
			return await res.json();
		})
		.catch((error) => {
			console.log('/server/api/stats.js -', error);
		});
});
