import config from "../config/config.js";

const PORT = config.app.PORT;
const socket = io.connect();
let products = [];

socket.on('messages', data => {
    render(data);
});

socket.on('products', data => {
    renderTable(data.products);
});

function render(data) {
    if(data.compr != undefined) {
        $("#compr").append(`(Comprensión ` + `${data.compr}` + `%)`);
    }

   data.forEach((elem) => {
        $("#messages").append(`
            <div> 
                <strong class="text-primary">${elem.author.email}</strong>
                <em class="text-brown">[${elem.date}]: </em> 
                <em class="fst-italic text-success">${elem.text}</em>
                <em><img src="${elem.author.avatar}" width="40px"></em>
            </div>
        `)
    });
}

async function renderTable(productsData) {
    const response = await fetch("/tableProducts.handlebars");
    const source = await response.text();
    const template = Handlebars.compile(source);
    const context = { products: productsData };
    let html = template(context);
    $("#tableProducts").empty();
    $("#tableProducts").append(html);
}

$("#formChat").submit((e) => {
    e.preventDefault();
    const menssage = {
        author: {
            email: $('#email').val(),
            nombre: $('#nombre').val(),
            apellido: $('#apellido').val(),
            edad: $('#edad').val(),
            alias: $('#alias').val(),
            avatar: $('#avatar').val() 
        },
        date: new Date().toLocaleString(),
        text: $('#message').val()
    };

    socket.emit('new-message', menssage);
    emptyInput('#message');
});

$("#formProduct").submit(async(e) => {
    e.preventDefault();
    const product = {
        title: $('#title').val(),
        price: $('#price').val(),
        thumbnail: $('#thumbnail').val(),
    };
    
    await socket.emit('new-product', product);
    emptyInput('#title');
    emptyInput('#price');
    emptyInput('#thumbnail');
});

function emptyInput(value) {
    $(value).val("");
};

function logout() {
    location.href = "http://localhost:" + PORT + "/logout";
};
