# servidorWeb #

Aquest projecte és un servidor molt simple, per fer l'activitat de desenvolupament d'aplicacions web.

### Instal·lació ###

Cal instal·lar els següents paquets:

- 'nodejs', que farà de servidor
```
sudo apt install npm
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo n latest
```

- 'mariadb', que farà de base de dades
```
sudo apt install mariadb-server
```

- 'git', per descarregar el servidor bàsic
```
sudo apt install git
```

### Codi del servidor ###

Cal descarregar el codi de 'github'
```
git clone https://github.com/optimisme/servidorWeb.git
```

Per descarregar els mòduls del servidor web:
```
cd servidorWeb
npm install
```

### Base de dades ###

Cal donar d'alta una base de dades:
```
sudo mysql
CREATE DATABASE serverDB DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL ON serverDB.* TO 'user'@'localhost' IDENTIFIED BY '8ase2pwd';
FLUSH PRIVILEGES;
exit;
```

Per configurar la base de dades al servidor, modificar l'arxiu:
```
./servidorWeb/servidor/db.js
```

(Està configurat amb els paràmetres d'exemple d'aquesta pàgina)

### Fer anar el servidor ###

Des del mateix directori 'servidorWeb':
```
npm run app
```

El servidor es reinicia si fas algun canvi al codi o als arxius del servidor.

### Activitat ###

Cal que feu una pàgina web d’una agència de viatges amb les següents especificacions:

- El menú (o els menús) s’han d’adaptar a la mida de la pantalla, això inclou dispositius mòbils. En aquests dispositius, es recomana que sigui en format d’animació cap a algún dels cantons de la pantalla. Cal tenir en compte que els elements del backoffice no es veuen si l’usuari no està logat, i que la gestió d’usuaris només està disponible per administradors.
- La pàgina d’inici ha de mostrar diferents productes per atraure l’atenció de l’usuari. Es recomana que siguin dinàmics de la llista de productes.
- La pàgina de presentació ha de mostrar informació de l’empresa, els valors i punts forts que fan a aquesta empresa especial. Ha d’incloure una taula, la capçalera d’aquesta ha de tenir un format diferent a la resta de files, i els colors de fons de les files han de ser alternats per facilitat la lectura.
- La pàgina de productes ha de mostrar un llistat de productes
- La pàgina de contacte ha de mostrar la direcció de l’empresa i ha de tenir un objecte google maps mostrant aquesta ubicació
- La gestió d’usuaris ha de permetre afegir/modificar/borrar usuaris segons permisos ‘admin’ i ‘normal’, només els usuaris ‘admin’ han de poder fer aquesta gestió
- La gestió de productes ha de permetre afegir/modificar/borrar productes, només els usuaris ‘admin’ han de poder fer aquesta gestió. Els usuaris ‘normal’ en canvi han de poder modificar les dades dels productes però no afegir o borrar
- Cal fer una seccio de producte, per veure la informació ampliada específica a cada un dels productes

### Entregues ###

| Data | Entrega |
| --- | --- |
| 09/03/20 | Menú |
| 16/03/20 | Presentació i contacte |
| 23/03/20 | Productes |
| 06/04/20 | Gestió d'usuaris |
| 20/04/20 | Gestió de productes |
| 04/05/20 | Pàgina d'inici amb productes dinàmics |
| 18/05/20 | Pàgina de productes individual |
| 25/05/20 | Revisió, bugs arreglats i entrega |


