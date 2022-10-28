import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';

function App() {
	const [items, setItems] = React.useState([]);
	const [cardItems, setCardItems] = React.useState([]);
	const [favorite, setFavorite] = React.useState([]);

	const [searchVal, setSearchVal] = React.useState('');
	const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	/*
axios.get("https://62ea677b3a5f1572e87aba1a.mockapi.io/sneakers")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://62ea677b3a5f1572e87aba1a.mockapi.io/cart")
      .then((res) => {
        setCardItems(res.data);
      });
    axios.get("https://62ea677b3a5f1572e87aba1a.mockapi.io/fav").then((res) => {
      setFavorite(res.data);
    });
*/
	React.useEffect(() => {
		async function fetchData() {
			const cartResponse = await axios.get(
				'https://62ea677b3a5f1572e87aba1a.mockapi.io/cart',
			);
			const favResponse = await axios.get('https://62ea677b3a5f1572e87aba1a.mockapi.io/fav');
			const itemsResponse = await axios.get(
				'https://62ea677b3a5f1572e87aba1a.mockapi.io/sneakers',
			);

			setIsLoading(false);
			setFavorite(favResponse.data);
			setCardItems(cartResponse.data);
			setItems(itemsResponse.data);
		}
		fetchData();
	}, []);

	const onChangeSearchInput = (event) => {
		setSearchVal(event.target.value);
	};

	const onAddToCart = (obj) => {
		axios.post('https://62ea677b3a5f1572e87aba1a.mockapi.io/cart', obj);
		setCardItems((prev) => [...prev, obj]);
	};

	const onRemoveCard = (id, price) => {
		axios.delete(`https://62ea677b3a5f1572e87aba1a.mockapi.io/cart/${id}`);
		setCardItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
	};

	const onAddToFavorite = async (obj) => {
		try {
			if (favorite.find((favObj) => Number(favObj.id) === Number(obj.id))) {
				axios.delete(`https://62ea677b3a5f1572e87aba1a.mockapi.io/fav/${obj.id}`);
				setFavorite((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post(
					'https://62ea677b3a5f1572e87aba1a.mockapi.io/fav',
					obj,
				);
				setFavorite((prev) => [...prev, data]);
			}
		} catch {
			alert('Неудалось');
		}
	};

	return (
		<AppContext.Provider
			value={{
				items,
				cardItems,
				setCardItems,
				favorite,
				onAddToFavorite,
				searchVal,
				setSearchVal,
				onChangeSearchInput,
				onAddToCart,
				isLoading,
				onRemoveCard,
				setCartOpened,
				cartOpened,
			}}
		>
			{/* onCartClose={() => setCartOpened((cartOpened) => !cartOpened)} */}
			<div className='wrapper clear'>
				{/* onCart={() => setCartOpened((cartOpened) => !cartOpened)} */}
				<Header />
				{cartOpened && <Drawer />}
				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/favorite' element={<Favorites />} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
