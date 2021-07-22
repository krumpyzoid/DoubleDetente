<template>
  <section id="home">
    <section id="hero">
      <div class="hero__content">
        <h1 class="f-accent f-italic f-400 f-30 white t-center">La Naturopathie Holistique,<br> pour protéger votre santé corps-esprit</h1>
        <h1 class="f-main f-400 f-14 white t-center mt-02">par <strong class="f-600">Viviane NOÉ</strong> spécialisée en Naturopathie Holistique</h1>
        <button class="btn btn-white mt-04">Découvrir</button>
      </div>
    </section>
    <section id="naturopathie">
      <div class="naturopathie__img"></div>
      <div class="naturopathie__text-wrapper">
        <div class="naturopathie__text">
          <h1 class="f-accent f-italic f-15">La naturopathie pour protéger votre santé</h1>
          <p class="f-main f-09">La médecine et la naturopathie peuvent être un duo précieux pour guérir.</p>
          <h2 class="f-main f-12 f-500">Pourquoi ?</h2>
          <p class="f-main f-09">Le médecin traite prodigieusement l'urgence et sauve la vie. <br>
          Le naturopathe, éducateur de santé, donne de la vie aux années. </p>
          <h2 class="f-main f-12 f-500">Comment ?</h2>
          <p class="f-main f-09">La naturopathie enseigne l'hygiène de vie en fonction des pathologies et en complément du traitement médical pour potentialiser le retour à la santé.</p>
        </div>
      </div>
    </section>
    <section id="art-de-vivre">
      <div class="container">
        <h1 class="f-accent f-italic f-15 t-center">Revitaliser l'organisme devient un art de vivre</h1>
        <div class="art-de-vivre__grid mt-05">
          <div class="art-de-vivre__item">
            <img src="../assets/ico-energy.svg" alt="">
            <h1>Protéger son énergie vitale</h1>
          </div>
          <div class="art-de-vivre__item">
            <img src="../assets/ico-alimentation.svg" alt="">
            <h1>Gérer son alimentation</h1>
          </div>
          <div class="art-de-vivre__item">
            <img src="../assets/ico-poids.svg" alt="">
            <h1>Trouver son poids idéal</h1>
          </div>
          <div class="art-de-vivre__item">
            <img src="../assets/ico-addiction.svg" alt="">
            <h1>Sortir d'une addiction</h1>
          </div>
          <div class="art-de-vivre__item">
            <img src="../assets/ico-famille.svg" alt="">
            <h1>Améliorer l'écosystème familial</h1>
          </div>
          <div class="art-de-vivre__item">
            <img src="../assets/ico-moral.svg" alt="">
            <h1>Retrouver un bon moral</h1>
          </div>
          <div class="art-de-vivre__item">
            <img src="../assets/ico-hygiene.svg" alt="">
            <h1>Adopter une bonne hygiène de vie</h1>
          </div>
        </div>
      </div>
    </section>
    <section id="quote">
      <div class="container">
        <p class="f-accent f-300 f-15 white t-center">"L'être humain est comme un instrument désaccordé. Pour l'accorder, il est nécessaire de découvrir les notes de la pensée, des émotions et enfin du corps.” - Dr E. Bach</p>
      </div>
    </section>
    <section id="prestations">
      <div class="prestation__column"></div>
      <div class="prestation__column"><h1 class="prestation__main-title f-accent f-italic f-700 f-24">Prestations & Tarifs</h1></div>
      <div class="prestation__column"></div>
      <div v-for="categorie in categories" v-bind:key="categorie.id" class="prestation__column">
        <h1 class="f-main f-600 f-15">{{ categorie.nom }}</h1>
        <ul class="prestation__list">
          <li v-for="prestation in categorie.prestations" v-bind:key="prestation.id" class="prestation__item">
            <router-link :to="`/prestations/${prestation.slug}`">
            <div class="row">
              <h1 class="f-main f-500 f-12">{{ prestation.titre.toUpperCase() }}</h1>
              <h2 class="f-main f-300 f-12">{{ prestation.temps * 60 }} min - {{ prestation.prix }}€</h2>
            </div>
            <p class="f-main f-300 f-09">{{ prestation.courtedescription }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <section id="gift">
      <h1 class="f-accent f-700 f-24 white">Offrez un moment de bonheur</h1>
      <h1 class="f-main f-300 f-12 white">Commandez un chèque cadeau pour une séance au choix</h1>
      <button class="btn btn-white f-12 mt-03">Faire un cadeau</button>
    </section>
    <section id="who-am-i">
      <div class="who-am-i__vivianne">
        <div class="who-am-i__vivianne-img">
          <img src="../assets/vivianne.jpg" alt="">
        </div>
        <h1 class="f-accent f-italic f-700 f-14 mt-03">Vivianne NOÉ</h1>
        <h1 class="f-accent f-italic f-300 f-09 mt-02">Masseuse & Naturopathe</h1>
        <p class="f-main f-400 f-09 mt-04">Formée en <strong>Nathuropathie Hollistique D.K.</strong> au Cenatho (Collège Européen de Naturopathie Hollistique) et diplômée en <strong>Shiatsu</strong>  de la Fédération Française de Shiatsu Traditionnel. Je pratique et enseigne le Shiatsu et <strong>l'Hygiène de Vie</strong>. La santé est devenue mon activité principale. J'ai été mon premier cobaye et je me consacre depuis plus de 30 ans à partager avec vous tout ce que j'ai appris. </p>
        <button class="btn btn-dark mt-05">En savoir plus</button>
      </div>
      <div class="who-am-i__img">
      </div>
    </section>
  </section>
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: []
    }
  },
  methods: {
    getCategories() {
      axios.get('http://localhost:1337/categories')
          .then(res => {
            this.categories.push(res.data[1])
            this.categories.push(res.data[2])
            this.categories.push(res.data[0])
            })
    }
  },
  mounted() {
    this.getCategories();
  }
}
</script>

<style lang="scss">
  /*     HERO     */
  #hero {
    position: relative;
    height: 550px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/hero.jpg');
    background-size: cover;
    background-position-y: 40%;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.37;
    }
  }
  .hero__content {
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1:nth-of-type(1) {
      line-height: 1em;
    }
  }
  /*    NATUROPATHIE   */
  #naturopathie {
    min-height: 450px;
    display: grid;
    grid-template-columns: 5fr 7fr;
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-auto-flow: reverse;
    }
  }
  .naturopathie__img {
    background-image: url('../assets/flower.jpg');
    background-size: cover;
    background-position-y: 40%;
    order: 1;
    @media (max-width: 800px) {
      height: 300px;
      order: 3;
    }
  }
  .naturopathie__text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F9E8FF;
    padding: 2em 7em;
    order: 2;
  }
  .naturopathie__text {
    color: #242025;
  }
  /*    ART-DE-VIVRE   */
  #art-de-vivre {
    position: relative;
    padding: 3em 0;
    color: #2A212E;
    background-color: #FCF5FF;
  }
  .art-de-vivre__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 800px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .art-de-vivre__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    width: 100%;
    height: 90px;
    margin-bottom: 2em;
    h1 {
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
      font-size: 0.9em;
    }
  }
  /*   QUOTE   */
  #quote {
    background-color: #2A212E;
    color: #E1DCE2;
    padding: 2.5em 0;
    text-align: start;
    p {
      opacity: 0.8;
    }
  }

  /*     PRESTATIONS   */
  #prestations {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      .prestation__column {
        padding-top: 5em;
        &:nth-of-type(1) {
          display: none;
        }
        &:nth-of-type(3) {
          display: none;
        }
      }
      text-align: center;
    }
    @media (max-width: 1400px) {
      .row {
        flex-direction: column;
      }
    }
  }
  .prestation__column {
    padding: 0 5em;
    padding-bottom: 3em;
    background-color: #F1EDF3;
    &:nth-of-type(3n + 2) {
      background-color: #F6F3F7;
    }
    &>h1 {
      color: #5A4162;
      text-align: center;
    }
    &:nth-of-type(2) {
      padding: 5em 1em;
    }
  }
  .prestation__main-title {
    top: 2em;
    text-align: center;
  }
  .prestation__list {
    list-style-type: none;
  }
  .prestation__item {
    border-bottom: 2px solid #88758E;
    padding: 1.5em 0;
    a {
      text-decoration: none;
    }
    &:last-of-type {
      border-bottom: none;
    }
    h1, h2 {
      color: #2A212E;
    }
    p {
      color: #6F6275;
    }
  }
  /*     GIFT      */
  #gift {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #5A4163;
    padding: 2.5em 2em;
    text-align: center;
    button {
      color: #5A4162;
    }
  }
  /*     WHO AM I    */
  #who-am-i {
    display: grid;
    grid-template-columns: 7fr 5fr;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
    background-color: #FCF5FF;
    min-height: 630px;
    strong {
      font-weight: 600;
    }
  }
  .who-am-i__vivianne {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 7em;
    color: #2A212E;
    @media (max-width: 1200px) {
      padding: 4em;
    }
  }
  .who-am-i__vivianne-img {
    border-radius: 50%;
    overflow: hidden;
    height: 200px;
    width: 200px;
    border: 2px solid white;
    box-shadow: 0px 4px 38px rgba(36, 32, 37, 0.15);
    img {
      width: 100%;
      height: auto;
    }
  }
  .who-am-i__img {
    background-image: url('../assets/vivianne-img.jpg');
    background-size: cover;
    background-position-y: 40%;
    @media (max-width: 1200px) {
      height: 400px;
    }
  }
</style>