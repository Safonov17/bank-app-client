import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './[FTName].module.scss'
import template from './[FTName].template.html'

export class <FTName | pascalcase> extends ChildComponent {
	render() {
		this.element = renderService.HTMLToElement(template, styles, [])

		return this.element
	}
}