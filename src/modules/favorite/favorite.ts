import { Component } from '../component';
import { ProductList } from '../productList/productList';
import html from './favorite.tpl.html';
// import { Product } from '../product/product';
// import { formatPrice } from '../../utils/helpers';
import { favoriteService } from '../../services/favorite.service';
// import { ProductData } from 'types';

class Favorite extends Component {

	favoriteProducts: ProductList;

	constructor(props: any) {
		super(props);

		this.favoriteProducts = new ProductList();
		this.favoriteProducts.attach(this.view.popular);
	}

	async render() {
		let products = await favoriteService.get();
		this.favoriteProducts.update(products);

	}

	//   products!: ProductData[];

	//   async render() {
	//     this.products = await favoriteService.get();

	//     if (this.products.length < 1) {
	//       this.view.root.classList.add('is__empty');
	//       return;
	//     }

	//     this.products.forEach((product) => {
	//       const productComp = new Product(product, { isHorizontal: true });
	//       productComp.render();
	//       productComp.attach(this.view.cart);
	//     });

	//     const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
	//     this.view.price.innerText = formatPrice(totalPrice);

	//   }

}

export const favoriteComp = new Favorite(html);



