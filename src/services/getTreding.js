import { API_KEY, API_URL } from './settings'

const fromApiResponseToTrendig = apiResponse => {
	const {data = []} = apiResponse
	if (Array.isArray(data)){
		const gifs = data.map(image => {
			const {images, title, id} = image
			const { url } = images.downsized_medium
			return {title, id, url}
		})
		return gifs
	}
	return []
}

function getTrending({
	limit = 20,
	rating = "g",
	page = 0,
} = {}){
	const tredingURL = `${API_URL}/gifs/trending?api_key=${API_KEY}&limit=${limit}&rating=${rating}`
	
	return fetch(tredingURL)
		.then((res) => res.json())
		.then(fromApiResponseToTrendig)
}

export default getTrending;
