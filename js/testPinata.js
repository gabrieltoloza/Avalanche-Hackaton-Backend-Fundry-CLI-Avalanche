import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const metadata = "./testPinata.json"

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;



async function readFile(file) {
    try{
        const data = await fs.promises.readFile(file, 'utf8')
        return JSON.parse(data);
    } catch (err){
        return err
    }
}



// const readMetada = await readFile(metadata);



async function uploadToPinata(metadata) {
    try{

        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`; // URL para subir los metadatos
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_SECRET_API_KEY
            },
            body: JSON.stringify(metadata)
        });
        const data = await response.json();
        console.log(data) // data contiene el hash del archivo en IPFS
        return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`; // URL para acceder a los metadatos

    } catch (err) {
        return err
    }
}



// console.log(await uploadToPinata(readMetada))



const datos = await readFile((metadata))
datos.forEach(async (item) => {
    console.log(await uploadToPinata(item))
})