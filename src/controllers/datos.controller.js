const fetch = require("node-fetch");

const datosController = (req, res) => {
    let fechaInicio = "2022-01-01T00:00:00Z"
    let fechaFin = "2022-12-31T23:59:59Z"
    const url = `https://api.eluniverso.arcpublishing.com/content/v4/search/?website=el-universo&size=20&from=0&body={"query":{"bool":{"must":[{"term":{"type":"story"}},{"range":{"publish_date":{"gte":"${fechaInicio}","lte":"${fechaFin}"}}},{"match_phrase_prefix":{"credits.by.name":"Periodista Cinco"}},{"term":{"revision.published":"false"}}]}}}`
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
            engineString(data , (final) => {
                console.log(final)
                res.json(final)
            })
        })
    
}

async function engineString(data, response) {
    const BaseURL = "https://www.eluniverso.com/"
    const datosFinales = []
    // for (let i = 0; i < data.content_elements.length; i++) {   <- Descomentar esta linea para que tome todos los datos de arc
    for (let i = 0; i < 1 ; i++) { //esta seteado en 1 para cuestion de pruebas (solo devuelve 1 registro de lo que encuentre arc)
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
        formBody.push(encodeURIComponent('key') + "=" + encodeURIComponent("989aa42c8382844b061eab3388d7cd8b"));
        formBody.push(encodeURIComponent('data') + "=" + encodeURIComponent(dataLimpia));
        formBody.push(encodeURIComponent('ignore') + "=" + encodeURIComponent(BaseURL));
        formBody = formBody.join("&");

        // Hacemos la query a la api de plagio enviando la data (cadena limpia)
        /* const respuestaApiPlagio = await fetch('https://www.prepostseo.com/apis/checkPlag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formBody
        })
        //const dataPlagio = await respuestaApiPlagio.json()
        //console.log(dataPlagio)*/

        // Separamos en arrays los links y porcentajes de plagio
        const static_object = {
            isQueriesFinished: 'false',
            sources: [
              {
                link: 'https://www.eluniverso.com/larevista/salud/sintomas-de-la-perdida-de-masa-muscular-en-mujeres-y-hombres-nota/',
                count: 14,
                percent: 96
              },
              {
                link: 'https://www.mayoclinic.org/es-es/diseases-conditions/muscular-dystrophy/symptoms-causes/syc-20375388',
                count: 9,
                percent: 44
              },
              {
                link: 'https://www.semana.com/vida-moderna/articulo/cuales-son-los-sintomas-de-la-perdida-de-masa-muscular/202117/',
                count: 3,
                percent: 21
              },
              {
                link: 'https://www.genome.gov/11510310/2004-release-gard-ofrece-asistencia-en-espaol',
                count: 1,
                percent: 13
              }
            ],
            totalQueries: 15,
            plagPercent: 87,
            paraphrasePercent: 0,
            uniquePercent: 13,
            excludeURL: null,
            details: [
              {
                query: 'La distrofia muscular es un grupo de enfermedades que provocan debilidad progresiva y pérdida de la masa muscular.',
                version: 3,
                unique: 'false',
                display: [Object],
                excludeByUrl: false,
                paraphrase: 'false'
              },
              {
                query: 'En este padecimiento, genes anormales (mutaciones) interfieren en la producción de proteínas necesarias para formar músculos saludables, define la Clínica Mayo.', 
                version: 3,
                unique: 'false',
                display: [Object],
                excludeByUrl: false,
                paraphrase: 'false'
              },
              {
                query: 'El Centro de Información sobre Enfermedades Genéticas y Raras (GARD, por sus siglas en inglés), confirma que la pérdida de masa muscular y la debilidad progresiva'+
          'en hombres y mujeres son características principales de la distrofia muscular, una patología que incluye a más de 30 enfermedades genéticas.',
                version: 3,
                unique: 'false',
                display: [Object],
                excludeByUrl: false,
                paraphrase: 'false'
              },
              {
                query: 'Según GARD, algunas formas de distrofia muscular se notan en la infancia o la niñez, mientras que otras aparecen más tarde o en adultos, siendo más recurrente en los hombres que en las mujeres.',
                version: 3,
                unique: 'false',
                display: [Object],
                excludeByUrl: false,
                paraphrase: 'false'
              },
              {
                unique: 'false',
                query: 'Enfermedad de Duchenne, la mÃ¡s frecuente de las distrofias musculares, Â¿cuÃ¡les son sus signos?',
                version: 3,
                display: [Object],
                paraphrase: 'false'
              },
              {
                query: '“Los trastornos difieren en cuanto a la distribución y extensión de la debilidad muscular, porque algunas formas de distrofia muscular también afectan el músculo cardíaco.',
                version: 3,
                unique: 'false',
                display: [Object],
                excludeByUrl: false,
                paraphrase: 'false'
              },
              {
                unique: 'false',
                query: 'Incide la edad de inicio, la tasa de progresiÃ³n y el patrÃ³n de herenciaâ\x80\x9D, explica la reseÃ±a.',
                version: 3,
                display: [Object],
                paraphrase: 'false'
              },
              {
                unique: 'false',
                query: 'SÃ­ntomas de la pÃ©rdida de masa muscular en mujeres y hombresSobre la sintomatologÃ­a, ClÃ­nica Mayo aÃ±ade que el principal signo de distrofia muscular es una debilidad muscular progresiva.',
                version: 3,
                display: [Object],
                paraphrase: 'false'
              },
              {
                query: 'Los signos y síntomas específicos comienzan a diferentes edades y en diferentes grupos musculares, según el tipo de distrofia muscular.',
                version: 3,
                unique: 'false',
                display: [Object],
                excludeByUrl: false,
                paraphrase: 'false'
              },
              {
                unique: 'false',
                query: 'Venezolano con distrofia muscular finaliza el maratÃ³n de Boston entre vÃ­toresDistrofia muscular de tipo DuchenneEste es el tipo mÃ¡s comÃºn.',
                version: 3,
                display: [Object],
                paraphrase: 'false'
              },
              {
                query: 'Aunque las niñas pueden ser portadoras y estar levemente afectadas, es mucho más común en los niños.',
                version: 3,
                unique: 'false',
                display: [Object],
                excludeByUrl: false,
                paraphrase: 'false'
              },
              {
                query: 'Los signos y síntomas, que suelen aparecer en la primera infancia, pueden incluir:Distrofia muscular de BeckerLos signos y síntomas son similares a los de la distrofia muscular de Duchenne, solo que más leves y a avanza más lentamente.',
                version: 3,
                unique: 'true',
                display: null,
                excludeByUrl: false,
                paraphrase: 'false'
              },
              {
                unique: 'false',
                query: 'Los sÃ­ntomas suelen comenzar en la adolescencia, pero es posible que no se manifiesten hasta los 20 aÃ±os o mÃ¡s.',
                version: 3,
                display: [Object],
                paraphrase: 'false'
              },
              {
                unique: 'false',
                query: 'Otros tipos de distrofia muscularAlgunos tipos de distrofia muscular se definen por una caracterÃ­stica especÃ­fica o por el lugar del cuerpo donde comienzan los sÃ­ntomas.',
                version: 3,
                display: [Object],
                paraphrase: 'false'
              },
              {
                query: 'Por ejemplo:También IntraMed explica que la elevada prevalencia de la pérdida de masa muscular relacionada con la edad y con las enfermedades son grandes factores' +
          'de riesgo de discapacidad. (I)',
                version: 3,
                unique: 'true',
                display: null,
                excludeByUrl: false,
                paraphrase: 'false'
              }
            ]
        }

        /*const links_plagio = static_object.sources.reduce( (acumulator, current) => {
            return acumulator.concat(current.link)
        }, [])
        const porcentajes_plagio = static_object.sources.reduce( (acumulator, current) => {
            return acumulator.concat(current.percent)
        }, []) */

        const obj = {
            "Fecha Publicacion": data.content_elements[i].publish_date,
            "Titulo": data.content_elements[i].headlines?.meta_title,
            "Url Post": BaseURL + data.content_elements[i].canonical_url,
            "Autor": "Periodista Cinco",
            "Url Plagio": static_object.sources[1]?.link,
            "porcentaje": static_object.sources[1]?.percent  + "%",
        }
        datosFinales.push(obj)
    }
    response(datosFinales)
}

module.exports = datosController