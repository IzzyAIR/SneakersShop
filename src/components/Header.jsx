import React from 'react';
import AppContext from '../context';
import { Link } from 'react-router-dom';

function Header(props) {
	const { cardItems = [] } = React.useContext(AppContext);
	const totalPrice = cardItems.reduce((sum, obj) => obj.price + sum, 0);

	return (
		<header className='d-flex justify-between align-center'>
			<Link to='/'>
				<div className='d-flex align-center'>
					<img width={40} height={40} src='/React-Img/logo-head.png' alt='Logo' />
					<div>
						<h3 className='text-uppercase'>IzzyAIR Sneakers</h3>
						<p className='opacity-5'>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>

			<ul className='headerRight d-flex align-center'>
				<li className='mr-30 d-flex ' onClick={props.onCart}>
					<img className='cu-p mr-20' src='/React-Img/cart.svg' alt='Cart' />
					<span className='opacity-7 cu-p'>
						{new Intl.NumberFormat('ru-RU').format(totalPrice)} сум
					</span>
				</li>
				<li className='d-flex mr-10'>
					<Link to='/favorite'>
						<img
							className='cu-p'
							src='/React-Img/fav.svg'
							alt='FavIcon'
							onClick={props.onFav}
						/>
					</Link>
				</li>
				<li className='d-flex'>
					<img className='cu-p' src='/React-Img/user.svg' alt='UserIcon' />
				</li>
			</ul>
		</header>
	);
}
export default Header;
