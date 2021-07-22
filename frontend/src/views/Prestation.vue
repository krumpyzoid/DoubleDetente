<template>
    <section id="prestation">
        <div class="container">
                <div v-if="stage==0" class="prestation__wrapper">
                    <div class="prestation__img">

                    </div>
                    <div class="prestation__description">
                        <div class="row">
                            <h1>{{ prestation.titre }}</h1>
                            <button class="btn btn-dark" @click="toStage(1)">Offrir</button>
                        </div>
                        <h2>{{ prestation.temps }} heure / {{ prestation.prix }} €</h2>
                        <h3>{{ prestation.titre2 }}</h3>
                        <p>{{ prestation.description }}</p>
                        <div class="row">
                            <div class="prestation__description-bienfait">
                                <i class="icofont-sun"></i>
                                <p>Un rayon de soleil</p>
                            </div>
                            <div class="prestation__description-bienfait">
                                <i class="icofont-sun"></i>
                                <p>Un rayon de soleil</p>
                            </div>
                            <div class="prestation__description-bienfait">
                                <i class="icofont-sun"></i>
                                <p>Un rayon de soleil</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="stage==1" class="prestation__offrir">
                    <div class="row mb-03">
                        <span></span>
                        <h2>Offrez un moment de bonheur</h2>
                        <button class="btn btn-dark" @click="stage=0">Retour au produit</button>
                    </div>
                    <div class="prestation__offrir-objet">
                        <div class="row">
                            <h3>{{ prestation.titre }}</h3>
                            <h3>{{ prestation.temps }} heure / {{ prestation.prix }} €</h3>
                        </div>
                        <p>{{ prestation.courtedescription }}</p>
                        <div class="row">
                            <div class="row j-start">
                                <label class="mr-03" for="poste">Envoyer le bon cadeau par la poste {{canEdit?'(5€)':returnLivraisonPostale}}</label><input v-if="canEdit" type="checkbox" id="poste" v-model="livraisonPostale">
                            </div>
                            <p class="noselect">Nombre de séances: <span v-if="canEdit" @click="incrementQuantity(1)">+</span> {{quantite}} <span v-if="canEdit" @click='incrementQuantity(-1)'>-</span></p>
                        </div>
                        <h1>Total: {{ total }}€</h1>
                    </div>
                    <div class="prestation__offrir-infos">
                        <div class="prestation__offrir-infos-left">
                        <div v-if="paidFor" class="flex-col j-center a-center">
                            <h2>Merci pour votre achat</h2>
                            <p>Référence: {{ payment_reference }}</p>
                            <p>Votre bénéficiaire va recevoir un mail avec son bon cadeau !</p>
                            <router-link to="/"><button class="btn btn-dark mt-02">Retour à la page d'accueil</button></router-link>
                        </div>
                        <div v-if="!paidFor">
                        <div class="row">
                            <h2>Coordonnées du bénéficiaire</h2>
                            <button v-if="!canEdit" @click="canEdit=true" class="btn btn-dark">Retour</button>
                        </div>
                        
                        <div v-if="canEdit">
                        <form action="">
                            <div class="grid-2">
                                <div class="input">
                                    <label for="">Prénom</label>
                                    <input type="text" v-model="benefprenom">
                                </div>
                                <div class="input">
                                    <label for="">Nom</label>
                                    <input type="text" v-model="benefnom">
                                </div>
                            </div>
                            <div class="grid-2">
                                <div class="input">
                                    <label for="">Email</label>
                                    <input type="text" v-model="benefmail">
                                </div>
                            </div>
                            <div v-if="livraisonPostale">
                            <div class="grid-2">
                                <div class="input">
                                    <label for="">Code postal</label>
                                    <input type="text" v-model="benefcp">
                                </div>
                                <div class="input">
                                    <label for="">Ville</label>
                                    <input type="text" v-model="benefville">
                                </div>
                            </div>
                            <div class="grid-2">
                                <div class="input">
                                    <label for="">Adresse</label>
                                    <input type="text" v-model="benefadresse">
                                </div>
                            </div>
                            </div>
                        </form>
                        <button class="btn btn-dark" @click.prevent='validateForm'>Passer au paiement</button>
                        </div>
                        <div v-if="!canEdit">
                            <div class="offrir__coordonnees-lock">
                               <h3>{{ benefprenom }} {{ benefnom }}</h3>
                                <p>{{ benefmail }}</p>
                                <div v-if="livraisonPostale">
                                    <p>{{ benefadresse }}</p>
                                    <p>{{ benefcp }} {{ benefville }}</p>   
                                </div> 
                            </div>
                            <h3>Montant à payer: {{ total }}</h3>
                            

                            <div ref="paypal"></div>
                        </div>
                        </div>
                        </div>
                        <div class="prestation__offrir-infos-right">
                        </div>
                    </div>
                </div>
        </div> 
        
    </section>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            stage: 0,
            prestation: {},
            quantite: 1,
            paidFor: false,
            loading: false,
            canEdit: true,
            livraisonPostale: false,
            benefnom: '',
            benefprenom: '',
            benefmail: '',
            benefadresse: '',
            benefcp: '',
            benefville: '',
            payment_reference: ''
        }
    },
    computed: {
        returnLivraisonPostale() {
            let string
            if (this.livraisonPostale) string =': Oui'
            if (!this.livraisonPostale) string = ': Non'
            return string
        },
        total() {
            let bonus
            this.livraisonPostale?bonus=5:bonus=0
            return this.quantite * this.prestation.prix + bonus
        }
    },
    methods: {
        getPrestation() {
            const slug = this.$route.params.slug
            const qstring = 'http://localhost:1337/prestations?slug=' + slug
            console.log(qstring)
            axios.get(qstring)
                    .then(res => {this.prestation = res.data[0]})
        },
        toggleStage() {
            if (this.stage == 0) {
                this.stage = 1
                return}
            if (this.stage == 1) this.stage = 0
        },
        toStage(stage) {
            this.stage = stage
        },
        setLoaded() {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: this.prestation.courtedescription,
                                amount: {
                                    currency_code: "USD",
                                    value: this.total
                                }
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    let order = await actions.order.capture();
                    console.log(order)
                    let beneficiaire = {
                        nom: this.benefprenom + ' ' + this.benefnom,
                        email: this.benefmail
                    }
                    if (this.livraisonPostale) {
                        beneficiaire = { 
                            ...beneficiaire,
                            adresse: this.benefadresse,
                            cp: this.benefcp,
                            ville: this.benefville
                        }
                    }
                    order = {
                        ...order,
                        beneficiaire: beneficiaire,
                        prestation: this.prestation.id,
                        quantity: this.quantite
                    }
                    this.paidFor = true;
                    this.loading = false;
                    this.payment_reference = order.id;
                    axios.post('http://localhost:1337/boncadeaus', order)
                        .then(res => console.log(res))
                },
                onError: err => {
                    console.log(err)
                }
            })
            .render(this.$refs.paypal)
        },
        validateForm() {
            this.canEdit = false;
            setTimeout(this.setLoaded, 50);
        },
        incrementQuantity(qty) {
            if (this.quantite + qty > 0) this.quantite += qty
        }
    },
    mounted() {
        this.getPrestation();
    },
    components: {
    }
}
</script>

<style lang="scss">
    .prestation__wrapper {
        margin: 2em 0;
        display: grid;
        grid-template-columns: 5fr 7fr;
        column-gap: 2em;
    }
    .prestation__description {
        background-color: cadetblue;
        padding: 2em;
        h1  {
            font-size: 2em;
            font-weight: 500;
        }
        h2 {
            font-size: 1.2em;
            font-weight: 400;
            margin-bottom: 1em;
        }
        p {
            font-size: 0.9em;
        }
    }
    .prestation__img {
        width: 100%;
        height: 500px;
        background-color: blue;
    }
    .prestation__description-bienfait {
        margin-top: 2em;
        display: flex;
        flex-direction: column;
        align-items: center;
        i {
            font-size: 3em;
        }
    }

    /*    OFFRIR      */
    .prestation__offrir {
        margin-top: 2em;
    }
    .prestation__offrir-objet {
        padding: 1em 2em;
        background-color: rgb(234, 214, 250);
        border: 1px solid #5A4162;
        border-bottom: none;
    }
    .prestation__offrir-infos {
        flex-shrink: 1;
        display: grid;
        grid-template-columns: 7fr 5fr;
        margin-bottom: 1em;
        border: 1px solid #5A4162;
        background-color: rgb(251, 236, 255);
        .input {
            display: flex;
            flex-direction: column;
            margin-right: 0.5em;
            margin-bottom: 1em;
            label {
                font-size: 0.8em;
            }
            input {
                padding: 0.2em 0.5em;
                border-radius: 0.5em;  
                border: 1px solid #5A4162;
            }
            
        }
    }
    .prestation__offrir-infos-left {
        padding: 1em 2em;
        flex-shrink: 1;
    }
    .prestation__offrir-infos-right {
        width: 100%;
        height: 100%;
        background-color: #5A4162;
    }
    .offrir__coordonnees-lock {
        margin-top: 1em;
        padding: 1em;
        background-color: rgb(234, 214, 250);
        border: 1px solid #5A4162;
        margin-bottom: 1em;
    }
    /* TRANSITIONS */
    .fade-enter-active {
        transition: all .5s ease;
    }
    .fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter, .fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
</style>