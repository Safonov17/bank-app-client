import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './statistics-item.module.scss'
import template from './statistics-item.template.html'
import { $R } from '@/core/rquery/rquery.lib'

export class StatisticsItem extends ChildComponent {
	constructor(label, value, variant) {
		super()

		if (!label || !value || !variant)
			throw new Error('Label, value and variant=(purple or green) required!')

		this.label = label
		this.value = value
		this.variant = variant
	}
	render() {
		this.element = renderService.HTMLToElement(template, styles, [])

		$R(this.element).addClass(styles[this.variant]).addClass('fade-in')
		$R(this.element).find('#statistics-label').text(this.label)
		$R(this.element).find('#statistics-value').text(this.value)

		return this.element
	}
}
