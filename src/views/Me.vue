<template>
	<div>
		<h3>Home</h3>

		<label class="bg-gray-300 w-8 rounded-full p-[2px] flex">
			<input type="checkbox" class="appearance-none w-4 h-4 bg-white rounded-full checked:ml-auto">
		</label>
	</div>
</template>

<style>
	label:has(input:checked) {
		@apply bg-green-400;
	}
</style>