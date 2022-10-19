import React from "react";
import "./App.css";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Details from "./pages/Detail";
import StaticContext from "./context/StaticContext";
import { GifsContextProvider } from "./context/GifsContext";
import { Route } from "wouter";

function App() {
	return (
		<StaticContext.Provider
			value={{
				name: "midudev",
				suscribeteAlCanal: true,
			}}
		>
			<div className="App">
				<GifsContextProvider>
					<Route path="/" component={Home} />
					<Route path="/search/:keyword" component={SearchResults} />
					<Route path="/gif/:id" component={Details} />
				</GifsContextProvider>
			</div>
		</StaticContext.Provider>
	);
}

export default App;
