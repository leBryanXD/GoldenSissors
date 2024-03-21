import Image from 'next/image'
import '../../styles/principal.css'



const InicioCards = ({titulo, contenido, imagen}) => {
  return (
    <div className="card_inicio ">
        <Image className='' src={imagen} width={100} height={100}/>
        <div className=''>
            <h3 className='font-bold titulo_card'>{titulo}</h3>
            <p>{contenido}</p>
        </div>
    </div>
  )
}

export default InicioCards
