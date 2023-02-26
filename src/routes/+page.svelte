<script>
	import ImageKit from 'imagekit-javascript';
	/* SDK initilization
     authenticationEndpoint should be implemented on your server. Learn more here - https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#how-to-implement-authenticationendpoint-endpoint
    */
	var imagekit = new ImageKit({
		publicKey: 'public_bLVDq4MmgDEHft9cvnJcCsXbN3g=',
		urlEndpoint: 'https://ik.imagekit.io/iasvobodin',
		authenticationEndpoint: process.env.IMAGEKIT_PRIVATE
	});

	// Upload function internally uses the ImageKit.io javascript SDK
	function upload(data) {
		var file = document.getElementById('file1');

		// Using Callback Function
		imagekit.upload(
			{
				file: file.files[0],
				fileName: 'abc1.jpg',
				tags: ['tag1'],
				extensions: [
					{
						name: 'aws-auto-tagging',
						minConfidence: 80,
						maxTags: 10
					}
				]
			},
			function (err, result) {
				console.log(result);
			}
		);

		// Using Promises
		imagekit
			.upload({
				file: file.files[0],
				fileName: 'abc1.jpg',
				tags: ['tag1'],
				extensions: [
					{
						name: 'aws-auto-tagging',
						minConfidence: 80,
						maxTags: 10
					}
				]
			})
			.then((result) => {
				console.log(result);
			})
			.then((error) => {
				console.log(error);
			});
	}
</script>

<form action="#" onsubmit="upload()">
	<input type="file" id="file1" />
	<input type="submit" />
</form>
