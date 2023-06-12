<template>
	<div class="calculatorWrap">
		<div class="calculator">
			<div class="calculatorHeading">
				<h1>Calculating your total costs<span v-if="titleAppend"> - {{titleAppend}}</span></h1>
			</div>
		  	<router-view :costs="costs" :questions="questions"></router-view> 
		  </div>
	  </div>
</template>

<script lang="ts">

import { reactive, provide, watch, ref } from "vue"; 
import { useRoute } from 'vue-router';

import costsData from '../costs.json'
import questionsData from '../questions.json'

export default {
	setup(){
    	const route = useRoute();

		//define reactive costsData from json and set for router-view props
    	const costs = reactive({ value: costsData.costs });

    	//make copy of costs for resetting at end of process
		const defaultCosts = JSON.parse(JSON.stringify(costsData.costs));
    	provide("defaultCosts", defaultCosts);

		//define reactive questionsData from json and set for router-view props
    	const questions = reactive({ value: questionsData.questions });

    	//make copy of questions for resetting at end of process
		const defaultQuestions = JSON.parse(JSON.stringify(questionsData.questions));
    	provide("defaultQuestions", defaultQuestions);

    	//setup title append for router-view components
    	let titleAppend = ref("");

	    watch(() => route.name, (newRouteName) => {
			if (newRouteName == "calculatorResults") {
    			titleAppend.value = "Your results";
			}
			else {
				titleAppend.value = "";
			}
	    });

		return {
			costs,
			questions,
			titleAppend
		}
	}
}

</script>

<style scoped lang="less">

	.calculatorWrap {
		height: 100%;
		position: relative;
		background: #fff;
		overflow: hidden;

		&:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: url("../assets/images/bg-image.png") center no-repeat;
			background-size: cover;
			opacity: 0.3;
			filter: blur(9px);
			transform: scale(1.1);
		}
	}

	.calculator {
		position: relative;
		z-index: 1;
		padding: 115px 100px;
	}

	.calculatorHeading {
  		color: var(--primary_colour);
		text-transform: uppercase;
		text-align: center;

		h1 {
			margin: 0 0 55px;
			font-size: 24px;
			line-height: 16px;
		}
	}


</style>


<style lang="less">

	//global styling

	.continueWrap {

		a {
  			background: var(--primary_colour); 
  			color: #fff;
  			text-decoration: unset;
  			border-radius: 100px;
  			font-size: 16px;
  			line-height: 20px;
  			padding: 10px 12px 10px 18px;
  			display: inline-flex;
  			align-items: center;

  			&:after {
  				content: "";
  				width: 28px;
  				height: 28px; 
  				background: url("../assets/images/arrow.svg");
  				background-size: contain;
  				margin-left: 10px;
  			}
		}

		&.reverse {

			a {
  				padding: 10px 18px 10px 12px;

				&:after {
					order: -1;
					margin-left: 0;
					margin-right: 10px;
					transform: rotate(180deg);
				}
			}
		}
	}

</style>