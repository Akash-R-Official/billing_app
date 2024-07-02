
frappe.pages['billing-page'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Billing Page',
		single_column: true
	});


	function fetchTotalQuantity() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_total_quantity',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#total-quantity').text(total);
			}
		});
	}

	function fetchTotalPrice() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_total_price',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#total-price').text(total);
			}
		});
	}

	function fetchProductQuantity() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_product_quantity',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#product-quantity').text(total);
			}
		});
	}

	function fetchProductPrice() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_product_price',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#product-price').text(total);
			}
		});
	}

	function fetchServiceQuantity() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_service_quantity',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#service-quantity').text(total);
			}
		});
	}

	function fetchServicePrice() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_service_price',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#service-price').text(total);
			}
		});
	}

	function fetchWalkInCount() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_walk_in_count',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#walk_in_count').text(total);
			}
		});
	}

	function fetchAppointments() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_appointments',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#appointments').text(total);
			}
		});
	}

	function fetchCashPayment() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_cash_payment',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#cash_payment').text(total);
			}
		});
	}

	function fetchCardPayment() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_card_payment',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#card_payment').text(total);
			}
		});
	}

	function fetchOtherPayment() {
		frappe.call({
			method: 'billing_app.billing_app.page.billing_page.billing_page.get_other_payment',
			callback: function (response) {
				// Update UI with fetched total quantity
				var total = response.message;
				$('#other_payment').text(total);
			}
		});
	}

	function fetchAndRenderChart() {
		console.log('Fetching and rendering chart...');

		return new Promise(function (resolve, reject) {
			frappe.call({
				method: 'billing_app.billing_app.page.billing_page.billing_page.get_weekly_branch_data',
				callback: function (response) {
					// Check if response contains data
					if (response && response.message) {
						// Resolve the promise with the fetched data
						resolve(response.message);
					} else {
						reject('No data received from server.');
					}
				}
			});
		}).then(function (data) {
			// Render chart with the fetched data
			renderChart(data);
		}).catch(function (error) {
			console.log(error);
		});
	}


	function make_chart(context) {
		const labels = context.labels; // Array of branch names
		const values = context.values; // Array of grand totals

		// Preparing data in the format expected by Frappe Charts
		let data = {
			labels: labels,
			datasets: [{
				name: 'Total Purchases', // Label for the dataset
				values: values
			}]
		};

		context.last_chart_type = 'bar'; // Assuming we're using a bar chart

		// Ensure the chart wrapper is visible
		context.$charts_wrapper.removeClass('hidden');

		// Check if the parent element exists before creating the chart
		const parentElement = context.$charts_wrapper.find('.charts-inner-wrapper')[0];
		if (!parentElement) {
			console.error("No parent element found to render the chart.");
			return;
		}

		// Creating the chart
		context.chart = new frappe.Chart(parentElement, {
			title: 'Purchases by Branch',
			data: data,
			type: 'bar',
			truncateLegends: 1,
			colors: ['#3498db'], // Customize chart color
			axisOptions: {
				shortenYAxisNumbers: 1
			},
			tooltipOptions: {
				formatTooltipY: value => `${value.toFixed(2)} USD` // Format tooltips to show values with 2 decimals
			}
		});
	}

	function renderChart(data) {
		console.log("Data received:", data);

		// Extracting labels and values using map function
		var labels = data.map(function (item) {
			return item.branch_name;
		});

		var values = data.map(function (item) {
			return item.total;
		});

		console.log("Labels:", labels);
		console.log("Values:", values);

		// Example usage in the context
		$(document).ready(function () {
			// Simulate the object context (`this`)
			const context = {
				labels: labels,
				values: values,
				$charts_wrapper: $('#branch-chart'), // Reference the div by id
				doctype: 'Purchases',
				make_chart: make_chart // Reference to the function
			};

			// Call the function in the context
			context.make_chart(context);
		});
	}






	fetchTotalQuantity();
	fetchTotalPrice();
	fetchProductQuantity();
	fetchProductPrice();
	fetchServiceQuantity();
	fetchServicePrice();
	fetchWalkInCount();
	fetchAppointments();
	fetchCashPayment();
	fetchCardPayment();
	fetchOtherPayment();
	fetchAndRenderChart();


	$(frappe.render_template('billing_page', {})).appendTo(page.body);



}


// var chart = new frappe.Chart("#branch-chart", {
// 	data: {
// 		labels: labels,
// 		datasets: [{
// 			name: 'Weekly Sales',
// 			values: values
// 		}]
// 	},
// 	type: 'bar',
// 	height: 300, // Adjust height as needed
// 	width: 600,
// 	colors: ['#3498db'], // Customize chart color
// 	axisOptions: {
// 		xAxisMode: 'tick', // Use tick mode for x-axis
// 		xIsSeries: true // Treat x-values as series names
// 	}
// });

// const dataa = {
// 	labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
// 		"12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
// 	],
// 	datasets: [
// 		{
// 			name: "Some Data", chartType: "bar",
// 			values: [25, 40, 30, 35, 8, 52, 17, -4]
// 		},
// 		{
// 			name: "Another Set", chartType: "bar",
// 			values: [25, 50, -10, 15, 18, 32, 27, 14]
// 		}
// 	]
// }

// const options = {
// 	title: "My Awesome Chart",
// 	data: dataa,
// 	type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
// 	height: 250,
// 	colors: ['#7cd6fd', '#743ee2']
// }
// const chart = new Chart("#branch-chart", options)