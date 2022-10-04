import React from 'react';
import AppContext from '../context';
import Info from './info';
import axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onCartClose }) {
	const { cardItems, onRemoveCard, setCardItems, } = React.useContext(AppContext);
	const [isCompleted, setIsCompleted] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const [orderId, setOrderId] = React.useState(null);

	const onClickOrder = async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.post(
				'https://62ea677b3a5f1572e87aba1a.mockapi.io/orders',
				{
					items: cardItems,
				},
			);
			setOrderId(data.id);
			setIsCompleted(true);
			setCardItems([]);

			for (let i = 0; i < cardItems.length; i++) {
				const item = cardItems[i];
				await axios.delete('https://62ea677b3a5f1572e87aba1a.mockapi.io/cart/' + item.id);
				await delay(1000);
			}
		} catch (error) {
			alert("Don't worry! And wait!");
		}
		setIsLoading(false);
	};
	const totalPrice = cardItems.reduce((sum, obj) => obj.price + sum, 0);

	return (
		<div className='overlay '>
			<div className='drawer'>
				<div className='d-flex mb-30 justify-between '>
					<h2>Корзина </h2>
					<img
						onClick={onCartClose}
						className='cu-p'
						src='/React-img/btnRemove.svg'
						alt='Remove Button'
					/>
				</div>

				{cardItems.length > 0 ? (
					<>
						<div className='cartItems'>
							{cardItems.map((obj) => (
								<div className='cartItem mb-20' key={obj.id}>
									<div
										style={{ backgroundImage: `url(${obj.imgUrl})` }}
										className='cartItemImg'
									></div>

									<div>
										<p className='mb-5'>{obj.title}</p>
										<b>{obj.price} сум</b>
									</div>

									<img
										onClick={() => onRemoveCard(obj.id, obj.price)}
										className='removebtn'
										src='/React-img/btnRemove.svg'
										alt='RemoveBtn'
									/>
								</div>
							))}
						</div>
						<div className='totalBlock'>
							<ul>
								<li>
									<span> Итого: </span>
									<div></div>
									<b>{new Intl.NumberFormat('ru-RU').format(totalPrice)} сум</b>
								</li>
								<li>
									<span> Налог 5%: </span>
									<div></div>
									<b>
										{new Intl.NumberFormat('ru-RU').format(
											(totalPrice / 100) * 5,
										)}{' '}
										сум
									</b>
								</li>
							</ul>

							<button
								disabled={isLoading}
								onClick={onClickOrder}
								className='greenButton'
							>
								Оформить заказ
								<img src='/React-Img/arrow.svg' alt='arrow' />
							</button>
						</div>
					</>
				) : (
					<Info
						title={isCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isCompleted
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						image={
							isCompleted ? '/React-Img/orderDone.png ' : '/React-Img/emty-cart.png '
						}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;
