<template>
	<div class="bg-white shadow-md">
		<div class="flex items-center gap-4 p-4">
			<img src="/images/ch.png" alt="Avatar" class="w-12 rounded-full">
			<div>
				<h3 class="font-semibold text-gray-700">Christian</h3>
				<p class="text-sm text-gray-400">{{ activity.type }} - {{ activity.date }}</p>
			</div>
		</div>
		<div class="grid grid-cols-3 text-center text-gray-700 text-sm">
			<div>{{ activity.distance }} km</div>
			<div>{{ activity.time }} time</div>
			<div>5:42 min/km</div>
		</div>
		<div class="relative">
			<div :id="`activity-${activity.id}`" class="w-full h-56 mt-4"></div>
			<button class="absolute top-4 right-4 bg-teal-400 text-white w-8 h-8 rounded-full text-sm" @click="zoom">
				<i class="fas fa-search"></i>
			</button>
		</div>
		<div class="flex items-center gap-4 p-4">
			<button @click="like">
				<i class="fa-heart" :class="activity.liked ? 'fas text-red-400' : 'far text-teal-400'"></i>
			</button>
			<button class="text-teal-400">
				<i class="far fa-comment"></i>
			</button>
			<div class="flex items-center gap-2 ml-auto">
				<div class="flex flex-row-reverse -space-x-4 space-x-reverse hover:space-x-0">
					<img :src="like" alt="Avatar" class="w-8 rounded-full border-2 border-white transition-all" v-for="like in likes">
				</div>
				<span class="text-sm text-gray-700">{{ likes.length }} Likes</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["activity"],
		mounted() {
			this.map = L.mapbox.map(`activity-${this.activity.id}`, "mapbox.dark")
			this.polyline = L.polyline(this.activity.path, { color: "red" }).addTo(this.map)

			L.marker(this.activity.path[0], {
				icon: L.divIcon({ className: "fas fa-map-marker-alt text-green-400" })
			}).addTo(this.map)
			
			L.marker(this.activity.path[this.activity.path.length - 1], {
				icon: L.divIcon({ className: "fas fa-map-marker-alt text-red-400" })
			}).addTo(this.map)

			this.zoom()
		},
		unmounted() {
			this.map.remove()
		},
		methods: {
			like() {
				this.activity.liked = ! this.activity.liked

				this.activity.liked ? this.likes.push("/images/ch.png") : this.likes.splice(this.likes.indexOf("/images/ch.png"), 1)
			},
			zoom() {
				this.map.fitBounds(this.polyline.getBounds())
			}
		},
		data() {
			return {
				likes: [
					"/images/avatar1.jpg", 
					"/images/avatar2.jpg", 
					"/images/avatar3.jpg"
				]
			}
		}
	}
</script>