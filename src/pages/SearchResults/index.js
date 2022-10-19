import React, { useCallback, useRef, useEffect} from "react";
import ListOfGifs from "components/ListOfGifs"
import Spinner from "components/Spinner"
import {useGifs} from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import {Helmet} from 'react-helmet'
import debounce from "just-debounce-it";

function SearchResults({ params }){
	const { keyword, rating } = params
	const { loading, gifs, setPage } = useGifs({ keyword,rating })
	
	const externalRef = useRef()
	const {isNearScreen} = useNearScreen({ 
		externalRef: loading ? null : externalRef, 
		once: false
	})

	const title = gifs ? `${gifs.length} resultados de ${keyword}` : ''

	/*
	Función para agregar más gifs utilizando el observer,
	useCallback() corre una función por medio de un tiempo que pones en milesegundos 
	*/
	const debounceHandleNextPage = useCallback(debounce(
		() => setPage(prevPage => prevPage + 1), 200
	), [setPage]) 

	useEffect(function () {
		if(isNearScreen) debounceHandleNextPage()
	}, [debounceHandleNextPage, isNearScreen])

	return <>
		{loading
			? <Spinner />
			: <>
				<Helmet>
					<title>{title}</title>
					<meta name="description" content="{title}" />
					<meta name="rating" content="General" />
				</Helmet>
			<div className="App-wrapper">
				<h3 className="App-title">
					{decodeURI(keyword)}
				</h3>
				<ListOfGifs gifs={gifs} />
				<div id="visor" ref={externalRef}></div>
			</div>	
			</>
		}
	</> 
}

export default SearchResults;
