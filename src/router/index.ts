import { createRouter, createWebHistory } from 'vue-router' 
import Calculator from '../components/Calculator.vue'
import CalculatorCosts from '../components/CalculatorCosts.vue'
import CalculatorQuestion from '../components/CalculatorQuestion.vue'
import CalculatorResults from '../components/CalculatorResults.vue'
import CalculatorThankYou from '../components/CalculatorThankYou.vue'

const routes = [
	{ path: '/', name: 'calculatorCosts', component: CalculatorCosts },
	{
		path: '/question/:id',
		name: 'calculatorQuestion',
		component: CalculatorQuestion
	},
	{ path: '/results', name: 'calculatorResults', component: CalculatorResults },
	{ path: '/thank-you', name: 'calculatorThankYou', component: CalculatorThankYou }
] 

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

export default router