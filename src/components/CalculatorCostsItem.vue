<template>
	<div class="costsItemWrap" :class="cost.active ? 'active':''">
		<div class="costsItem" @click="toggleActive">
			<h4>{{cost.name}}</h4>
			<div class="costEstimate">
				<h6>Estimate</h6>
				<div class="cost">{{priceFormat}}</div>
			</div>
		</div>
	</div>
</template>
 
<script lang="ts">

import { computed, reactive, toRefs } from "vue";

export default {
	props: {
		cost: Object
	},
	setup(props, {emit}){

		//active state handling
		const state = reactive({
			id: props.cost.id
		});

	    const toggleActive = () => {
	    	emit('costToggled', state.id);
	    };

		const { active } = toRefs(state);

		//prie format handling
		const priceFormat = computed(() => {
			return `£${props.cost.cost.toFixed(2)}`
		});

		return {
			priceFormat, toggleActive, active
		}
	}
}
</script>

<style lang="less" scoped>

	@width: calc(100% / 3);

	.costsItemWrap {
		flex: 0 0 @width;
		max-width: @width;
		width: @width;
		padding: 0 15px;

		&.active, &:hover {

			.costsItem {
				.activeStyle;	
			}
		}
	}

	.activeStyle {
  		background: var(--secondary_colour);

		&:before {
			filter: brightness(10);
		}

		h4, .costEstimate .cost {
			color: #fff;
		}
	}

	.costsItem {
		background: #fff;
		border-radius: 1000px;
		padding: 20px 16px;
		margin: 0 0 30px;
		cursor: pointer;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		box-shadow: 0px 3px 6px #00000029;

		&:before {
			content: "";
			width: 32px;
			height: 32px;
			background: url("../assets/images/check.svg") center no-repeat;
			background-size: contain;
		}

		h4 {
			margin: 0;
			font-weight: 400;
			flex: 1 1 0;
  			text-align: center;
			min-width: 1px;
			padding: 0 18px;
			font-size: 16px;
			line-height: 16px;
  			color: var(--secondary_colour);
		}
	}

	.costEstimate {
		text-align: center;

		h6 {
			margin: 0 0 5px;
			font-size: 12px;
			line-height: 15px;
			font-weight: 700;
  			color: var(--secondary_colour_light);
  			text-transform: uppercase;
		}

		.cost {
			font-size: 12px;
			line-height: 15px;
			font-weight: 400;
  			color: var(--secondary_colour);
		}
	}

</style>