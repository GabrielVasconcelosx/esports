$(document).ready(function(){
    fillTable()

    $('.btn-add').click(function(){
        var value = $('.cart').text();
        const val = parseInt(value) + 1
        let items = JSON.parse(localStorage.getItem('count'))
        if (!items) {
            items = {
                items: []
            }
        }
        
        items.items.push({
            id: items.items.length + 1,
            title: $(this).data('title'),
            price: $(this).data('price')
        })

        localStorage.setItem('count', JSON.stringify(items))
        fillTable()

        $('.cart').html(val);
    });
    $('.btn-zoom').click(function(){
        $('#exampleModalCenter').modal('show');
        var img = $(this).data("image");
        $('.img-zoom').html('<img width="250" class="m-auto" src="' + img + '"/>');
        $('.img-zoom').css('background-image', img);
    });

    $('#produtos').on('click', '[data-remove]', function (evt) {
        evt.preventDefault()

        const id = evt.target.dataset.remove
        let items = JSON.parse(localStorage.getItem('count'))
        const newItems = items.items.filter(item => item.id != id)

        localStorage.setItem('count', JSON.stringify({items: newItems}))
        fillTable()
    })

    function fillTable() {
        let items = JSON.parse(localStorage.getItem('count'))
        if (!items) {
            items = {items:[]}
        }

        $('.cart').html(items.items.length)

        const total = items.items.reduce((acc, curr) => {
            return acc + curr.price
        }, 0)

        const html = items.items.map((item) => (`
            <tr data-index="${item.id}">
                <td>${item.title}</td>
                <td>R$ ${item.price},00</td>
                <td><button class="btn btn-danger" data-remove="${item.id}">Remover</button></td>
            </tr>
        `)).join(' ') + `
            <tr>
                <td colspan="2">Total</td>
                <td id="#total"><b>R$ ${total},00</b></td>
            </tr>
        `

        $('#produtos').html(html)
    }

    $('.btn-finish').click(function(){
        toastr.success('Comprado com sucesso');
        $('#closeprice').click();
        localStorage.clear()
        fillTable()
        
    });
    $('.btn-danger').click(function(){
        toastr.error('Item excluido do carrinho');
        fillTable()
        
    });
});