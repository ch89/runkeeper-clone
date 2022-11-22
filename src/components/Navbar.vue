<template>
	<nav class="p-4 border-t flex items-center justify-between text-center text-gray-400">
		<router-link to="/">
			<i class="far fa-smile-wink text-lg"></i>
			<h4 class="text-sm">Me</h4>
		</router-link>
		<router-link to="/training">
			<i class="far fa-check-square text-lg"></i>
			<h4 class="text-sm">Training</h4>
		</router-link>
		<router-link to="/start">
			<i class="fas fa-map-marker-alt text-lg"></i>
			<h4 class="text-sm">Start</h4>
		</router-link>
		<router-link to="/feed">
			<i class="far fa-heart text-lg"></i>
			<h4 class="text-sm">Feed</h4>
		</router-link>
		<router-link to="/explore">
			<i class="fas fa-mountain text-lg"></i>
			<h4 class="text-sm">Explore</h4>
		</router-link>
	</nav>
</template>

<style scoped>
	.router-link-active {
		@apply text-teal-400;
	}
</style>