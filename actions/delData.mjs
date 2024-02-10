const delData = url => {
	return new Promise((resolve, reject) =>
		fetch(url, { method: 'DELETE' })
			.then(response => response.text())
			.then(text => resolve(text))
			.catch(error => reject(error))
	)
}
export default delData