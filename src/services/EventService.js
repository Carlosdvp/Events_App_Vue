// import Axios
import axios from 'axios'

// setup the api endpoint for the dummy DB
const apiClient = axios.create({
	baseURL: 'https://my-json-server.typicode.com/Carlosdvp/events_app_vue',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// export the api client's method
export default {
  getEvents() {
    return apiClient.get('/events')
  },
	// call to the DB for a specific event
	getEvent(id) {
		return apiClient.get('/events/' + id)
	}
}