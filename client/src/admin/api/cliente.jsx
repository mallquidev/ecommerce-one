const url = 'http://localhost:3000/api';


export const clientes = async () => {
    const response = await fetch(url)
    const data = response.json()
    console.log(data)
    
}