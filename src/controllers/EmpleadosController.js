import axios from "axios"

export async function getEmpleados(){
    const empleados = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/empleados`);
    return empleados.data
}