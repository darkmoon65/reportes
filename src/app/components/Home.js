import exportFromJson from 'export-from-json'

const Home = () => {
    const getData = () => {
        fetch('http://localhost:3000/api/datos')
            .then(response => response.json())
            .then((data)=> {
                const fileName = 'ejemplo'
                const exportType = exportFromJson.types.xls
                exportFromJson({data, fileName, exportType})
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    return (
        <div className='container'>
            <div className='row justify-content-md-center'>
                <div className='col-4' style={{margin: '20px'}}>
                    <div className='card p-2' style={{background: '#e8eaf7'}}>
                        <div className='p-2'>
                            <h5>Nombre de autor: </h5>
                        </div>
                        <div className='p-2'>
                            <input type='text' className='form-control' />
                        </div>
                        <div className='text-center p-4'>
                            <button className='btn btn-primary' onClick={getData}>Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home