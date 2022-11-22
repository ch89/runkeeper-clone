<template>
	<div class="bg-gray-100 overflow-auto">
		<header class="flex items-center justify-between p-4 bg-teal-400 text-white text-lg sticky top-0 z-10">
			<button>
				<i class="fas fa-bars"></i>
			</button>
			<h3 class="font-bold">Feed</h3>
			<button>
				<i class="fas fa-user"></i>
			</button>
		</header>
		<div class="grid gap-4" v-if="activities.length">
			<activity v-for="activity in activities" :key="activity.id" :activity="activity"></activity>
		</div>
		<p v-else>No activities yet.</p>
	</div>
</template>

<script>
	import Activity from "../components/Activity.vue"
	import { mapState } from "vuex"
	
	export default {
		components: { Activity },
		computed: mapState(["activities"])
	}
</script>