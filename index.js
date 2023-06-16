const fetch = require("node-fetch");

console.log("hola")
fetch('https://api.sandbox.eluniverso.arcpublishing.com/content/v4/search/?website=el-universo&size=20&from=0&body={"query":{"bool":{"must":[{"term":{"type":"story"}},{"match_phrase_prefix":{"credits.by.name":"Periodista Tres"}},{"term":{"revision.published":"false"}}]}}}&_sourceInclude=content_elements&_sourceExclude=additional_properties'
    , {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 3GGTG5R83NQT4ME8RUJPSBIGD3H60AU1IUc86xzMdi7d1qWK+f6akfUQIkvPdXr90LK8U07i'
        }
    })
.then(res => res.json() )
.then(data => engineString(data))


function engineString(data){
    let cadena = ""
    console.log(data)
    for (let i = 0; i < data.content_elements.length; i++) {
        for (let a = 0; a < data.content_elements[i].content_elements.length; a++) {
               let dataSucia = data.content_elements[i].content_elements[a].content
               if(dataSucia != undefined){
                let nuevo = dataSucia.replace("<b>", "")
                cadena += nuevo
               }
        }      
    } 
    console.log(cadena)
}