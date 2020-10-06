const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price)
}

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
                if(card.services.length) {
                    // rerender services
                    const html = card.services.map(service => {
                        return `<tr>
                                    <td>${service.title}<td>
                                    <td>${service.count}</td>
                                    <td>
                                        <button class="btn btn-small js-remove" data-id="${service.id}">Удалить</button>
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