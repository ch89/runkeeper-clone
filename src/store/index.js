import { createStore } from "vuex"

export default createStore({
	state() {
		return {
			activities: []
		}
	},
	mutations: {
		save(state, activity) {
			state.activities.unshift(activity)
		}
	}
})