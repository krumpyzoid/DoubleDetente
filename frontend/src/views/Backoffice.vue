<template>
    <section id="backoffice">
        <div class="backoffice__left backoffice__left--loggedin">
            <div v-if="loggedin" class="backoffice__nav">
                <ul>
                    <li>
                        <router-link to="/backoffice"><i class="icofont-ui-home"></i></router-link>
                        <div class="nav__tooltip">Accueil</div>
                    </li>
                    <li>
                        <router-link to="/backoffice/calendar"><i class="icofont-ui-calendar"></i></router-link>
                        <div class="nav__tooltip">Calendrier</div>
                    </li>
                    <li>
                        <router-link to="/backoffice/edit"><i class="icofont-edit"></i></router-link>
                        <div class="nav__tooltip"><p>Editer la page d'accueil</p></div>
                    </li>
                    <li>
                        <router-link to="/backoffice/edit"><i class="icofont-chart-bar-graph"></i></router-link>
                        <div class="nav__tooltip">Rapports d'activité</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="backoffice__container backoffice__container--loggedin">
            <router-view/>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            loggedin: true
        }
    }
}
</script>

<style lang="scss">
    .backoffice__left {
        height: 100vh;
        position: fixed;
        background-color: #2A212E;
        z-index: 10000;
    }
    .backoffice__left--loggedin {
        width: 70px;
    }
    .backoffice__container {
        width: 100%;
        min-height: 100vh;
    }
    .backoffice__container--loggedin {
        padding-left: 70px;
    }
    .backoffice__nav {
        display: flex;
        flex-direction: column;
        padding-top: 5em;
        align-items: center;
        ul {
            list-style-type: none;
        }
        i {
            color: white;
            font-size: 1.4em;
        }
        a {
            text-decoration: none;
        }
        li {
            position: relative;
            margin-bottom: 2em;
        }
        .nav__tooltip {
            position: absolute;
            display: inline-block;
            top: 0;
            left: 60px;
            z-index: -1;
            font-size: 0.8em;
            background-color: rgb(248, 245, 250);
            border-radius: 0.4em;
            border: 1px solid rgb(226, 218, 230);
            color: rgb(107, 103, 110);
            padding: 0.2em 1em;
            transition: 0.3s ease-in;
            width: 120px;
            text-align: center;
            opacity: 0;
        }
        li:hover .nav__tooltip {
            opacity: 1;
            z-index: 100;
        }
    }
</style>