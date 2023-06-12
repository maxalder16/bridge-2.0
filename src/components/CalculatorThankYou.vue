<template>
	<div class="thankYouWrap">
		<h2>Thank you for using the Bridge Sales Enablement Agency calculator. A representative will be in touch with you soon.</h2>
		<router-link :to="{name: 'calculatorCosts'}" @click="resetData" class="button">Restart</router-link>
	</div>
</template>

<script lang="ts">

import { inject } from "vue"; 

export default {
	props: {
		costs: Object,
		questions: Object
	},
	setup(props){

		//get data from props
		const costs = props.costs.value;
		const questions = props.questions.value;

		//get injected default data for reset
    	const defaultCosts = inject("defaultCosts");
    	const defaultQuestions = inject("defaultQuestions");

		//reset data for new calculation using copy of default costs
		const resetData = () => { 
	    	props.costs.value = JSON.parse(JSON.stringify(defaultCosts));
	    	props.questions.value = JSON.parse(JSON.stringify(defaultQuestions));
		}

		return {
			costs,
			questions,
			resetData
		}
	}
}

</script>

<style scoped lang="less">

	.thankYouWrap {
		max-width: 575px;
		margin: 0 auto;
		text-align: center;
		padding: 150px 0 0;

		h2 {
			color: var(--primary_colour);
			font-size: 24px;
			line-height: 32px;
			font-weight: bold;
			margin: 0 0 65px;
		}

		.button {
			background: var(--primary_colour);
			color: #fff;
			border-radius: 1000px;
			text-decoration: unset;
			font-size: 20px;
			line-height: 24px;
			padding: 8px 24px;
			display: inline-block;
		}	
	}
</style>