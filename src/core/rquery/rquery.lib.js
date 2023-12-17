import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

/**
 * Represents the RQuery class for working with DOM element
 */
class RQuery {
	/**
	 * Create a new RQuery instance
	 * @param {string|HTMLElement} selector - A css selector string or an HTMLElement
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type')
		}
	}

	/**
	 * Find the first element that matches the specified selector within the selected element
	 * @param {string} selector - A css selector string to search for within the selected element
	 * @returns {RQuery} - A new RQuery instance for the found element
	 */
	find(selector) {
		const element = new RQuery(this.element.querySelector(selector))

		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found`)
		}
	}

	/**
	 * Find all elements that match the specified selector within the selected element
	 * @param {string} selector - A css selector string to search for within the selected element
	 * @returns {RQuery[]} - An array of new RQuery instances for the found elements
	 */
	findAll(selector) {
		const elements = this.element.querySelectorAll(selector)
		return Array.from(elements).map(element => new RQuery(element))
	}

	/**
	 * Append a new element as a child of the selected element
	 * @param {HTMLElement} childElement - the new child element to append
	 * @returns {RQuery} The current RQuery instance for chaining
	 */
	append(childElement) {
		this.element.appendChild(childElement)
		return this
	}

	/**
	 * Insert a new element before the selected element
	 * @param {HTMLElement} newElement - The new element to insert before the selected element
	 * @returns {RQuery} - The current RQuery instance for chaining
	 */
	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error('Element must be HTMLElement')
		}
		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element)
			return this
		} else {
			throw new Error('Element does not have a parent element')
		}
	}

	/**
	 * Get or set the inner html of the selected element
	 * @param {string} [htmlContent]
	 * @returns {RQuery|string}
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent
			return this
		}
	}

	/**
	 * Get or set the text content of the selected element
	 * @param {string} [textContent]
	 * @returns {RQuery|string}
	 */
	text(textContent) {
		if (typeof textContent === 'undefined') {
			return this.element.textContent
		} else {
			this.element.textContent = textContent
			return this
		}
	}

	/**
	 * Add an event listener to the selected element for the specified event type
	 * @param {string} eventType - The type of event to listener for (e.g., 'click', 'input', etc.)
	 * @param {function(Event): void} callback - The event listener function to execute when the event is triggered. The function will receive the event object as it's argument
	 * @returns {RQuery} - the current RQuery instance for chaining
	 */
	on(eventType, callback) {
		if (typeof eventType !== 'string' || typeof callback !== 'function')
			throw new Error(
				'eventType must be a string and callback must be a function'
			)

		this.element.addEventListener(eventType, callback)
		return this
	}

	/**
	 * Attach a click event listener to the selected element
	 * @param {function(Event): void} callback
	 * @returns {RQuery} - the current RQuery instance for chaining
	 */
	click(callback) {
		this.element.addEventListener('click', callback)
		return this
	}

	/**
	 * Get's or set's the value of an input element
	 * @param {string} newValue - the new value to set for the input element. If not provided, the method returns the current value
	 * @returns {string|RQuery} - if newValue is provided, returns the RQuery instance. Otherwise, returns the current value of the input element
	 */
	value(newValue) {
		if (typeof newValue === 'undefined') {
			return this.element.value
		} else {
			this.element.value = newValue
			return this
		}
	}

	/**
	 * Set an event listener for the submit event of a form element
	 * @param {function(Event): void} onSubmit - The event listener for the form's submit event
	 * @returns {RQuery} - the current RQuery instance for chaining
	 */
	submit(onSubmit) {
		if (this.element.tagName.toLowerCase() === 'form') {
			this.element.addEventListener('submit', e => {
				e.preventDefault()
				onSubmit(e)
			})
		} else {
			throw new Error('Element must be a form')
		}

		return this
	}

	/**
	 * Set attribute and event listeners for an input element
	 * @param {Object} options
	 * @param {function(Event): void} [options.onInput]
	 * @param {object} [options.rest]
	 * @returns {RQuery}
	 */
	input({ onInput, ...rest }) {
		if (this.element.tagName.toLowerCase() !== 'input')
			throw new Error('Element must be an input')

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value)
		}

		if (onInput) this.element.addEventListener('input', onInput)

		return this
	}

	/**
	 * Set attributes and event listeners for a number input element
	 * @param {number} [limit]
	 * @returns {RQuery}
	 */
	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'number'
		)
			throw new Error('Element must be an input with type "number"')

		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = value
		})

		return this
	}

	/**
	 * Set attributes and event listeners for a credit card input element
	 * @param {number} [limit]
	 * @returns {RQuery}
	 */
	creditCardInput() {
		const limit = 16

		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'text'
		)
			throw new Error('Element must be an input with type "text"')

		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = formatCardNumberWithDashes(value)
		})

		return this
	}

	/**
	 * Show the selected element by removing the 'display' style property
	 * @returns {RQuery} - the current RQuery instance for chaining
	 */
	show() {
		this.element.style.removeProperty('display')
		return this
	}

	/**
	 * Hide the selected element by setting it's display style to 'none'
	 * @returns {RQuery} - the current RQuery instance for chaining
	 */
	hide() {
		this.element.style.display = 'none'
		return this
	}

	/**
	 * Set the css style of the selected element
	 * @param {string} property - the css property to set
	 * @param {string} value - the value to set for the css property
	 * @returns {RQuery} - the current RQuery instance for chaining
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Property and value must be string')
		}

		this.element.style[property] = value
		return this
	}

	/**
	 * Add a class or a list of classes to the current element
	 * @param {string | string[]} classNames
	 * @returns {RQuery}
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className)
			}
		} else {
			this.element.classList.add(classNames)
		}

		return this
	}

	/**
	 * Remove a class or a list of classes to the current element
	 * @param {string | string[]} classNames
	 * @returns {RQuery}
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className)
			}
		} else {
			this.element.classList.remove(classNames)
		}

		return this
	}

	/**
	 * Set or get the value of an attribute on the selected element
	 * @param {string} attributeName
	 * @param {string} [value]
	 * @returns {RQuery|string}
	 */
	attr(attributeName, value) {
		if (typeof attributeName !== 'string')
			throw new Error('Attribute name must be a string')
		if (typeof value === 'undefined') {
			return this.element.getAttribute(attributeName)
		} else {
			this.element.setAttribute(attributeName, value)
			return this
		}
	}

	/**
	 * Removes an attribute from the current element
	 * @param {string} attrName - the name of the attribute to remove
	 * @returns {RQuery} - returns the RQuery instance
	 */
	removeAttr(attrName) {
		if (typeof attrName !== 'string')
			throw new Error('attrName name must be a string')

		this.element.removeAttribute(attrName)

		return this
	}
}

/**
 * Create a new RQuery instance for the given selector
 * @param {string|HTMLElement} selector - A css selector string or an HTMLElement
 * @returns {RQuery} - A new RQuery instance for the given selector
 */
export function $R(selector) {
	return new RQuery(selector)
}