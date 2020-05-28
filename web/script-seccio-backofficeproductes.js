class ObjSeccioBackofficeProductes {

    constructor () {
        this.codiImatge = ''
    }


    async iniciaSeccio () {

    let refLoading = document.getElementById('backofficeProductesLoading'),
        refContinguts = document.getElementById('backofficeProductesContinguts'),
        objRebut = null,
        valor = null,
        codiHTML = '',
        cntProductos = 0,
        usuari = login.llegeixDadesUsuari(),
        objEnviament = {
            correu: usuari ? usuari.correu : null,
            codi:    '',
            token:  usuari ? usuari.token : null,
        }



        // Amaguem els continguts actuals i mostrem la càrrega
        refContinguts.style.display = 'none'
        refLoading.style.display = 'flex'


        // Demanem el llistat de productes al servidor
        objRebut = await promiseCallServer('POST', '/call/llistatProductes', {})


                // Transformem l'objecte rebut en codi HTML
                if (objRebut.resultat === 'ok') {
                    navegacio.dadesSeccio = objRebut.missatge
                    codiHTML = codiHTML + '<div class="centro">'
                    codiHTML = codiHTML + '<table class="tabla_usuarios">'
                    codiHTML = codiHTML + '<tr class="tr_usuarios_info">'
                    codiHTML = codiHTML + '<td class="td_usuarios">Nombre</td>'
                    codiHTML = codiHTML + '<td class="td_usuarios">Descripcio</td>'
                    codiHTML = codiHTML + '<td class="td_usuarios">Precio</td>'
                    codiHTML = codiHTML + '<td class="td_usuarios"></td>'
                    codiHTML = codiHTML + '</tr>'
                    for (cntProductos = 0; cntProductos < navegacio.dadesSeccio.length; cntProductos = cntProductos + 1) {
                        valor = navegacio.dadesSeccio[cntProductos]
                        codiHTML = codiHTML + '<tr class="tr_usuarios_usuarios">'
                        codiHTML = codiHTML + '<td class="td_usuarios">' + valor.nom + '</td>'
                        codiHTML = codiHTML + '<td class="td_usuarios">' + valor.descripcio + '</td>'
                        codiHTML = codiHTML + '<td class="td_usuarios">' + valor.preu + '</td>'
                        codiHTML = codiHTML + '<td class="td_usuarios"><i class="material-icons botoIcona" onclick="seccioBackofficeProductes.mostraEdicioProductes(' + valor.id + ')">edit</i></td>'
                        codiHTML = codiHTML + '</tr>'
                    }
                    codiHTML = codiHTML + '</table>'
                    codiHTML = codiHTML + '</br></br>'
                    codiHTML = codiHTML + '<div class="boton_usuarios_div">'
                    codiHTML = codiHTML + '<input class="boton_usuarios" type="button" value="Afegir usuari" onclick="seccioBackofficeUsuaris.mostraAfegeixUsuari()" />'
                    codiHTML = codiHTML + '</div>'
                    codiHTML = codiHTML + '</div>'
            
                    }



            // Amaguem la càrrega i mostrem el llistat de productes
            refContinguts.innerHTML = codiHTML
            refContinguts.style.display = 'flex'
            refLoading.style.display = 'none'

    }


    mostraEdicioProductes (id) {
        let refNom = document.getElementById('BackofficeProductesNom'),
            refDescriptcio = document.getElementById('BackofficeProductesDescriptcio'),
            refPreu = document.getElementById('BackofficeProductesPreu'),
            refImatge = document.getElementById('BackofficeProductesImatge'),
            refEsborra = document.getElementById('BackofficeProductesBotoEsborra'),
            cnt = 0,
            valor = null

                    // Busca l'usuari que s'ha d'editar a partir del 'id', i carrega les dades al formulari del popup
        for (cnt = 0; cnt < navegacio.dadesSeccio.length; cnt = cnt + 1) {
            valor = navegacio.dadesSeccio[cnt]
            if (valor.id === id) {
                refNom.value = valor.nom
                refDescriptcio.value = valor.descripcio
                refPreu.value = valor.preu
                refImatge = valor.imatge
                break;
            }
        }

                // Buidem el valor de les dades de imatge (només serveix per quan escullen una nova imatge)
                this.codiImatge = ''

        // Mostra el botó esborra del popup



        popups.mostraPopup('popupBackofficeProductes')
    }


    mostraImatge () {
        let reader = new FileReader(),
            refArxiu = document.getElementById('backofficeProductesArxiu'),
            refImatge = document.getElementById('backofficeProductesImg')

        reader.onload = (evt) => {
            this.codiImatge = evt.target.result
            refImatge.src = evt.target.result
        }
        reader.readAsDataURL(refArxiu.files[0])
    }    



    // Guarda les dades del formulari d'usuari al servidor
    async guardaDadesProductesAlServidor () {
        let refCarrega = document.getElementById('backofficeProductesPopupLoading'),
            refError = document.getElementById('backofficeProductesPopupError'),
            refNom = document.getElementById('BackofficeProductesNom'),
            refDescriptcio = document.getElementById('BackofficeProductesDescriptcio'),
            refPreu = document.getElementById('BackofficeProductesPreu'),
            dadesUsuari = login.llegeixDadesUsuari(),
            objEnviament = {
                correuAdmin: dadesUsuari ? dadesUsuari.correu : null,
                tokenAdmin:  dadesUsuari ? dadesUsuari.token : null,
                nom: refNom.value,
                descriptcio: refDescriptcio.value,
                preu: refPreu.value,
                imatge: ''
            },
            objRebut = {}

        if (this.codiImatge !== '') {
            objEnviament.imatge = this.codiImatge
        }

        refCarrega.style.display = 'flex'

        // Intentem enviar les dades al servidor
        try {
            objRebut = await promiseCallServer('POST', '/call/ProductesGuarda', objEnviament)
        } catch (e) {
            console.error(e)
        }

        refCarrega.style.display = 'none'
        if (objRebut.resultat === 'ok') {
            // Si hem pogut guardar les dades, tanquem el popup i actualitzem la secció
            popups.amagalsTots()
            this.iniciaSeccio()

        } else {
            // Mostrem l'error per consola
            console.error(objRebut)

            // Si no hem pogut guardar les dades, mostrem l'error una estona 
            refError.style.display = 'flex'
            await promiseWait(1500)
            refError.style.display = 'none'
        }
    }


}  