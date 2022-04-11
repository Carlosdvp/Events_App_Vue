import { createStore } from 'vuex'
import { reactive } from 'vue'

const store = createStore({
	state: {
		user: 'Julius Ceasar',
		// an empty array to hold the events
		events: []
	},
	mutations: {
		// this will change the state based on new events by pushng that new event into our state events array
		ADD_EVENT(state, event) {
			state.events.push(event)
		}
	},
	actions: {},
	modules: {}
})

// export default reactive({ flashMessage: '', event: null })

export default store

