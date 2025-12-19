import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'my-interface',
	name: 'My Custom Interface',
	icon: 'box',
	description: 'A simple custom interface example',
	component: InterfaceComponent,
	types: ['string'],
	options: [
		{
			field: 'placeholder',
			name: 'Placeholder',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'full',
			},
		},
	],
});
