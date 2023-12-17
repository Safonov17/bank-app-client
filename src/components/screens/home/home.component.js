import renderService from '@/core/services/render.service'
import { BaseScreen } from '@/core/component/base-screen.component'

import template from './home.template.html'
import styles from './home.module.scss'
import { CardInfo } from './card-info/card-info.component'
import { Actions } from './actions/actions.component'
import { Contacts } from './contacts/contacts.component'
import { Transactions } from './transactions/transactions.component'
import { Statistics } from './statistics/statistics.component'
import { Store } from '@/core/store/store'
import { $R } from '@/core/rquery/rquery.lib'
import { AuthRequiredMessages } from '@/components/ui/auth-required-messages/auth-required-messages.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })

		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.components = {
			cardInfo: null,
			transactions: null,
			statistics: null
		}
	}

	createOrUpdateComponent(component, componentName) {
		if (this.components[componentName]) {
			this.components[componentName].destroy()
		}
		this.components[componentName] = new component()
		return this.components[componentName]
	}

	update() {
		this.user = this.store.state.user

		if (!this.user) {
			$R(this.element).html(new AuthRequiredMessages().render().outerHTML)
		}
	}

	render() {
		const componentsToRender = [
			this.createOrUpdateComponent(CardInfo, 'card-info'),
			this.createOrUpdateComponent(Transactions, 'transactions'),
			this.createOrUpdateComponent(Statistics, 'statistics'),
			Actions,
			Contacts
		]

		this.element = renderService.HTMLToElement(
			template,
			styles,
			componentsToRender
		)

		this.update()

		return this.element
	}
}
