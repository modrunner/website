<template>
	<NuxtLayout
		name="doc"
		:headings="[
			{
				title: 'Introduction',
				fragment: '#introduction',
				subHeadings: [],
			},
			{
				title: 'Quick Start',
				fragment: '#quick-start',
				subHeadings: [],
			},
			{
				title: 'Features',
				fragment: '#features',
				subHeadings: [],
			},
			{
				title: 'Design Principles',
				fragment: '#design-principles',
				subHeadings: [],
			},
			{
				title: 'Comparison with similar services',
				fragment: '#comparison-with-other-services',
				subHeadings: [
					{
						title: 'Claptrack',
						fragment: '#claptrack',
					},
					{
						title: 'CurseForge-Bot',
						fragment: '#curseforge-bot',
					},
				],
			},
		]"
	/>
</template>
