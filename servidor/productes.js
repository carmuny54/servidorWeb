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
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Paris", "Billete Primera Clase", 700, "/web/imatges/paris.jpg", "Paris es la ciudad del amor")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Roma", "Billete Clase Turista", 120, "/web/imatges/roma.jpg", "hola")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Barcelona", "Billete Clase Turista", 200, "/web/imatges/barcelona.jpg", "Barcelona es una ciudad española, capital de la comunidad autónoma de Cataluña, de la comarca del Barcelonés y de la provincia homónima. Con una población de 1 636 762 habitantes en 2019,6​ es la segunda ciudad más poblada de España después de Madrid, y la décima de la Unión Europea. El área metropolitana de Barcelona tiene 3 291 654 (2019),7​ y el ámbito metropolitano de Barcelona, cuenta con 4 895 876 habitantes (2019), siendo así la quinta ciudad de mayor población de la Unión Europea.8​9​")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Amsterdam", "Billete Clase Turista", 180, "/web/imatges/amsterdam.jpg", "hola")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Moscú", "Billete Clase Turista", 220, "/web/imatges/moscu.jpg", "hola")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Londres", "Billete Clase Turista", 150, "/web/imatges/londres.jpg", "hola")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Tokyo", "Billete Clase Turista", 185, "/web/imatges/tokyo.jpg", "hola")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, desextendida) VALUES ("Estambul", "Billete Clase Turista", 180, "/web/imatges/turquia.jpg", "hola")'
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


    
}

// Export
module.exports = Obj

