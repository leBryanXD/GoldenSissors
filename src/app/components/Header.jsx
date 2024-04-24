'use client'
 
import Image from 'next/image'
import Logo from '../../logos/GS_logo.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { useState, useEffect } from 'react'

const Header = () => {

  const [cook, setCook] = useState({});
  const [route, setRoute] = useState("");

  const user =  getCookie("token")  
    useEffect(()=>{
      const cokie = () =>{    
        if(user !== undefined){

          setCook(JSON.parse(user))
        }
      }
      cokie()
    }, [user])


    useEffect(() => {
      async function obtenerRuta() {
        console.log(cook)
        const tipo = "1";
        const identity = cook.id_usuario;
  
        try {
          const respuesta = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/images`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                tipo: tipo,
                identity: identity,
              }),
            }
          );
  
          if (!respuesta.ok) {
            throw new Error("Error al obtener la ruta");
          }
  
          const rutaRelativa = await respuesta.text(); // Obtener la ruta absoluta como texto
          const rutacam = rutaRelativa.replace(/['"]+/g, "");
          // Transformar la ruta absoluta en una ruta relativa dentro del contexto de la aplicación Next.js
          console.log(rutacam);
  
          setRoute(require("@/../public/servicios/" + rutacam));
        } catch (error) {
          console.error("Error al obtener la ruta:", error);
        }
      }
        if(Object.keys(cook).length !== 0 ){
          obtenerRuta();
        }
    }, [cook]);

  const pathname = usePathname()
  return (
    <header >
        <nav className=" border-gray-200 navegacion">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image src={Logo} className="w-20" alt="Logo" priority />
            </Link>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 " aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto links" id="navbar-default">
              <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900">
               <li  className={`block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/' ? 'activo': ''}`}>
                  <Link href="/">Inicio</Link>
                </li>
                <li  className={`block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/servicios' ? 'activo': ''}`}>
                  <Link href="/servicios">Servicios</Link>
                </li>
                <li  className={`block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/nosotros' ? 'activo': ''}`}>
                  <Link href="/nosotros" >Nosotros</Link>
                </li>
                <li className={`block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/blog' ? 'activo': ''}`}>
                  <Link href="/blog" >Blog</Link>
                </li>
                <li className={`block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/login' ? 'activo': ''}`}>  
                  <Link href="/login" >Login</Link>
                </li>

                { Object.keys(cook).length !== 0 ? ( 
                    <li className={`flex items-center gap-2 block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/login' ? 'activo': ''}`}>
                      <Image 
                        width={40}
                        height={40}
                        src={route}
                        alt={`imagen`}
                        className="rounded-full"
                      />
                      <button 
                        id="dropdownDefaultButton" 
                        data-dropdown-toggle="dropdown" 
                        className="inline-flex items-center gold py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900" 
                        type="button">
                        {cook.nombre} 
                        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                      </button>

                      <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cerrar Sesión</a>
                          </li>                              
                        </ul>
                      </div>
                    </li>
                  ) : "" }
              </ul>
            </div>
          </div>
        </nav> 
    </header>
  )
}

export default Header
