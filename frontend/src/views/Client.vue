<template>
<section id="client">
  <section id="header">
    <div class="header">
      <h1 class="f-accent f-italic f-400 f-30">Double-Détente</h1>
      <h2 class="f-main f-400 f-12">Massages bien-être à Saint-Germain-En-Laye</h2>
    </div>
    <nav class="header__navigation">
      <ul class="header__navigation-list f-accent">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/">Qui suis-je ?</router-link></li>
        <li><router-link to="/">Prestations</router-link></li>
        <li><router-link to="/">Me contacter</router-link></li>
        <li v-if="loggedIn" @click="handleLogOut">Se déconnecter</li>
      </ul>
    </nav>
    <div class="header__alert">
      <p class="f-accent f-300">Merci de venir muni•e de votre masque. Le nécessaire pour désinfection des mains est à disposition sur place à votre arrivée.</p>
    </div>
  </section>
  <router-view/>
  <section id="footer">
      <div class="footer__footer">

      </div>
      <div class="footer__signature">
        <p class="f-main f-300 f-09 white">Nos prestations ne remplacent en aucun cas les traitements médicaux. V.N</p>
        <p class="f-main f-500 f-09 white">© 2021 -  Espace Double-Détente - Site réalisé par <a href="">krum.py</a></p>
      </div>
    </section>
</section>
</template>
<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  methods: {
    handleLogOut() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
<style lang="scss">
/*       RESET        */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


/*      TYPOGRAPHY     */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.f-accent {font-family: 'Playfair Display', serif;}
.f-main {font-family: 'Poppins', sans-serif;}
.f-italic {font-style: italic;}

.f-300 {font-weight: 300;} .f-400 {font-weight: 400;} .f-500 {font-weight: 500;} .f-600 {font-weight: 600;} .f-700 {font-weight: 700;}
.f-06 {font-size: 0.6em} .f-08 {font-size: 0.8em} .f-09 {font-size: 0.9em} .f-10 {font-size: 1em} .f-12 {font-size: 1.2em} .f-14 {font-size: 1.4em} .f-15 {font-size: 1.5em} .f-20 {font-size: 2em} .f-24 {font-size: 2.4em} .f-30 {font-size: 3em}

.t-center {text-align: center;}

.white {color: white}
a {text-decoration: none;}
/*     MARGIN HELPERS  */
.mt-01 {margin-top: 0.1em} .mt-02 {margin-top: 0.25em} .mt-03 {margin-top: 0.5em} .mt-04 {margin-top: 1em} .mt-05 {margin-top: 2em} 
.mb-01 {margin-bottom: 0.1em} .mb-02 {margin-bottom: 0.25em} .mb-03 {margin-bottom: 0.5em} .mb-04 {margin-bottom: 1em} .mb-05 {margin-bottom: 2em}
.mr-01 {margin-right: 0.1em} .mr-02 {margin-right: 0.25em} .mr-03 {margin-right: 0.5em} .mr-04 {margin-right: 1em} .mr-05 {margin-right: 2em}
.ml-01 {margin-left: 0.1em} .ml-02 {margin-left: 0.25em} .ml-03 {margin-left: 0.5em} .ml-04 {margin-left: 1em} .ml-05 {margin-left: 2em}

.noselect {user-select: none;}
.flex-row {display: flex; flex-direction: row} .flex-col {display: flex; flex-direction: column}
.j-center {justify-content: center;} .j-between {justify-content: space-between;}
.a-center {align-items: center;}
.f-nogrow {flex-grow: 0} .f-grow {flex-grow: 1}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.7em;
}
.container {
  width: 100%;
  max-width: 1180px;
  padding: 0 2em;
  margin: 0 auto;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.j-start {
  justify-content: start;
}
/*        BLOCS        */
/*      1. Header      */
.header {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F6F3F7;
  h2 {
    letter-spacing: 0.15em;
  }
}

.header__navigation {
  width: 100%;
  background-color: #F4EEF6;
}
.header__navigation-list {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  width: 80%;
  max-width: 980px;
  margin: 0 auto;
  a {
    color: black;
  }
}

.header__alert {
  padding: 0.3em 2em;
  width: 100%;
  min-height: 35px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #503e57;
}

/*     ELEMENTS     */
/*     BUTTONS      */
.btn {
  cursor: pointer;
  border-radius: 1.5em;
  padding: 0.6em 3.5em;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  border: none;
  font-size: 0.9em;
}
.btn-white {
  background-color: white;
  border-color: white;
}
.btn-dark {
  background-color: #2A212E;
  color: white;
}
/*     FOOTER     */
  .footer__footer {
    width: 100%;
    height: 450px;
    background-color: #2A212E;
  }
  .footer__signature {
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #5A4162;
    a {
      color: white;
    }
  }
</style>
