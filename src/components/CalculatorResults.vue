<template>

	<div class="results">
		<div class="resultsSummary">
			<h3>By utilising the Bridge Sales Enablement Agency calculator organisations can simplify the processes associated with indirect procurement and unlock significant typical savings of up to 60% of process costs.</h3>
			<p>Based on what you have told us about your process we can estimate that the following costs are being insured within your procurement processes.</p>

			<div class="continueWrap reverse">
				<router-link :to="{name: 'calculatorQuestion', params: {id: lastID}}" v-if="lastID">Go back</router-link>
			</div>
		</div>
		<div class="resultsValues">

			<div class="resultPill">
				<div class="name">Supplier & product</div>
				<div class="value">{{formatValue(supplierAndProduct)}}</div>
			</div>

			<div class="resultPill">
				<div class="name">Quotation to order process</div>
				<div class="value">{{formatValue(quotationToOrderProcess)}}</div>
			</div>

			<div class="resultPill">
				<div class="name">Expediting & receiving orders</div>
				<div class="value">{{formatValue(expeditingAndReceivingOrders)}}</div>
			</div>

			<div class="resultPill">
				<div class="name">Processing invoices</div>
				<div class="value">{{formatValue(processingInvoices)}}</div>
			</div>

			<div class="resultPill">
				<div class="name">Paying suppliers</div>
				<div class="value">{{formatValue(payingSuppliers)}}</div>
			</div>

			<div class="resultPill total">
				<div class="name">Total Process Costs (year)</div>
				<div class="value">{{formatValue(totalProcessCosts)}}</div>
			</div>

			<router-link :to="{name: 'calculatorThankYou'}" class="button">Send me this report</router-link>

		</div>
	</div>
</template>

<script lang="ts">

import { computed } from "vue"; 

export default {
	props: {
		costs: Object,
		questions: Object
	},
	setup(props){

		//get data from props
		const costs = props.costs.value;
		const questions = props.questions.value;

		//fetch first question in json
		let lastID = 0;

		if(questions){
			lastID = [...questions].reverse()[0].id;
		}

	    // supplier & product
	    let supplierAndProduct = computed(() => {
			const indentifyRequirements = costs.find(cost => cost.key === "identify_requirements");
			const requestQuotation = costs.find(cost => cost.key === "request_quotation");
			const question2 = questions.find(question => question.key === "question_2");

			let sum = 0;

			if(indentifyRequirements.active){
				sum = sum + indentifyRequirements.cost;
			}

			if(requestQuotation.active){
				sum = sum + requestQuotation.cost;
			}

			let total = 0;

			if(question2.cost){
				total = sum * question2.cost;
			}

	    	return total;
	    });

	    // quotation to order process
	    let quotationToOrderProcess = computed(() => {
			const findProducts = costs.find(cost => cost.key === "find_products");
			const raiseOrder = costs.find(cost => cost.key === "raise_order");
			const authoriseSale = costs.find(cost => cost.key === "authorise_sale");
			const payProvider = costs.find(cost => cost.key === "pay_provider");
			const question2 = questions.find(question => question.key === "question_2");

			let sum = 0;

			if(findProducts.active){
				sum = sum + findProducts.cost;
			}

			if(raiseOrder.active){
				sum = sum + raiseOrder.cost;
			}

			if(authoriseSale.active){
				sum = sum + authoriseSale.cost;
			}

			if(payProvider.active){
				sum = sum + payProvider.cost;
			}

			let total = 0;

			if(question2.cost){
				total = sum * question2.cost;
			}

	    	return total;
	    });

	    // expediting and receiving orders
	    let expeditingAndReceivingOrders = computed(() => {
			const deliverProduct = costs.find(cost => cost.key === "deliver_product");
			const question1 = questions.find(question => question.key === "question_1");

			let total = 0;

			if(question1.cost && deliverProduct.active){
				total = deliverProduct.cost * question1.cost;
			}

	    	return total;
	    });

	    // processing invoices
	    let processingInvoices = computed(() => {
			const invoiceCheck = costs.find(cost => cost.key === "invoice_check");
			const question2 = questions.find(question => question.key === "question_2");

			let total = 0;

			if(question2.cost && invoiceCheck.active){
				total = invoiceCheck.cost * question2.cost;
			}

	    	return total;
	    });

	    // paying suppliers
	    let payingSuppliers = computed(() => {
			const placeOrder = costs.find(cost => cost.key === "place_order");
			const question3 = questions.find(question => question.key === "question_3");

			let total = 0;

			if(question3.cost && placeOrder.active){
				total = placeOrder.cost * question3.cost;
			}

	    	return total;
	    });

	    // total process costs
	    let totalProcessCosts = computed(() => {
	    	let total = supplierAndProduct.value + quotationToOrderProcess.value + expeditingAndReceivingOrders.value + processingInvoices.value + payingSuppliers.value;

	    	return total;
	    });

	    //format prices
		const formatValue = (computedValue) => {
			return "£" + computedValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		};

		return {
			costs,
			questions,
			lastID,
			supplierAndProduct,
			quotationToOrderProcess,
			expeditingAndReceivingOrders,
			processingInvoices,
			payingSuppliers,
			totalProcessCosts,
			formatValue
		}
	}
}

</script>

<style scoped lang="less">

	.results {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin: 0 auto;
		padding: 50px 0 0;
		max-width: 1180px;

		.resultsSummary {
			flex: 1 1 0;
			min-width: 1px;
			padding: 0 15px;
		}

		@width: 575px;

		.resultsValues {
			flex: 0 0 @width;
			width: @width;
			max-width: @width;
			padding: 0 15px;
		}
	}

	.resultsSummary {

		h3 {
			color: var(--primary_colour);
			font-weight: bold;
			font-size: 24px;
			line-height: 32px;
			margin: 0 0 20px;
		}

		p {
			font-size: 16px;
			line-height: 20px;
			margin: 0 0 45px;
		}
	}

	.resultPill {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		margin: 0 0 8px;

		&.total {

			.name {
				background: var(--secondary_colour);
				color: #fff;
			}

			.value {
				background: #fff;
				color: unset;
			}
		}

		.name {
			flex: 1 1 0;
			min-width: 1px;
			background: #fff;
			border-top-left-radius: 1000px;
			border-bottom-left-radius: 1000px;
			padding: 10px 24px;
			font-size: 16px;
			line-height: 20px;
		}

		@pill_width: 135px;

		.value {
			flex: 0 0 @pill_width;
			width: @pill_width;
			max-width: @pill_width;
			background: var(--primary_colour);
			color: #fff;
			border-top-right-radius: 1000px;
			border-bottom-right-radius: 1000px;
			padding: 10px 20px;
			font-size: 16px;
			line-height: 20px;
		}
	}

	.button {
		background: var(--primary_colour);
		color: #fff;
		border-radius: 1000px;
		text-decoration: unset;
		font-size: 20px;
		line-height: 24px;
		padding: 8px 24px;
		margin-top: 40px;
		display: inline-block;
	}

</style>