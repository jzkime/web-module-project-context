import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

import { ProductContext } from './contexts/ProductContext'
import { CartContext } from './contexts/CartContext'

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(() => {
		const getCart = localStorage.getItem("cart");
		return getCart ? JSON.parse(getCart) : []
	});

	const addItem = item => {
		const add = cart.find(ct => ct.id === item.id)
		!add && setCart([...cart, item])
	};

	const removeItem = id => {
		const filteredCart = cart.filter(ct => ct.id !== id)
		setCart(filteredCart);
	}

	useEffect(() => {
		cart && localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart])

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem}}>
				<CartContext.Provider value={{cart, removeItem}}>
					<Navigation />

					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
