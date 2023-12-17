import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './logout-btn.module.scss'
import template from './logout-btn.template.html'
import { $R } from '@/core/rquery/rquery.lib'
import { Store } from '@/core/store/store'

export class LogoutBtn extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
		this.user = this.store.state.user

		this.router = router
	}
	render() {
		this.element = renderService.HTMLToElement(template, styles, [])

		$R(this.element)
			.find('button')
			.click(() => {
				this.store.logout()
				this.router.navigate('/auth')
			})

		return this.element
	}
}
