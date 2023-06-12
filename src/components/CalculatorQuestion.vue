<template v-if="currentQuestion">

	<div class="questionWrap">
		<div class="questionText">
			<button @click="prevQuestion" class="prevQuestion"></button>
			<h2>{{currentQuestion.text}}</h2>
			<button @click="nextQuestion" class="nextQuestion"></button>
			<p><span>{{currentQuestionIndex}}</span> of <span>{{questions.length}}</span></p>
		</div>
		<div class="questionInput">
			<input v-model="currentQuestion.cost"/>
		</div>
	</div>

</template>

<script lang="ts">

import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
	props: {
		costs: Object,
		questions: Object
	},
	setup(props){
    	const route = useRoute();
    	const router = useRouter();
    	let questionId = ref(parseInt(route.params.id));

		//get data from props
		const costs = props.costs.value;
		const questions = props.questions.value;

	    // find the current question based on the question ID
	    let currentQuestion = computed(() => {
			return questions.find(question => question.id === questionId.value);
	    });

	    // find the current question index based on the question ID
	    let currentQuestionIndex = computed(() => {
			return questions.findIndex(question => question.id === questionId.value) + 1;
	    });

	    // method to prevQuestion to the previous question, or back to costs
		const prevQuestion = () => {
			const index = questions.findIndex(question => question.id === questionId.value);

			if (index !== -1 && index > 0) {
				questionId.value = questionId.value - 1;
				router.push({name: 'calculatorQuestion', params: {id: questionId.value}});
			}
			else {
				router.push({name: 'calculatorCosts'});
			}
	    };

	    // method to navigate to the next question, or ahead to results
		const nextQuestion = () => {
			const index = questions.findIndex(question => question.id === questionId.value);

			if (index !== -1 && index < questions.length - 1) {
				questionId.value = questionId.value + 1;
				router.push({name: 'calculatorQuestion', params: {id: questionId.value}});
			}
			else {
				router.push({name: 'calculatorResults'});
			}
	    };

		return {
			costs,
			questions,
			currentQuestion,
			currentQuestionIndex,
			prevQuestion,
			nextQuestion
		}
	}
}

</script>

<style scoped lang="less">
	
	.questionWrap {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
		padding-top: 100px;

		.questionText {
			flex: 1 1 0;
			min-width: 1px;
		}

		.questionInput {
			margin-left: 150px; 
		}
	}

	.questionInput {

		input {
			background: #fff;
			border: none;
			border-radius: 8px;
			box-shadow: 0px 3px 6px #00000029;
			color: #979797;
			font-size: 24px;
			line-height: 29px;
			padding: 17px 25px;
			width: 160px;
		}
	}

	.questionText {
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		.prevQuestion, .nextQuestion {
			width: 40px;
			height: 40px;
			background: var(--primary_colour) url("../assets/images/chevron.svg") center no-repeat;
			background-size: 11px;
			border: none;
			border-radius: 100%;
			cursor: pointer;
		}

		.prevQuestion {
			transform: rotate(180deg);
		}

		h2 {
			margin: 0;
			color: var(--primary_colour);
			font-weight: 400;
			font-size: 32px;
			line-height: 40px;
			padding: 0 45px;
			text-align: center;
			flex: 1 1 0;
		}

		p {
			flex: 0 0 100%;
			width: 100%;
			max-width: 100%;
			text-align: center;
			margin: 15px 0 0;
			color: #979797;
			font-size: 16px;
			line-height: 20px;

			span {
				font-weight: 700;
			}
		}
	}

</style>