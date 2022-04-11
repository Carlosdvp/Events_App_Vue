// import Axios
import axios from 'axios'

// setup the api endpoint for the dummy DB
const apiClient = axios.create({
	baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// export the api client's method
export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
	// call to the DB for a specific event
	getEvent(id) {
		return apiClient.get('/events/' + id)
	},
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}