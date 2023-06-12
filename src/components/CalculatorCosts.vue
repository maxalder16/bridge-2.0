<template>
	<div class="calculatorCosts">
		<div class="costsGrid">
			<CalculatorCostsItem v-for="cost in costs"
				:cost="cost"
				@costToggled="updateCostsTotal"
			/>
		</div>
		<div class="costsTotalFlex">
			<div class="costsTotalWrap">
				<div class="costsTotal">
					<label>Total</label>
					<div class="total">{{totalFormat}}</div> 
				</div>
			</div>
			<div class="continueWrap">
				<router-link :to="{name: 'calculatorQuestion', params: {id: firstID}}" v-if="firstID">Continue</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import { ref, computed } from "vue"; 
import CalculatorCostsItem from './CalculatorCostsItem.vue'

export default {
  	components: { CalculatorCostsItem },
	props: { 
		costs: Object,
		questions: Object
	},
	setup(props){
		let costsTotal = ref(0);

		//get data from props
		const costs = props.costs.value;
		const questions = props.questions.value;

		//fetch first question in json
		let firstID = 0;

		if(questions){
			firstID = questions[0].id;
		}

		//loop through costs to calculate total and then format
		const totalFormat = computed(() => {

			let total = 0;

			for (const item of costs) {
				if (item.active) {
					total += item.cost;
				}
			}

			costsTotal.value = total;

			return `£${costsTotal.value.toFixed(2)}`
		});
 
 		//on CalculatorCostsItem emit toggleActive
		const updateCostsTotal = (id) => { 
			const cost_item = costs.find(item => item.id === id);
			cost_item.active = !cost_item.active;
		}

		return {
			costs,
			firstID,
			costsTotal,
			totalFormat,
			updateCostsTotal
		}
	}
}

</script>

<style lang="less" scoped>

	.costsGrid {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -15px;
	}

	.calculatorCosts {
		max-width: 1040px;
		margin: 0 auto;
	}

	@width: calc(100% / 3);

	.costsTotalFlex {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 0 -15px;

		&:before {
			content: "";
			flex: 0 0 @width;
			width: @width;
			max-width: @width;
			padding: 0 15px;
		}

		.costsTotalWrap {
			flex: 0 0 @width;
			width: @width;
			max-width: @width;
			padding: 0 15px;
		}

		.continueWrap { 
			flex: 0 0 @width;
			width: @width;
			max-width: @width;
			padding: 0 15px; 
			text-align: center;
		}
	}

	.costsTotal {
		background: #fff;
		border-radius: 1000px;
		padding: 26px 30px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		box-shadow: 0px 3px 6px #00000029;

		label {
			flex: 1 1 0;
			min-width: 1px;
			font-weight: 700;
			text-transform: uppercase;
  			color: var(--secondary_colour);
  			margin: 0;
  			font-size: 16px;
  			line-height: 20px;
		}

		.total {
			margin-left: 10px;
			font-weight: 400;
			font-size: 28px;
			line-height: 16px;
  			color: var(--primary_colour);
		}
	}

</style>