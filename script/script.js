        // Obligatoire pour Codesandbox (pb de dépendances...)
        // Le fichier script.js est donc ici inutile...
        // Le script est placé à la fin du body car l'attribut defer ne fonctionne que pour des scripts externes
        // CE N'EST PAS UNE BONNE PRATIQUE !!!

        // Variable globale contenant l'état du lecteur
        let etatLecteur;

        function lecteurPret(event) {
          // event.target = lecteur
          event.target.setVolume(50);
        }

        function changementLecteur(event) {
          // event.data = état du lecteur
          etatLecteur = event.data;
        }

        let lecteur;

        function onYouTubeIframeAPIReady() {
          lecteur = new YT.Player("video", {
            height: "390",
            width: "640",
            videoId: "7d_jQycdQGo",
            playerVars: {
              color: "white",
              enablejsapi: 1,
              modestbranding: 1,
              rel: 0
            },
            events: {
              onReady: lecteurPret,
              onStateChange: changementLecteur
            }
          });
        }

        // Hauteur de la vidéo
        const hauteurVideo = $("#video").height();
        // Position Y de la vidéo
        const posYVideo = $("#video").offset().top;
        // Valeur declenchant la modification de l'affichage (choix "esthétique")
        const seuil = posYVideo + 0.75 * hauteurVideo;

        // Gestion du défilement
        $(window).scroll(function () {
          // Récupération de la valeur du défilement vertical
          const scroll = $(window).scrollTop();

          // Classe permettant l'exécution du CSS
          $("#video").toggleClass(
            "scroll",
            etatLecteur === YT.PlayerState.PLAYING && scroll > seuil
          );
        });

        // Carroussel

        // Variable globale
        let index = 0;

        // Gestion des événements
        $('section:nth-of-type(4) span').click(function () {
          // Récupération index
          let indexN = $('section:nth-of-type(4) span').index(this);

          // Renouveller l'image
          $('section:nth-of-type(4) img').eq(index).fadeOut(1000).end().eq(indexN).fadeIn(1000);

          // Mettre à jour l'index
          index = indexN;
        });

        // Carroussel slide 3
        let trois = 0;

        // Gestion des événements
        $('section:nth-of-type(3)>div>span:first-of-type ').click(function () {
          // Récupération index
          let troisN = trois - 1;
          if (troisN === -1) {
            troisN = $('section:nth-of-type(3)>div>div>div').length - 1;

          }
          // Renouveller l'image
          $('section:nth-of-type(3)>div>div>div').eq(trois).fadeOut(1000).end().eq(troisN).fadeIn(1000);

          // Mettre à jour l'index
          trois = troisN;
        });

        $('section:nth-of-type(3)>div>span:nth-of-type(2) ').click(function () {
          // Récupération index
          let troisN = trois + 1;
          if (troisN === $('section:nth-of-type(3)>div>div>div').length) {
            troisN = 0;

          }
          // Renouveller l'image
          $('section:nth-of-type(3)>div>div>div').eq(trois).fadeOut(1000).end().eq(troisN).fadeIn(1000);

          // Mettre à jour l'index
          trois = troisN;
        });
        //carte
        //carte

        // Appelée si récupération des coordonnées réussie
        function positionSucces(position) {
          // Injection du résultat dans du texte
          const lat = Math.round(1000 * position.coords.latitude) / 1000;
          const long = Math.round(1000 * position.coords.longitude) / 1000;
          $("section:last-of-type>p").text(`Latitude: ${lat}°, Longitude: ${long}°`);
          carte.flyTo([position.coords.latitude, position.coords.longitude], 12);
          L.geoJSON(abc, {
            style: function (feature) {
              return {
                color: feature.properties.color
              };
            }
          }).bindPopup(function (layer) {
            return layer.feature.properties.description;
          }).addTo(carte);

        }

        // Appelée si échec de récuparation des coordonnées
        function positionErreur(erreurPosition) {
          // Cas d'usage du switch !
          let natureErreur;
          switch (erreurPosition.code) {
            case erreurPosition.TIMEOUT:
              // Attention, durée par défaut de récupération des coordonnées infini
              natureErreur = "La géolocalisation prends trop de temps...";
              break;
            case erreurPosition.PERMISSION_DENIED:
              natureErreur = "Vous n'avez pas autorisé la géolocalisation.";
              break;
            case erreurPosition.POSITION_UNAVAILABLE:
              natureErreur = "Votre position n'a pu être déterminée.";
              break;
            default:
              natureErreur = "Une erreur inattendue s'est produite.";
          }
          // Injection du texte
          $("section:last-of-type>p").text(natureErreur);
        }

        // Récupération des coordonnées au clic sur le bouton
        $(document).ready(function () {
          // Support de la géolocalisation
          if ("geolocation" in navigator) {
            // Support = exécution du callback selon le résultat
            navigator.geolocation.getCurrentPosition(positionSucces, positionErreur, {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 30000
            });
          } else {
            // Non support = injection de texte
            $("section:last-of-type>p").text("La géolocalisation n'est pas supportée par votre navigateur");
          }
        });

        // Création de la carte, vide à ce stade
        let carte = L.map('carte', {
          center: [47.2608333, 2.4188888888888886], // Centre de la France
          zoom: 5,
          minZoom: 4,
          maxZoom: 19,
        });

        // Ajout des tuiles (ici OpenStreetMap)
        // https://wiki.openstreetmap.org/wiki/Tiles#Servers
        L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        }).addTo(carte);

        // Ajout de l'échelle
        L.control.scale().addTo(carte);

        console.log(abc);


        // Menu
        const menu = document.querySelector('#menu');
        const haut = document.querySelector('#haut');
        const mid = document.querySelector('#mid');
        const bas = document.querySelector('#bas');
        const menutxt = document.querySelector('#menutxt');


        let etat = false;

        menu.addEventListener('click', () => {
          if (etat === false) {
            haut.style.transform = `translateY(11.5px) rotateZ(45deg)`;
            bas.style.transform = `translateY(-11.5px) rotateZ(-45deg)`;
            mid.style.transform = `rotateZ(-45deg)`;
            menutxt.style.left = '0';
            etat = !etat;
          } else {
            haut.style.transform = `translateY(0px) rotateZ(0deg)`;
            bas.style.transform = `translateY(0px) rotateZ(0deg)`;
            mid.style.transform = `rotateZ(0deg)`;
            menutxt.style.left = '-100vw';
            etat = !etat;
          }
        });

        // eslint-disable-next-line no-unused-vars
        function closeNav() {
          document.getElementById('menutxt').style.left = '-100vw';
          etat = !etat;
          haut.style.transform = `translateY(0px) rotateZ(0deg)`;
          bas.style.transform = `translateY(0px) rotateZ(0deg)`;
          mid.style.transform = `rotateZ(0deg)`;
        }

// PARALLAXE

$.fn.parallaxe = function(vitesse) {
  // Récupérer l'élément
  const element = $(this);

  // Hauteur du viewport
  const hViewport = $(window).height();

  // Hauteur de l'élément
  const hElt = element.height();

  function actualiser () {
      // Récupérer la position du viewport
      const posY = $(window).scrollTop();

      // Position au sein du body
      const y = element.offset().top;

      // On agit sur la position du background si on voit l'élément
      if (y > posY + hViewport || posY > y + hElt) {
          // En dehors du viewport
      } else {
          element.css({
              backgroundPositionY: `${Math.round((y - posY) * vitesse)}px`,
          })
      }
  }

  // Initialisation
  actualiser();

  // Ecoute du scroll
  $(window).scroll(actualiser);
}

$('#page1').parallaxe(.5);

$('#page2').parallaxe(.5);

$('#page3').parallaxe(.5);

$('#page4').parallaxe(.5);

$('#page5').parallaxe(.5);