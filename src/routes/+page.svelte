<script>
	import ImageKit from 'imagekit-javascript';

	let uploader, files, auth;
	console.log(import.meta.env);
	const imagekit = new ImageKit({
		publicKey: 'public_sJZXyQphG2J9SMCstQ4aknNMoOI=',
		urlEndpoint: 'https://ik.imagekit.io/iasvobodin',
		authenticationEndpoint: `${import.meta.env.VITE_URL_API}api/hello`
	});
	async function getAuth() {
		try {
			const response = await fetch('api/hello');
			const result = await response.json();
			auth = result;
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}

	async function multipleUpload() {
		await Promise.all(
			[...files].map(async (e) => {
				await upload(e);
				console.log(e.name, 'is uploaded');
			})
		);
	}
	// Upload function internally uses the ImageKit.io javascript SDK
	async function upload(data) {
		let response;
		try {
			response = await imagekit.upload({
				file: data,
				fileName: data.name,
				tags: ['tag1'],
				extensions: [
					{
						name: 'aws-auto-tagging',
						minConfidence: 80,
						maxTags: 10
					}
				]
			});
		} catch (err) {
			console.log(err); // 400

			// {'content-type': 'application/json', 'x-request-id': 'ee560df4-d44f-455e-a48e-29dfda49aec5'}
			// console.log(response.$ResponseMetadata.headers);
		}

		// console.log(files);
		// // const file = files;

		// // Using Callback Function
		// imagekit.upload(
		// 	{
		// 		file: files[0],
		// 		fileName: files[0].name,
		// 		tags: ['tag1'],
		// 		extensions: [
		// 			{
		// 				name: 'aws-auto-tagging',
		// 				minConfidence: 80,
		// 				maxTags: 10
		// 			}
		// 		]
		// 	},
		// 	function (err, result) {
		// 		console.log(result);
		// 	}
		// );

		// Using Promises
		// imagekit
		// 	.upload({
		// 		file: files[0],
		// 		fileName: files[0].name,
		// 		tags: ['tag1'],
		// 		extensions: [
		// 			{
		// 				name: 'aws-auto-tagging',
		// 				minConfidence: 80,
		// 				maxTags: 10
		// 			}
		// 		]
		// 	})
		// 	.then((result) => {
		// 		console.log(result);
		// 	})
		// 	.then((error) => {
		// 		console.log(error);
		// 	});
	}
</script>

<button on:click={getAuth}>getAuth</button>
<form on:submit|preventDefault={multipleUpload}>
	<input multiple type="file" bind:files />

	{#if files && files[0]}
		{#each files as photo}
			<p>
				{photo.name}
			</p>
		{/each}
	{/if}
	<input type="submit" />
</form>
