const fetch = require("node-fetch");

const datosController = (req, res) => {
    const { fechaInicio , fechaFin, autor} = req.body;
    //let fechaInicio = "2022-02-01T00:00:00.872Z"
    //let fechaFin = "2022-02-16T23:02:41Z"
    const url = `https://api.eluniverso.arcpublishing.com/content/v4/search/?website=el-universo&size=100&from=0&body={"query":{"bool":{"must":[{"term":{"type":"story"}},{"range":{"publish_date":{"gte":"${fechaInicio}","lte":"${fechaFin}"}}},{"match_phrase_prefix":{"credits.by.name":"${autor}"}},{"term":{"revision.published":"true"}}]}}}`
    console.log(url)
    fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer L731QAGR7BHUU88S4S6QHOE1O6KI524MdSqiq7QmlUN1NEGAklrjD73dWz9g7DLlg7IlDrZQ'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.count == undefined) {
                res.json({"estado": 'false', "datos": null })
            }
            else {
                engineString(data, autor , (final) => {
                    //console.log(final)
                    res.json({"estado": 'true', "datos": final})
                })
            }
        })
        .catch((err)=> {
            res.json({"estado": 'false', "datos": null })
        })
}

async function engineString(data,autor, response) {
    const BaseURL = "https://www.eluniverso.com/"
    console.log("Total de registros: "+ data.count)
    const datosFinales = []
    for (let i = 0; i < data.content_elements.length; i++) {   //<- Descomentar esta linea para que tome todos los datos de arc
    //for (let i = 0; i < 1 ; i++) { //esta seteado en 1 para cuestion de pruebas (solo devuelve 1 registro de lo que encuentre arc)
        let cadena = ""
        for (let a = 0; a < data.content_elements[i].content_elements.length; a++) {
            let dataSucia = data.content_elements[i].content_elements[a].content
            if (dataSucia != undefined) {
                cadena += dataSucia
            }
        }

        // Limpiamos el texto concatenado con una expresion regular
        const dataLimpia = cadena.replace(/(<([^>]+)>)/gi, "");

        var formBody = [];
        formBody.push(encodeURIComponent('key') + "=" + encodeURIComponent("0743b73bd1e6ce5996337036d585a437"));
        formBody.push(encodeURIComponent('data') + "=" + encodeURIComponent(dataLimpia));
        formBody.push(encodeURIComponent('ignore') + "=" + encodeURIComponent(BaseURL));
        formBody = formBody.join("&");

        // Hacemos la query a la api de plagio enviando la data (cadena limpia)
        
        console.log(data.content_elements[i]?.publish_date)


        var dataPlagio = {}
        try{
            const respuestaApiPlagio = await fetch('https://www.prepostseo.com/apis/checkPlag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: formBody
            })
            dataPlagio = await respuestaApiPlagio.json()
        }catch(err){
            console.log(err)
            continue;
        }

        // Separamos en arrays los links y porcentajes de plagio

        /*const links_plagio = static_object.sources.reduce( (acumulator, current) => {
            return acumulator.concat(current.link)
        }, [])
        const porcentajes_plagio = static_object.sources.reduce( (acumulator, current) => {
            return acumulator.concat(current.percent)
        }, []) */
        try{
          console.log(dataPlagio.totalQueries)
          const obj = {
              "Fecha de creacion": data.content_elements[i]?.created_date,
              "Fecha Publicacion": data.content_elements[i]?.publish_date,
              "Titulo": data.content_elements[i].headlines?.meta_title,
              "Url Post": BaseURL + data.content_elements[i].canonical_url,
              "Autor": autor,
              "Url Plagio": dataPlagio.sources[0]?.link,
              "porcentaje": dataPlagio.sources[0]?.percent  + "%",
          }
          datosFinales.push(obj)
        }
        catch(err){
          console.log("Se acabaron los creditos")
        }
        
    }
    response(datosFinales)
    
}

module.exports = datosController