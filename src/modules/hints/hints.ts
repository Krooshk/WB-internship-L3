import html from './hints.tpl.html';
import { Component } from '../component';

export class Hints extends Component {
	constructor(props: any) {
		super(props);
	}


	before($root: HTMLElement) {
		$root.before(this.view.root);
	}

	render() {
	}
}

export const hintsComp = new Hints(html);
