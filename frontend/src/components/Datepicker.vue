<template>
    <div class="prestation__datepicker-wrapper">
                    <div class="prestation__datepicker">
                        <div class="prestation__datepicker-header">
                            <i class="icofont-arrow-left icofont-2x"></i>
                            <div>
                                <h1>Réservez en ligne</h1>
                                <p>Semaine du 24/01 au 31/01</p>
                            </div>
                            <i class="icofont-arrow-right icofont-2x"></i>
                        </div>
                        <div class="prestation__datepicker-body">
                            <div class="prestation__datepicker-table">
                                <ul>
                                    <li class="prestation__datepicker-title">Lundi</li>
                                    <li class="prestation__datepicker-slot">8:00</li>
                                    <li class="prestation__datepicker-slot">9:00</li>
                                    <li class="prestation__datepicker-slot">10:00</li>
                                </ul>
                                <ul>
                                    <li class="prestation__datepicker-title">Mardi</li>
                                    <li class="prestation__datepicker-slot">8:00</li>
                                </ul>
                                <ul>
                                    <li class="prestation__datepicker-title">Mercredi</li>
                                    <li class="prestation__datepicker-slot">9:00</li>
                                </ul>
                                <ul>
                                    <li class="prestation__datepicker-title">Jeudi</li>
                                    <li class="prestation__datepicker-slot">8:00</li>
                                    <li class="prestation__datepicker-slot">17:30</li>
                                </ul>
                                <ul>
                                    <li class="prestation__datepicker-title">Vendredi</li>
                                    <li class="prestation__datepicker-slot">8:00</li>
                                    <li class="prestation__datepicker-slot">11:00</li>
                                </ul>
                                <ul>
                                    <li class="prestation__datepicker-title">Samedi</li>
                                    <li class="prestation__datepicker-slot">8:00</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
</template>
<style lang="scss">
.prestation__datepicker-wrapper {
        margin: 2em 0;
        grid-row: 2;
        grid-column: 1/3;
        width: 100%;
        background-color: white;
        display: flex;
        flex-direction: row;
    }
    .prestation__datepicker {
        flex-grow: 1;
    }
    .prestation__datepicker-header {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 1em;
        text-align: center;
        background: rgb(164, 201, 255);
    }
    .prestation__datepicker-body {
        padding: 0.5em 1em 1em 1em;
    }
    .prestation__datepicker-table {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        column-gap: 1em;
        max-height: 400px;
        overflow-y: scroll;
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            background: transparent;
        }
        ul {
            list-style-type: none;
        }
        li {
            text-align: center;
            margin-bottom: 0.5em;
        }
    }
    .prestation__datepicker-slot {
        padding: 0.2em 0.5em;
        background-color: lightblue;
        border-radius: 0.5em;
        font-size: 0.9em;
    }
</style>