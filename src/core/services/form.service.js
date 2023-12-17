export class FormService {
	/**
	 * Retrieves the values of input elements within a form element
	 * @param {HTMLFormElement} formElement - the form element containing input elements
	 * @returns {object} - an object containing the input elements name as the key and it's value as the value
	 */
	getFormValues(formElement) {
		const inputs = formElement.querySelectorAll('input')
		const values = {}

		for (const input of inputs) {
			values[input.name] = input.value
		}

		return values
	}
}

export default new FormService()
