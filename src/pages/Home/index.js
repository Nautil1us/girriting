import { useState, useCallback } from "react";
import { useGifs } from 'hooks/useGifs'
import { useLocation } from "wouter";
import TredingSearches from "components/TredingSearches";
import ListOfGifs from 'components/ListOfGifs'
import SearchForm from "components/SearchForm";

function Home() {
	const [path, pushLocation] = useLocation()
	const {loading, gifs} = useGifs()

	const handleSubmit = useCallback(({keyword}) => {
		pushLocation(`/search/${keyword}`)
	}, [pushLocation])

	return (
		<>
			<SearchForm onSubmit={handleSubmit} />
			<div className="App-wrapper">
				<div className="App-main">
					<div className="App-results">
						<h3 className="App-title">Última búsqueda</h3>
						<ListOfGifs gifs={gifs} />
					</div>
					<div className="App-category">
						<TredingSearches />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
