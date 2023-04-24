<script>
	import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
	import { onMount } from 'svelte';
	const ACCOUNT_ID = '875bd4d40c0c253d16cdb40f754731b5';
	const ACCESS_KEY_ID = '9183e440228ce6e790988c03d1c4bff5';
	const SECRET_ACCESS_KEY = '7724f935ca80cc0dfb15890fad2528bbd366c9ccd2be59800bfdccc5ab2da8d7';
	const client = new S3Client({
		region: 'auto',
		endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: ACCESS_KEY_ID,
			secretAccessKey: SECRET_ACCESS_KEY
		}
	});
	let listphoto = [];
	const upload = async (name, data) => {
		const command = new PutObjectCommand({
			Bucket: 'content',
			Key: name,
			Body: data
		});

		try {
			const response = await client.send(command);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
	};
	// import ImageKit from 'imagekit-javascript';
	async function list() {
		const listObj = new ListObjectsV2Command({
			Bucket: 'content',
			MaxKeys: 1
		});
		try {
			const response = await client.send(listObj);
			listphoto = response.Contents;
			console.log(response);
		} catch (err) {
			console.error(err);
		}

		// Or handle it as a Promise

		// client
		// 	.listBucketObjects('content')
		// 	.then((listObjectsResult) => {
		// 		console.log(listObjectsResult);
		// 	})
		// 	.catch((err) => {});
	}
	let uploader, files, auth;

	$: console.log(blobLink);
	let blobLink = [];
	const createBlob = (files) => {
		[...files].forEach((element) => {
			blobLink.push(URL.createObjectURL(element));
			//URL.revokeObjectURL()
		});
	};

	$: if (files) {
		createBlob(files);
	}
	// console.log(import.meta.env);
	// const imagekit = new ImageKit({
	// 	publicKey: 'public_zg1EKa88ulyR5u6XrMXDL07X4Dw=',
	// 	urlEndpoint: 'https://ik.imagekit.io/svobodinaphoto/',
	// 	authenticationEndpoint: `${import.meta.env.VITE_URL_API}api/hello`
	// });

	// async function getAuth() {
	// 	try {
	// 		const response = await fetch('api/hello');
	// 		const result = await response.json();
	// 		auth = result;
	// 		console.log(result);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	async function multipleUpload() {
		await Promise.all(
			[...files].map(async (e) => {
				upload(e.name, e);

				// await imagekit.upload({
				// 	file: e,
				// 	fileName: e.name,
				// 	useUniqueFileName: false
				// });
				// console.log(e.name, 'is uploaded');
			})
		);
	}
	// Upload function internally uses the ImageKit.io javascript SDK
	// async function upload(data) {
	// 	// let response;
	// 	try {
	// 		// response = await
	// 		return await imagekit.upload({
	// 			file: data,
	// 			fileName: data.name,
	// 			useUniqueFileName: false
	// 		});
	// 	} catch (err) {
	// 		console.log(err); // 400
	// 	}
	// }
	const uploadChangesStore = (blobArr) => {
		const formData = new FormData();
		if ([...blobArr].length > 0) {
			[...blobArr].map((e, i) => {
				formData.set(i, e, imageName);
			});
		}
	};
	onMount(() => {
		document.querySelector('.read-dir').onclick = async () => {
			const directoryHandle = await window.showDirectoryPicker();
			console.log(directoryHandle.getDirectory());

			for await (const entry of directoryHandle.values()) {
				console.log(entry);
			}
		};

		let fileHandle;

		document.querySelector('.pick-file').onclick = async () => {
			[fileHandle] = await window.showOpenFilePicker();

			const file = await fileHandle.getFile();
			console.log(file);
			// const dir = await file.getDirectory();
			// console.log(dir);
			const content = await file.text();

			return content;
		};
	});
</script>

<button class="pick-file">pick-file</button>
<button class="read-dir">read-dir</button>
<button on:click={list}>GETLIST</button>
<form on:submit|preventDefault={multipleUpload}>
	<input multiple type="file" bind:files />

	{#if blobLink && files && files[0]}
		{#each files as photo, i}
			<p>
				{photo.name}
			</p>
			<img src={blobLink[i]} alt="d" />
		{/each}
	{/if}
	<input type="submit" />
</form>
{#each listphoto as item}
	<!-- content here -->
	<p>{item.Key}</p>
{/each}

<style>
	img {
		width: 200px;
		height: 200px;
		object-fit: cover;
		object-position: center;
		border-radius: 5px;
	}
</style>
