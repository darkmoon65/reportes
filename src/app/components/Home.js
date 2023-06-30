import exportFromJson from 'export-from-json'
import {useState} from 'react';

const Home = () => {
    const [autor, setAutor] = useState('');
    const [fechaInicio, setfechaInicio] = useState('');
    const [fechaFin, setfechaFin] = useState('');
    const [bloquear, setBloquear] = useState(false);

    const getData = () => {
        setBloquear(true)
        var datos = {autor, fechaInicio, fechaFin}
        fetch('http://localhost:3000/api/datos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(response => response.json())
            .then((rptaData) => {
                if(rptaData.estado == "false") {
                    console.log( "Hubo un error en los datos de envio (revisar fechas o autor)" ) 
                }
                else{
                    const data = rptaData.datos
                    const fileName = 'ejemplo'
                    const exportType = exportFromJson.types.xls
                    exportFromJson({data, fileName, exportType})   
                }
                setBloquear(false)
            })
            .catch((err)=>{
                console.log(err)
                setBloquear(false)
            })
    }

    const handleChangeAutor = event => {
        setAutor(event.target.value);
    };
    const handleChangeFechaInicio = event => {
        setfechaInicio(event.target.value);
    };
    const handleChangeFechaFin = event => {
        setfechaFin(event.target.value);
    };

    return (
        <div className='container'>
            <div className='row justify-content-md-center'>
                <div className='col-4' style={{margin: '20px'}}>
                    <div className='card p-2' style={{background: '#e8eaf7'}}>
                        <div className='p-2'>
                            <h5>Nombre de autor: </h5>
                        </div>
                        <div className='p-2'>
                            <input type='text' className='form-control' value={autor} onChange={handleChangeAutor}/>
                        </div>
                        <div className='p-2'>
                            <h5>Fecha Inicio: </h5>
                        </div>
                        <div className='p-2'>
                            <input type='text' className='form-control' value={fechaInicio} onChange={handleChangeFechaInicio}/>
                        </div>
                        <div className='p-2'>
                            <h5>Fecha Fin: </h5>
                        </div>
                        <div className='p-2'>
                            <input type='text' className='form-control' value={fechaFin} onChange={handleChangeFechaFin}/>
                        </div>
                        <div className='text-center p-4'>
                            <button className='btn btn-primary' onClick={getData} disabled={bloquear}>Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home