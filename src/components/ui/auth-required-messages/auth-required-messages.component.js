import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './auth-required-messages.module.scss'
import template from './auth-required-messages.template.html'

export class AuthRequiredMessages extends ChildComponent {
	render() {
		this.element = renderService.HTMLToElement(template, styles, [])

		return this.element
	}
}
