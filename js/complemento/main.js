// import { ethers } from "ethers";
// import dotenv from 'dotenv'
// dotenv.config();

const RPC_URL = 'https://opulent-space-potato-g44q4vxg6jg53pprx-9650.app.github.dev/ext/bc/sTCLnet/rpc';
const PRIVATE_KEY = '0xfe6b67d95c8139965f8f00e6df4226491e43c0828da279f73d0cc533daec48b0';
const CONTRACT_ADDRESS = '0x7cF220C6861724A30F26BB7a4e4b14bee4cC931E';



const listBtn = document.querySelector('#list-products')
const cardContainer = document.querySelector('#card-container')
console.log(cardContainer)

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);



const abi = [
    // ABI del contrato
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function getNextTokenId() view returns (uint256)",
    "function safeMint(address to, string memory tokenURI_) external"
]

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);


async function main() {
    try{

        const address = "0x1127276076A30922484Aa85da548A4c459CeEb48";


        // Obtener el balance de la direccion
        const balance = await contract.balanceOf(address)
        if(Number(balance) < 1) throw new Error("Error al traer el balance")

        
        const nextTokenId = await contract.getNextTokenId();


        const promises = [];
        for(let i = nextTokenId; i > nextTokenId - 1 - balance; --i){
            promises.push(contract.tokenURI(i))
        }


        const tokenURIs = await Promise.all(promises)
        const promisesMetada = [];


        // Procesamos la metada de los nft cuando esten disponibles todos juntos.
        tokenURIs.forEach((tokenURI, index) => {
            const URImetada = fetch(tokenURI).then(response => response.json())
            promisesMetada.push(URImetada)
        })


        const tokensMetada = await Promise.all(promisesMetada)
        tokensMetada.forEach((metadata, index) => {
            console.log(metadata)
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src=${metadata.img} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${metadata.name}</h5>
                            <p class="card-text">${index + 1}</p>
                            <h6 class="card-text"> ${metadata.category} </h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${metadata.empresa_creadora}</li>
                            <li class="list-group-item">${metadata.empresa_sucursal}</li>
                            <li class="list-group-item">${metadata.lote}</li>
                        </ul>
                        <div class="card-body">
                            <li class="list-group-item">${metadata.fecha_creacion}</li>
                            <li class="list-group-item">${metadata.fecha_vencimiento}</li>
                        </div>
                    </div>
            `;
            cardContainer.appendChild(card)
        })

    } catch (error) {
        console.log("Error al traer el balanceOf: ", error)
    }

}





// const btnForm = document.querySelector('#btn-crear');


listBtn.addEventListener('click', (event) => {
    main()
})

























// document.getElementById('productForm').addEventListener('submit', async function(event) {
//     event.preventDefault(); // Evitar el envío normal del formulario

//     // Obtener valores del formulario
//     const expirationDate = document.getElementById('expirationDate').value;
//     const productName = document.getElementById('productName').value;

//     // Obtener datos de la sesión
//     const companyCreation = "<?php echo $_SESSION['company']; ?>";  // Esto debería ser dinámico
//     const sucursalCreation = "<?php echo $_SESSION['sucursal']; ?>";

//     // Fecha de creación actual (invisible en el formulario)
//     const dateCreation = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

//     // Crear el valor para Lote (año_dia_mes_nombreDelProducto)
//     const lote = `${dateCreation.split('-')[0]}_${dateCreation.split('-')[1]}_${dateCreation.split('-')[2]}_${productName}`;

//     // Crear el objeto JSON con los datos del formulario
//     const data = {
//         date_creation: dateCreation,
//         date_expiration: expirationDate,
//         company_creation: companyCreation,
//         sucursal_creation: sucursalCreation,
//         product_name: productName,
//         lote: lote
//     };

//     // Llamar a la función para subir a Pinata
//     const jsonString = JSON.stringify(data); // Convertir data a JSON string
//     const urlPinata = await uploadToPinata(jsonString); // Asegúrate de que uploadToPinata devuelve una URL
//     console.log("URL de IPFS:", urlPinata);
// });

// // Definición correcta de la función uploadToPinata
// async function uploadToPinata(jsonString) {
//     try {
//         console.log("Datos enviados a Pinata:", jsonString);
//         const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`; // URL para subir los metadatos
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'pinata_api_key': 'ac028bed39049344b8d2',
//                 'pinata_secret_api_key': '7d43ca7822d740e9c1045f9f9f6aae086246ef78860f82855b7913f3f49956d7'
//             },
//             body: jsonString // Enviar directamente la cadena JSON
//         });

//         const data = await response.json();
//         console.log(data); // data contiene el hash del archivo en IPFS
//         return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`; // URL para acceder a los metadatos

//     } catch (err) {
//         console.error(err); // Imprimir el error en la consola para mayor claridad
//         return err;
//     }
// }








