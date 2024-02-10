import changeLikes from './actions/changeLikes.mjs'
import getData from './actions/getData.mjs'
import postData from './actions/postData.mjs'
import delData from './actions/delData.mjs'


const URL = 'http://localhost:3000/USERS'
const buttonPost = document.querySelector('.post')
const buttonGet = document.querySelector('.get')
const form = document.querySelector('form')
const list = document.querySelector('.profiles')
const deleteBtn = document.querySelector('.delete')



// отправка данных
buttonPost.addEventListener('click', e => {
	// отмена стандартного поведения кнопки
	e.preventDefault()
	try {
		// сбор данных из формы
		const data = new FormData(form)
		// собираем объект для отправки
		const user = {
			name: data.get('name'),
			task: data.get('task'),
			
		}
		// отправка данных на сервер
		postData(URL, user)
		// очистка формы
		form.reset()
	} catch (error) {
		console.error(error)
	}
})

// получение данных
buttonGet.addEventListener('click', async e => {
	e.preventDefault()
	try {
		const data = await getData(URL)
		data.forEach(user => {
			list.insertAdjacentHTML(
				`beforeend`,
				`
				<li class="user-profile" id="${user.id}">
					<p class="name">${user.name}</p>
					<p class="email">${user.task}</p>
					<p class="read">${user.read}</p>
					<p class="noread">${user.noread}</p>
				</li>
				`
			)
		})
		const task = document.querySelectorAll('.read');
task.forEach(task => {
		task.addEventListener('click' , () => {
		task.style.background = 'green'
		}) 
	})
	const notask = document.querySelectorAll('.noread');
 notask.forEach(notask => {
		notask.addEventListener('click' , () => {
		notask.style.background = 'red'
		}) 
	})
		
		// обработка лайков, на данных, которые мы только что получили
		const likes = document.querySelectorAll('.likes')
		likes.forEach(like => {
			like.addEventListener('click', () => {
				const id = like.parentNode.id
				let likesNumber = like.textContent
				likesNumber++
				like.textContent = likesNumber
				changeLikes(URL, id, { likes: likesNumber })
			})
		})
	} catch (error) {
		console.error(error)
	}
})



deleteBtn.addEventListener('click', async e => {
	e.preventDefault()
	const id = prompt('введите id')
	try {
		delData(`http://localhost:3000/USERS/${id}`).then(response => {
			console.log(response, `продукт с id = ${id} успешно удалён`)
		})
	} catch (err) {
		console.error(err, 'ошибка при удалении')
	}
})