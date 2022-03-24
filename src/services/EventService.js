// import Axios
import axios from 'axios'

// setup the api endpoint for the dummy DB
const apiClient = axios.create({
	baseURL: '/',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-type': 'application/json'
	}
})

// export the api client's method
export default {
	getEvents() {
		return apiClient.get('/events')
	},
	// call to the DB for a specific event
	getEvents(id) {
		return apiClient.get('/events/' + id)
	}
}