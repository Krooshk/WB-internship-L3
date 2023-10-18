import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import { genUUID } from '../../utils/helpers';

class Checkout extends Component {
	products!: ProductData[];

	async render() {
		this.products = await cartService.get();

		if (this.products.length < 1) {
			this.view.root.classList.add('is__empty');
			return;
		}

		this.products.forEach((product) => {
			const productComp = new Product(product, { isHorizontal: true });
			productComp.render();
			productComp.attach(this.view.cart);
		});

		const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
		this.view.price.innerText = formatPrice(totalPrice);

		this.view.btnOrder.onclick = this._makeOrder.bind(this);
	}

	private async _makeOrder() {
		await cartService.clear();

		const purchase = {
			type: 'purchase',
			payload: {
				orderId: genUUID(),
				totalPrice: Number(this.view.price.innerText.match(/\d+/)[0]), //this.view.price.innerText,
				productIds: this.products.map(el => el.id),
			}
		}
		alert(JSON.stringify(purchase));
		fetch('/api/sendEvent', {
			method: 'POST',
			body: JSON.stringify(purchase)
		});
		fetch('/api/makeOrder', {
			method: 'POST',
			body: JSON.stringify(this.products)
		});
		// window.location.href = '/?isSuccessOrder';
	}
}

export const checkoutComp = new Checkout(html);
