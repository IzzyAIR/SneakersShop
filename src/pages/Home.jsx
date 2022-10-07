import React from 'react';
import AppContext from '../context';
import Card from '../components/Card/Card';

function Home() {
	const {
		items,
		cardItems,
		onAddToFavorite,
		searchVal,
		setSearchVal,
		onChangeSearchInput,
		onAddToCart,
		isLoading,
	} = React.useContext(AppContext);

	const rederItems = function () {
		const filtered = items.filter((item) =>
			item.title.toLowerCase().includes(searchVal.toLowerCase()),
		);

		return (isLoading ? [...new Array(10)].map((val) => (val = 1)) : filtered).map((item) => (
			<Card
				{...item}
				isInCard={!!(cardItems || []).find((v) => v.id === item.id)}
				key={item.id}
				item={item}
				loading={isLoading}
				onPlus={(obj) => {
					onAddToCart(obj);
				}}
				onFav={(obj) => {
					onAddToFavorite(obj);
				}}
			/>
		));
	};
	return (
		<div className='main content p-40'>
			<div className='d-flex align-center mb-40 justify-between'>
				<h1 className='title'>
					{searchVal ? `Поиск по запросу: ${searchVal}` : 'Все кроссовки'}
				</h1>

				<div className='searchBlock d-flex'>
					<img src='/React-img/search.svg' alt='Search' />
					<input
						onChange={onChangeSearchInput}
						value={searchVal}
						placeholder='Поиск ...'
					/>

					{searchVal && (
						<img
							onClick={() => {
								setSearchVal('');
							}}
							className='cu-p clear'
							src='/React-img/btnRemove.svg'
							alt='Clear'
						/>
					)}
				</div>
			</div>

			<div className='cardBlock'>{rederItems()}</div>
		</div>
	);
}

export default Home;
