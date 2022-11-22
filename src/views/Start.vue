<template>
	<div class="flex flex-col relative">
		<header class="flex items-center justify-between p-4 border-b text-teal-400">
			<div class="relative">
				<button class="text-lg" @click="show = ! show">
					<i class="fas fa-cog"></i>
				</button>
				<!-- <div class="absolute z-10 bg-white rounded-lg shadow-md text-sm p-4 grid gap-4" v-show="show">
					<div v-for="map in maps" :key="map.id" class="flex items-center gap-4">
						<input type="radio" name="map" :id="map.id" :value="map.type" @click="change">
						<label :for="map.id">{{ map.title }}</label>
					</div>
				</div> -->
				<div class="absolute z-10 shadow-md rounded-lg bg-white p-4 text-sm grid gap-4" v-show="show">
					<div v-for="map in maps" :key="map.id" @click="change(map.style)">
						{{ map.title }}
						<!-- <i class="fas fa-check"></i> -->
					</div>
				</div>
			</div>
			<img src="/images/logo.png" alt="Logo" class="w-40">
			<button class="text-lg" @click="save">
				<i class="fas fa-plus"></i>
			</button>
		</header>
		<nav class="p-4 border-b flex text-center text-sm text-gray-400">
			<router-link to="/" class="flex-1">Quickstart</router-link>
			<router-link to="/" class="flex-1">Guided Workouts</router-link>
		</nav>
		<div id="map" class="w-full flex-1"></div>
		<!-- <button ref="marker" class="text-red-400 text-4xl absolute">
			<i class="fas fa-map-marker-alt"></i>
		</button> -->
		<div class="absolute bottom-4 inset-x-4 grid gap-4">
			<div class="flex items-center justify-between">
				<button class="text-green-400 bg-white px-2 rounded-lg shadow-md">
					<i class="fas fa-signal"></i>
				</button>
				<button class="text-teal-400 bg-white w-8 h-8 rounded-full shadow-md">
					<i class="fas fa-wifi"></i>
				</button>
			</div>
			<div v-if="tracking" class="grid grid-cols-2 text-center bg-white rounded-lg divide-x shadow-md">
				<div class="px-4 py-2">
					<p class="text-lg font-semibold text-gray-700">{{ time }}</p>
					<h3 class="text-xs text-gray-400 uppercase">Time</h3>
				</div>
				<div class="px-4 py-2">
					<p class="text-lg font-semibold text-gray-700">{{ distance }}</p>
					<h3 class="text-xs text-gray-400 uppercase">Kilometers</h3>
				</div>
			</div>
			<div v-else class="grid grid-cols-2 gap-px bg-gray-200 rounded-lg overflow-hidden shadow-md">
				<button v-for="option in options" :key="option.id" class="bg-white flex items-center gap-4 px-4 py-2" @click="$data.option = option">
					<i :class="option.icon" class="text-lg text-teal-400"></i>
					<div class="text-left">
						<h3 class="text-sm text-gray-400">{{ option.title }}</h3>
						<p class="font-semibold text-gray-700">{{ option.value }}</p>
					</div>
				</button>
			</div>
			<button class="bg-orange-400 text-white py-2 rounded-full font-semibold shadow-md" @click="tracking ? stop() : start()">{{ tracking ? "Stop" : "Start" }}</button>
		</div>
	</div>

	<modal v-if="option">
		<header class="flex items-center justify-between p-4 border-b text-xl">
			<h3 class="font-semibold">Activity</h3>
			<i class="fas fa-shoe-prints text-teal-400"></i>
		</header>
		<div class="overflow-auto flex-1">
			<button v-for="activity in activities" :key="activity.id" class="flex items-center gap-4 p-4 border-b w-full" @click="option.value = activity.title">
				<i :class="activity.icon" class="text-teal-400"></i>
				<span>{{ activity.title }}</span>
				<i class="fas fa-check ml-auto text-orange-400" v-show="option.value == activity.title"></i>
			</button>
		</div>
		<button class="bg-green-400 text-white py-2 font-semibold text-xl" @click="option = null">OK</button>
	</modal>
</template>

<script>
	import Modal from "../components/Modal.vue"
	import moment from "moment"

	// let map, id, pathId, data, timer, style = localStorage.getItem("style") || "dark-v10"

	let map, marker, polyline, timer

	export default {
		components: { Modal },
		// mounted() {
		// 	this.activity = this.activities[0]

		// 	data = {
		// 		type: "Feature",
		// 		geometry: {
		// 			type: "LineString",
		// 			coordinates: []
		// 		}
		// 	}

		// 	navigator.geolocation.getCurrentPosition(position => {
		// 		let coords = [position.coords.longitude, position.coords.latitude]

		// 		map = new mapboxgl.Map({
		// 			container: "map",
		// 			style: `mapbox://styles/mapbox/${style}`,
		// 			center: coords,
		// 			zoom: 12
		// 		})

		// 		let poly = new mapboxgl.Polyline()

		// 		let div = document.createElement("div")
		// 		div.className = "marker"
				
		// 		let marker = new mapboxgl.Marker(div)
		// 			.setLngLat(coords)
		// 			.setPopup(new mapboxgl.Popup({ offset: 10, padding: 10 }).setHTML("<img src='/images/ch.png' class='w-12'>"))
		// 			.addTo(map)

		// 		map.on("load", () => {
		// 			map.addSource("route", { type: "geojson", data })

		// 			map.addLayer({
		// 				id: "route",
		// 				type: "line",
		// 				source: "route",
		// 				paint: {
		// 					"line-color": "yellow",
		// 					"line-width": 5
		// 				}
		// 			})
		// 		})

		// 		id = navigator.geolocation.watchPosition(position => {
		// 			let coords = [position.coords.longitude, position.coords.latitude]

		// 			marker.setLngLat(coords)
		// 			map.panTo(coords)
		// 		})
		// 	})
		// },
		// beforeUnmount() {
		// 	navigator.geolocation.clearWatch(id)

		// 	this.stop()

		// 	map.remove()
		// },
		computed: {
			time() {
				let minutes = Math.floor(this.count / 60).toString().padStart(2, "0"),
					seconds = Math.floor(this.count % 60).toString().padStart(2, "0")

				return `${minutes}:${seconds}`
			}
		},
		// methods: {
		// 	change(style) {
		// 		map.setStyle(`mapbox://styles/mapbox/${style}`)

		// 		localStorage.setItem("style", style)
		// 	},
		// 	start() {
		// 		this.action = "stop"

		// 		data.geometry.coordinates = []
		// 		map.getSource("route").setData(data)
				
		// 		this.distance = 0
		// 		this.count = 0

		// 		timer = setInterval(() => this.count++, 1000)

		// 		this.pathId = navigator.geolocation.watchPosition(position => {
		// 			let coords = [position.coords.longitude, position.coords.latitude]

		// 			data.geometry.coordinates.push(coords)
		// 			map.getSource("route").setData(data)

		// 			this.distance = turf.length(data).toFixed(2)
		// 		})
		// 	},
		// 	stop() {
		// 		this.action = "save"

		// 		navigator.geolocation.clearWatch(this.pathId)
				
		// 		this.pathId = null

		// 		clearInterval(timer)
		// 	},
		// 	save() {
		// 		this.$store.commit("save", {
		// 			id: this.$store.state.activities.length + 1,
		// 			distance: this.distance,
		// 			time: this.time,
		// 			type: this.options[0].value,
		// 			date: moment(new Date()).format("MMM DD, YYYY"),
		// 			data
		// 		})

		// 		this.$router.push({ name: "feed" })
		// 	},
		// 	capitalize(str) {
		// 		return str[0].toUpperCase() + str.slice(1)
		// 	}
		// },
		data() {
			return {
				options: [
					{ id: 1, title: "Activity", value: "Running", icon: "fas fa-shoe-prints" },
					{ id: 2, title: "Workout", value: "None", icon: "far fa-calendar-alt" },
					{ id: 3, title: "Music", value: "None", icon: "fas fa-music" },
					{ id: 4, title: "Audio Stats", value: "5 min", icon: "fas fa-volume-up" },
				],
				option: null,
				maps: [
					{ id: 1, title: "Streets", style: "streets-v11" },
					{ id: 2, title: "Light", style: "light-v10" },
					{ id: 3, title: "Dark", style: "dark-v10" },
					{ id: 4, title: "Satellite", style: "satellite-v9" },
				],
				show: false,
				tracking: false,
				distance: 0,
				count: 0,
				action: "start",
				activities: [
					{ id: 1, title: "Running", icon: "fas fa-running" },
					{ id: 2, title: "Cycling", icon: "fas fa-biking" },
					{ id: 3, title: "Walking", icon: "fas fa-walking" },
					{ id: 4, title: "Swimming", icon: "fas fa-swimmer" },
				]
			}
		},
		// mounted() {
		// 	map = L.map("map")
		// 		.addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/dark-v10"))

		// 	let marker = L.marker([0, 0]).addTo(map)

		// 	polyline = L.polyline([], { color: "orange", opacity: .75 }).addTo(map)

		// 	map.locate({ watch: true, setView: true })

		// 	map.on("locationfound", e => marker.setLatLng(e.latlng))
		// },
		// unmounted() {
		// 	map.stopLocate().remove()
		// },
		// methods: {
		// 	capitalize(str) {
		// 		return str[0].toUpperCase() + str.slice(1)
		// 	},
		// 	start() {
		// 		polyline.setLatLngs([])

		// 		map.on("locationfound", track)
		// 	},
		// 	stop() {
		// 		map.off("locationfound", track)
		// 	},
		// 	save() {
		// 		this.$store.commit("save", {
		// 			id: this.$store.state.activities.length + 1,
		// 			type: "Running",
		// 			distance: 3,
		// 			time: "1:23",
		// 			date: moment(new Date()).format("MMM DD, YYYY"),
		// 			polyline
		// 		})

		// 		this.$router.push({ name: "feed" })
		// 	}
		// }
		mounted() {
			map = L.mapbox.map("map", "mapbox.dark")

			let icon = L.divIcon({ className: "marker", iconSize: [16, 16] })

			marker = L.marker([0, 0], { icon })
				.bindPopup("<img src='/images/ch.png'>", { closeButton: false })
				.addTo(map)

			polyline = L.polyline([], { color: "red" }).addTo(map)

			// map.setView(e.latlng, 10)
			// map.panTo(e.latlng)

			map.locate({ watch: true, setView: true })
				// .once("locationfound", e => marker = L.marker(e.latlng).addTo(map))
				.on("locationfound", e => marker.setLatLng(e.latlng))
		},
		unmounted() {
			map.stopLocate().remove()
		},
		methods: {
			track(e) {
				polyline.addLatLng(e.latlng)

				this.distance = turf.length(polyline.toGeoJSON()).toFixed(2)
			},
			start() {
				this.tracking = true

				timer = setInterval(() => this.count++, 1000)

				map.on("locationfound", this.track)
			},
			stop() {
				this.tracking = false

				clearInterval(timer)

				map.off("locationfound", this.track)
			},
			save() {
				this.$store.commit("save", {
					id: this.$store.state.activities.length + 1,
					type: "Running",
					date: moment(new Date()).format("MMM DD, YYYY"),
					distance: this.distance,
					time: this.time,
					path: polyline.getLatLngs()
				})

				this.$router.push({ name: "feed" })
			}
		}
	}
</script>

<style>
	.marker {
		@apply bg-blue-400 w-4 h-4 absolute rounded-full border-2 border-white;
	}

	.leaflet-popup-content {
		padding: 5px;
	}
</style>