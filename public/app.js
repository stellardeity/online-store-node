const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price)
}

const toDate = date => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
})

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})

const $card = document.querySelector('#card')

if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id

            // clicking on the button will trigger the call ajax request
            fetch(`/card/remove/${id}`, {
                method: 'delete'
            }).then(res => res.json()).then(card => {
                if(card.products.length) {
                    // rerender services
                    const html = card.products.map(product => {
                        return `<tr>
                                    <td>${product.title}<td>
                                    <td>${product.count}</td>
                                    <td>
                                        <button class="btn btn-small js-remove" data-id="${product.id}">Удалить</button>
                                    </td>
                                </tr>`
                    }).join('')
                    $card.querySelector('tbody').innerHTML = html
                    $card.querySelector('.price').textContent = toCurrency(card.price)
                } else {
                    $card.innerHTML = '<p>Корзина пуста</p>'
                }
            })
        }
    })
}