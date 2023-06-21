export default defineNuxtRouteMiddleware((to, from) => {
	const authCookie = useCookie('access-token');
	if (!authCookie.value) {
		return navigateTo('/login');
	}
});
