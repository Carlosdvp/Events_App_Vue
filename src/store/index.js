import { createStore } from 'vuex'
import { reactive } from 'vue'
import EventService from '@/services/EventService.js'

const store = createStore({
	state: {
		user: 'Julius Ceasar',
		// an empty array to hold the events
		events: [],
		event: {}
	},
	mutations: {
		// this will change the state based on new events by pushng that new event into our state events array
		ADD_EVENT(state, event) {
			state.events.push(event)
		},
		SET_EVENT(state, event) {
			state.event = event
		},
		SET_EVENTS(state, events) {
			state.events = events
		}
	},
	actions: {
		createEvent({ commit }, event) {
			// make the required API call here, to POST new events to mock DB
		  EventService.postEvent(event)
	      .then(() => {
	        // add event to Vuex state, when user clicks submit, it will commit the mutation and add the payload to our state
	        commit('ADD_EVENT', event)
	      }).catch(error => {
	        console.log(error)
	      })
		},
		// fetchEvents({ commit }) {
		// 	EventService.getEvents(2, parseInt(to.query.page) || 1)
	 //      .then(res => {
	 //        next(comp => {
	 //          // continue routing and once the component is loaded, set these values
	 //          // comp.events = res.data >> we no longer need this local object to hold the data
	 //          commit('SET_EVENTS', res.data) // we can just commit the resonse to the mutation
	 //          comp.totalEvents = res.headers['x-total-count']
	 //        })
	 //      })
	 //      .catch(() => {
	 //        // if the API all fails, load the Network Error page
	 //        next({name: 'NetworkError'})
	 //      })
		// },
		//get data for a single event
		fetchEvent({ commit, state }, id) {
			// check the events array, see if a similar event exists by looking for the id
			const exsitingEvent = state.events.find(event => event.id === id)

			if (existingEvent) {	
				commit('SET_EVENT', existingEvent)
			} else {
				EventService.getEvent(id)
					.then(response => {
						commit('SET_EVENT', response.data)
					})
					.catch(error => console.log(error))
			}
		}
	}
})

// export default reactive({ flashMessage: '', event: null })

export default store

