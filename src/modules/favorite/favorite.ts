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
		this.favoriteProducts.attach(this.view.favorite);
	}

	async render() {
		let products = await favoriteService.get();
		this.favoriteProducts.update(products);

	}

}

export const favoriteComp = new Favorite(html);



