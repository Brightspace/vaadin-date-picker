import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class DatePickerValidationDemos extends DemoReadyEventEmitter(DatePickerDemo(PolymerElement)) {
	static get is() {
		return 'date-picker-validation-demos';
	}
	static get template() {
		return html`
		<style include="vaadin-component-demo-shared-styles">
			:host {
				display: block;
			}
		</style>

		<h3>Using as a Form Field</h3>
		<vaadin-demo-snippet id="date-picker-validation-demos-using-as-a-form-field" when-defined="vaadin-date-picker">
			<template preserve-content="">
				<iron-form>
					<form method="post">
						<vaadin-date-picker name="date" required="" error-message="This field is required"></vaadin-date-picker>
						<vaadin-button>Submit</vaadin-button>
					</form>
				</iron-form>

				<script>
					window.addDemoReadyListener('#date-picker-validation-demos-using-as-a-form-field', function(document) {
						var form = document.querySelector('iron-form');

						form.addEventListener('iron-form-presubmit', function(e) {
							// prevent actual form submission
							e.preventDefault();
							alert('Form submitted with date: ' + form.serializeForm().date);
							return false;
						});

						var button = document.querySelector('vaadin-button');
						button.addEventListener('click', function() {
							form.submit();
						});
					});
				&lt;/script>
			</template>
		</vaadin-demo-snippet>


		<h3>Custom Validator</h3>
		<p>Extend <code>Vaadin.DatePickerElement</code> to create your own custom element,
			 then override the <code>checkValidity(value)</code> method to validate the input.</p>
		<vaadin-demo-snippet id="date-picker-validation-demos-custom-validator" ignore-ie="" when-defined="vaadin-date-picker">
			<template preserve-content="">
				<vaadin-date-picker-current-year></vaadin-date-picker-current-year>

				<script>
					window.addDemoReadyListener('#date-picker-validation-demos-custom-validator', function(document) {
						class DatePickerCurrentYearElement extends Vaadin.DatePickerElement {
							checkValidity(value) {
								var currentYear = new Date().getFullYear();
								return new Date(value).getFullYear() === currentYear;
							}
						}
						if (!customElements.get('vaadin-date-picker-current-year')) {
							customElements.define('vaadin-date-picker-current-year', DatePickerCurrentYearElement);
						}
					});
				&lt;/script>
			</template>
		</vaadin-demo-snippet>
`;
	}
}
customElements.define(DatePickerValidationDemos.is, DatePickerValidationDemos);
