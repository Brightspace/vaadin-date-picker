import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class DatePickerBasicDemos extends DemoReadyEventEmitter(DatePickerDemo(PolymerElement)) {
	static get is() {
		return 'date-picker-basic-demos';
	}
	static get template() {
		return html`
		<style include="vaadin-component-demo-shared-styles">
			:host {
				display: block;
			}
		</style>


		<h3>Date picker</h3>
		<vaadin-demo-snippet id="date-picker-basic-demos-label-and-placeholder-attributes-together">
			<template preserve-content="">
				<vaadin-date-picker label="Date" placeholder="Pick a date">
				</vaadin-date-picker>
			</template>
		</vaadin-demo-snippet>


		<h3>Pre-selected value</h3>
		<vaadin-demo-snippet id="date-picker-basic-demos-pre-selected-value">
			<template preserve-content="">
				<vaadin-date-picker label="Birthday" value="1980-08-14">
				</vaadin-date-picker>
			</template>
		</vaadin-demo-snippet>


		<h3>Disabled and readonly</h3>
		<vaadin-demo-snippet id="date-picker-basic-demos-disabled-and-readonly">
			<template preserve-content="">
				<vaadin-date-picker disabled="" label="Disabled input" value="1980-08-14"></vaadin-date-picker>
				<vaadin-date-picker readonly="" label="Readonly input" value="1980-08-14"></vaadin-date-picker>
			</template>
		</vaadin-demo-snippet>


		<h3>Initial position</h3>
		<vaadin-demo-snippet id="date-picker-basic-demos-initial-position">
			<template preserve-content="">
				<vaadin-date-picker label="Birthday" initial-position="1980-01-01">
				</vaadin-date-picker>
			</template>
		</vaadin-demo-snippet>


		<h3>Date range</h3>
		<p>Wrap two date pickers in <a href="https://vaadin.com/components/vaadin-custom-field"><code>&lt;vaadin-custom-field&gt;</code></a> to create a date range selector.</p>
		<vaadin-demo-snippet id="date-picker-basic-demos-date-range" when-defined="vaadin-date-picker">
			<template preserve-content="">
				<vaadin-custom-field label="Date range">
					<vaadin-date-picker id="start"></vaadin-date-picker>
					<vaadin-date-picker id="end"></vaadin-date-picker>
				</vaadin-custom-field>
				<p>Selected range: <span></span></p>
				<script>
					window.addDemoReadyListener('#date-picker-basic-demos-date-range', function(document) {
						const start = document.querySelector('#start');
						const end = document.querySelector('#end');
						const span = document.querySelector('span');
						const dateRange = document.querySelector('vaadin-custom-field');

						start.addEventListener('change', function() {
							end.min = start.value;

							// Open the second date picker when the user has selected a value
							if (start.value) {
								end.open();
							}
						});

						end.addEventListener('change', function() {
							start.max = end.value;
						});

						dateRange.addEventListener('change', function() {
							span.textContent = dateRange.value.trim().replace(/\\t/, ' - ');
						});
					});
				&lt;/script>
			</template>
		</vaadin-demo-snippet>


		<h3>Date picker with week numbers</h3>
		<p>Week numbers are only supported for locales that start the week on Monday.</p>
		<vaadin-demo-snippet id="date-picker-basic-demos-date-picker-with-week-numbers" when-defined="vaadin-date-picker">
			<template preserve-content="">
				<vaadin-date-picker show-week-numbers="" label="Date"></vaadin-date-picker>
				<script>
					window.addDemoReadyListener('#date-picker-basic-demos-date-picker-with-week-numbers', function(document) {
						var datepicker = document.querySelector('vaadin-date-picker');
						datepicker.set('i18n.firstDayOfWeek', 1);
					});
				&lt;/script>
			</template>
		</vaadin-demo-snippet>


		<h3>Keyboard input</h3>
		<p>You can use a 3rd party library to parse dates from the input text.</p>
		<vaadin-demo-snippet id="date-picker-basic-demos-keyboard-input" when-defined="vaadin-date-picker">
			<template preserve-content="">
				<!--
				Try typing the following examples:
				"5/13/2014"
				"today"
				"in 20 days"
				"three months from now"
				"last year"
				"in half a year"
				"next week Thursday"
				-->

				<vaadin-date-picker label="Date"></vaadin-date-picker>
				<script>
					window.addDemoReadyListener('#date-picker-basic-demos-keyboard-input', function(document) {
						var datepicker = document.querySelector('vaadin-date-picker');
						datepicker.set('i18n.parseDate', function(dateString) {
							// See if we get exactly 1 match from the month names
							var matches = datepicker.i18n.monthNames.filter(function(monthName) {
								return monthName.toLowerCase().startsWith(dateString.trim().toLowerCase());
							});
							dateString = matches.length === 1 ? matches[0] : dateString;
							// Parse the date (using a 3rd party library)
							const date = Sugar.Date.create(dateString);
							return {
								day: date.getDate(),
								month: date.getMonth(),
								year: date.getFullYear()
							};
						});
					});
				&lt;/script>
			</template>
		</vaadin-demo-snippet>
`;
	}
}
customElements.define(DatePickerBasicDemos.is, DatePickerBasicDemos);
