<template>
	<router-view></router-view>
	<navbar></navbar>
</template>

<script>
	// mapboxgl.accessToken = "pk.eyJ1IjoiY2g4OSIsImEiOiJja3pjd2R0aHEyM3N1Mm5ueHNyNTRwNmNrIn0.08seeq_5rEX1Pg_HTS7qXw"

	L.mapbox.accessToken = "pk.eyJ1IjoiY2g4OSIsImEiOiJja3pjd2R0aHEyM3N1Mm5ueHNyNTRwNmNrIn0.08seeq_5rEX1Pg_HTS7qXw"
	
	import Navbar from "./components/Navbar.vue"
	
	export default {
		components: { Navbar }
	}
</script>