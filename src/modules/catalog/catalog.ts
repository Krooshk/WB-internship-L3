import { Component } from '../component';
import html from './catalog.tpl.html';
import { ProductList } from '../productList/productList';
import { hintsComp } from '../hints/hints';

class Catalog extends Component {
	productList: ProductList;
	constructor(props: any) {
		super(props);
		this.productList = new ProductList();
		this.productList.attach(this.view.products);

	}



	async render() {
		const productsResp = await fetch('/api/getProducts');
		const products = await productsResp.json();
		this.productList.update(products);
		let threeProduct = products.slice(0,3);
		hintsComp.before(this.view.products, threeProduct);
	}
}

export const catalogComp = new Catalog(html);
