'use strict'
class Obj {

    constructor () {
    }

    // Inicia l'objecte
    init () {
        // TODO
    }

    async llistat (db, utils, data, result) {

        let sql = '',
            taulaProductesExisteix = false,
            taula = null
    
        // Forçem una espera al fer login amb codi, perquè es vegi la càrrega (TODO: esborrar-ho)
        await utils.promiseWait(1000) 
        
        // Mira si la taula "productes" existeix
        try {
            taulaProductesExisteix = await db.promiseTableExists('productes')
        } catch (e) {
            console.warn('Avis, funció login: la taula "productes" no existeix')
        }
    
        // Si la taula "productes" no existeix, en crea una i afegeix productes
        if (!taulaProductesExisteix) {
            try {
                sql = 'CREATE TABLE productes (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(50) NOT NULL, descripcio TEXT, preu INT(6), imatge VARCHAR(255), desextendida TEXT)'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Paris", "Billete Primera Clase", 700, "/web/imatges/paris.jpg", "París es la capital de Francia y su ciudad más poblada. Capital de la región de Isla de Francia, constituye el único departamento unicomunal del país.")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Roma", "Billete Clase Turista", 120, "/web/imatges/roma.jpg", "Roma es una ciudad italiana de 2 856 133 habitantes,​ capital de la región del Lacio y de Italia. Es el municipio más poblado de Italia y la tercera ciudad más poblada de la Unión Europea. Por antonomasia, se la conoce desde la Antigüedad como la Urbe.")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Barcelona", "Billete Clase Turista", 200, "/web/imatges/barcelona.jpg", "Barcelona es una ciudad española, capital de la comunidad autónoma de Cataluña, de la comarca del Barcelonés y de la provincia homónima. Con una población de 1 636 762 habitantes en 2019,6​ es la segunda ciudad más poblada de España después de Madrid, y la décima de la Unión Europea. El área metropolitana de Barcelona tiene 3 291 654 (2019),7​ y el ámbito metropolitano de Barcelona, cuenta con 4 895 876 habitantes (2019), siendo así la quinta ciudad de mayor población de la Unión Europea.8​9​")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Amsterdam", "Billete Clase Turista", 180, "/web/imatges/amsterdam.jpg", "Ámsterdam es la capital oficial del Reino de los Países Bajos. La ciudad está situada entre la bahía del IJ, al norte, y a las orillas del río Amstel, al sureste. Fundada en el siglo XII como un pequeño pueblo pesquero, en la actualidad es la ciudad más grande del país y un gran centro financiero y cultural de proyección internacional.")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Moscú", "Billete Clase Turista", 220, "/web/imatges/moscu.jpg", "Moscow is the capital and most populous city of Russia. Situated on the Moskva River in the Central Federal District of Western Russia, Moscos population is estimated at 12.5 million residents within the city proper, while over 17 million residents in the urban area, and over 20 million residents in the Moscow Metropolitan Area. The city limits cover an area of 2,511 square kilometres, while the metropolitan area covers over 26,000 square kilometres , Moscow is among the world largest cities, being the most populous city entirely within Europe, the most populous urban area in Europe, the most populous metropolitan area in Europe, and also the largest city on the European continent.")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Londres", "Billete Clase Turista", 150, "/web/imatges/londres.jpg", "Londres es la capital y mayor ciudad de Inglaterra y del Reino Unido. Situada a orillas del río Támesis, Londres es un importante asentamiento humano desde que fue fundada por los romanos con el nombre de Londinium hace casi dos milenios.​ El núcleo antiguo de la urbe, la City de Londres, conserva básicamente su perímetro medieval de una milla cuadrada. Desde el siglo XIX el nombre «Londres» también hace referencia a toda la metrópolis desarrollada alrededor de este núcleo. El grueso de esta conurbación forma la región de Londres y el área administrativa del Gran Londres, gobernado por el alcalde y la asamblea de Londres.")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Tokyo", "Billete Clase Turista", 185, "/web/imatges/tokyo.jpg", "Tokio oficialmente Metrópolis de Tokio es la capital de facto​ de Japón, localizada en el centro-este de la isla de Honshu, concretamente en la región de Kantō. En conjunto forma una de las 47 prefecturas de Japón. Es el centro de la política, economía, educación, comunicación y cultura popular del país. Cuenta también con la mayor concentración de sedes corporativas, instituciones financieras, universidades y colegios, museos, teatros, y establecimientos comerciales y de entretenimiento de todo Japón.")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Estambul", "Billete Clase Turista", 180, "/web/imatges/turquia.jpg", "Turquía, de forma oficial la República de Turquía es un país soberano transcontinental,​ con la mayor parte de su territorio situado en Asia Occidental y una menor en Europa meridional, que se extiende por toda la península de Anatolia y Tracia Oriental en la zona de los Balcanes.")'
                await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: no s'ha pogut crear la taula productes"})  
            }
        }
    
        // Demana la informació de productes
        if (data.id) {
            try {
                sql = 'SELECT * FROM productes WHERE id=' + data.id
                taula = await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
            }
        } else {
            try {
                sql = 'SELECT * FROM productes'
                taula = await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
            }
        } 
    
        // Si hem aconseguit dades corectament, tornem la taula resultant
        if (typeof taula === 'object' && typeof taula.length === 'number') {
            result.json({ resultat: "ok", missatge: taula })
        } else {
            result.json({ resultat: "ko", missatge: [] })
        }
    }

async guarda (db, utils, data, result) {
        let sql = '',
            usuariEsAdmin = false,
            correuAdmin = utils.preventInjection(data.correuAdmin),
            tokenAdmin = utils.preventInjection(data.tokenAdmin),
            codi = crypto.createHash('md5').update(utils.preventInjection(data.codi)).digest("hex"),
            taula = [],
            resultatInsert = null,
            insertId = 0,
            pathImatgeComplet = ''

        // Forçem una espera perquè es vegi la càrrega (TODO: esborrar-ho)
        await utils.promiseWait(1000) 

        // Mira si l'usuari té permisos d'administració
        try {
            usuariEsAdmin = await this.usuariEsAdmin(db, correuAdmin, tokenAdmin)
        } catch (e) {
            console.log(e)
            return result.json({ resultat: "ko", missatge: "Error, funcio productes.guarda: hi ha hagut un error al comprovar els permisos de l'usuari"})  

        }

        if (!usuariEsAdmin) {
            return result.json({ resultat: "ko", missatge: "Error, funcio productes.guarda: l'usuari no té permisos d'administració"})  
        } else {
            // Busquem algun usuari amb aquest correu
            try {
                sql = 'SELECT id FROM productes WHERE id="' + data.nom + '"'
                taula = await db.promiseQuery(sql)
            } catch (e) {
                return result.json({ resultat: "ko", missatge: "Error, funcio productes.guarda: hi ha hagut un error al insertar un nou producte"})  
            }
            // Si hem trobat un usuari amb aquest correu, apuntem l'identificador

            // Guardem les dades
            if (data.nom === '') {
                // Si no tenim 'id' afegim un nou usuari
                try {
                    sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("' + data.nom + '", "' + data.descripcio + '", "'+ data.preu +'" )'
                    resultatInsert = await db.promiseQuery(sql)
                } catch (e) {
                    return result.json({ resultat: "ko", missatge: "Error, funcio productes.guarda: hi ha hagut un error al insertar un nou producte"})  
                }
                // Si han pujat una imatge, la guardem
                if (data.imatge !== '') {
                    insertNom = resultatInsert.insertNom
                    // Guardem la imatge en un arxiu
                    try {
                        pathImatgeComplet = await utils.guardaImatge('./web/imatges/producte-' + insertNom, data.imatge)
                    } catch (e) {
                        console.log(e)
                        return result.json({ resultat: "ko", missatge: "Error, funcio productes.guarda: hi ha hagut un error al guardar la imatge al insert"})  
                    }
                    // Actualitzem el camp imatge
                    try {
                        sql = 'UPDATE productes SET imatge="' + pathImatgeComplet + '" WHERE id=' + insertNom
                        await db.promiseQuery(sql)
                    } catch (e) {
                        console.log(e)
                        return result.json({ resultat: "ko", missatge: "Error, funcio productes.guarda: hi ha hagut un error al actualitzar el nom de la imatge al insert"})  
                    }
                }
            } else {
                // Si tenim id modifiquem les dades d'aquesta fila
                try {
                    sql = 'UPDATE productes SET nom="' + data.nom + '", descripcio="' + data.descripcio + '" preu="' + data.preu + '" WHERE id=' + data.nom
                    await db.promiseQuery(sql)
                } catch (e) {
                    return result.json({ resultat: "ko", missatge: "Error, funcio productes.guarda: hi ha hagut un error al actualitzar el producte"})  
                    console.log('update', taula)
                }
                // Si han pujat una imatge, la guardem
                if (data.imatge !== '') {
                    // Guardem la imatge en un arxiu
                    try {
                        pathImatgeComplet = await utils.guardaImatge('./web/imatges/producte-' + data.nom, data.imatge)
                    } catch (e) {
                        console.log(e)
                        return result.json({ resultat: "ko", missatge: "Error, funcio productes.guarda: hi ha hagut un error al guardar la imatge al update"})  
                    }
                    // Actualitzem el camp imatge
                    try {
                        sql = 'UPDATE productes SET imatge="' + pathImatgeComplet + '" WHERE id=' + data.nom
                        await db.promiseQuery(sql)
                    } catch (e) {
                        return result.json({ resultat: "ko", missatge: "Error, funcio productes.guarda: hi ha hagut un error al actualitzar el nom de la imatge al update"})  
                    }
                }
            }
            return result.json({ resultat: "ok", missatge: {} })  
        }
    }

}

// Export
module.exports = Obj

