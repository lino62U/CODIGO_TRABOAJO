const lista = ["APAZA APAZA NELZON JORGE","APAZA QUISPE ANGEL ABRAHAM","BENAVENTE AGUIRRE PAOLO DANIEL",
"CACSIRE SANCHEZ JHOSEP ANGEL","CARAZAS QUISPE ALESSANDER JESUS","CASTILLO SANCHO SERGIO","CAYLLAHUA GUTIERREZ DIEGO YAMPIER",
"CCAMA MARRON GUSTAVO ALONSO","CERPA GARCIA JEAN FRANCO","CONDORI CASQUINO EBERT LUIS","DAVIS COROPUNA LEON FELIPE",
"ESCARZA PACORI ALEXANDER RAUL","GONZALES CONDORI ALEJANDRO JAVIER","GUTIERREZ ZEVALLOS JAIME JOSÉ","HUALPA LOPEZ JOSE MAURICIO",
"HUAMAN COAQUIRA LUCIANA JULISSA","LAZO PAXI NATALIE MARLENY","LOPEZ CONDORI ANDREA DEL ROSARIO","LUPO CONDORI AVELINO",
"MALDONADO CASILLA BRAULIO NAYAP","MALDONADO P ROY ABEL","MARIÑOS HILARIO PRINCCE YORWIN","MARTÍNEZ CHOQUE ALDO RAÚL",
"MAYORGA VILLENA JHAROLD ALONSO","MENA QUISPE SERGIO SEBASTIAN SANTOS","MOGOLLON CACERES SERGIO DANIEL","MONTOYA CHOQUE LEONARDO",
"NIZAMA CESPEDES JUAN CARLOS ANTONIO","OLAZÁBAL CHÁVEZ NEILL ELVERTH","PARDAVÉ ESPINOZA CHRISTIAN","PARIZACA MOZO PAUL ANTONY",
"QUILCA HUAMANI BRYAN","QUISPE ROJAS JAVIER WILBER","ROQUE SOSA OWEN HAZIEL","RUIZ MAMANI EDUARDO GERMAN","SUCASACA CHIRE EDWARD HENRY",
"TAYA YANA SAMUEL OMAR","YAVAR GUILLEN ROBERTO GUSTAVO","ZAMALLOA MOLINA SEBASTIAN AGENOR","ZHONG CALLASI LINGHAI JOAQUIN"];

var matriz = [];

matriz = new Array(40);
for(let i=0;i<lista.length;i++){
    matriz[i] = new Array(4);
}

for(let i=0;i<lista.length;i++){
    matriz[i][0] = i+1;
    matriz[i][1] = lista[i];
    matriz[i][2];
    matriz[i][3] = "";
}

for(let i=0;i<lista.length;i++){
    const tabla_inicio = document.getElementById('inicio_cuerpo');
    tabla_inicio.insertAdjacentHTML('beforeend', `<tr></tr>`);
    let jus= `<td></td>`;
    
    let indice;
    if(i>=0 && i<9){
        indice=`0${i+1}`;
    }else{
        indice=i+1;
    }

    let contenido = `   <td class="btsLISA">${indice}</td>
                        <td>${lista[i]}</td>
                        <td id="${i}">
                            <input type="submit" value="P" id="${1 + (i*3)}">
                            <input type="submit" value="T" id="${2 + (i*3)}">
                            <input type="submit" value="F" id="${3 + (i*3)}">
                        </td>`
    tabla_inicio.lastElementChild.insertAdjacentHTML('beforeend',contenido);
    tabla_inicio.lastElementChild.insertAdjacentHTML('beforeend',jus);
}

function crearJusti(dni,estado){
    let texto = `<td><input type="text"></td>`
    let jus =`<td></td>`
    const padre = document.getElementById(dni);
    const hijos = padre.parentElement.parentElement.childElementCount;
    if((estado == "T" || estado == "F") && hijos < 5){
        padre.parentElement.parentElement.lastElementChild.remove();
        padre.parentElement.parentElement.lastElementChild.insertAdjacentHTML('afterend',texto);
    }
    if(estado == "P" && hijos > 3){
        padre.parentElement.parentElement.lastElementChild.remove();
        padre.parentElement.parentElement.lastElementChild.insertAdjacentHTML('afterend',jus);
    }
}

document.addEventListener('click' , (e) =>{

    const boton = e.target;
    getID = parseInt(boton.id);

    if(boton.id == "pdf"){
        const convertirpdf = document.body;
        html2pdf()
        .set({
            margin: 1,
            filename: 'documento.pdf',
            html2canvas: {
                scale: 3,
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: 'landscape',
            }
        })
        .from(convertirpdf)
        .save()
    }

    if(getID % 3 == 0){
        console.log("FALTA");
        matriz[parseInt(boton.parentElement.id)][2] = "F";
    }
    if(getID % 3 == 1){
        console.log("PRESENTE");
        matriz[parseInt(boton.parentElement.id)][2] = "P";

    }
    if(getID % 3 == 2){
        console.log("TARDANZA");
        matriz[parseInt(boton.parentElement.id)][2] = "T";
    }

    console.log(matriz[parseInt(boton.parentElement.id)]);

    crearJusti(getID, matriz[parseInt(boton.parentElement.id)][2])
})
