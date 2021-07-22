<template>
  <div class="calendar">
      <div class="calendar__sidebar">
          <div v-if="newrdv" class="calendar__newrdv">
                <h1>Nouveau rendez-vous</h1>
                <p class="newrdv__decoration"><i class="icofont-ui-calendar"></i> {{ newRdvDate?formatDateToDDDDMM(newRdvDate):'Choisissez une date' }}</p>
                <p class="newrdv__decoration"><i class="icofont-clock-time"></i> {{ getRdvHours(rdvs[0] )}}</p>  
                <div class="row input__radio">
                    <input type="radio" id="rdv1" value="1" v-model="newRdvStatus">
                    <label for="rdv1">Rendez-vous</label>
                </div>
                <div class="row input__radio">
                    <input type="radio" id="rdv2" value="2" v-model="newRdvStatus">
                    <label for="rdv2">Bloquer un créneau</label>
                </div>
                <span v-if="newRdvStatus == 1" class="horizontal__divider"></span>
                <div v-if="newRdvStatus == 1" class="row input__radio">
                    <input type="radio" id="known2" value="1" v-model="newRdvKnown">
                    <label for="known2">Client existant</label>
                </div>
                <div v-if="newRdvStatus == 1" class="row input__radio">
                    <input type="radio" id="known1" value="0" v-model="newRdvKnown">
                    <label for="known1">Nouveau client</label>
                </div>
                <div v-if="newRdvStatus == 1 && newRdvKnown == 0" class="input-row">
                    <i class="icofont-user-alt-3"></i>
                    <input type="text" v-model="newRdvName" @input="syncTemporaryRdv">
                </div>
                <div v-if="newRdvStatus == 1 && newRdvKnown == 0" class="input-row">
                    <i class="icofont-mail"></i>
                    <input type="email"  @input="syncTemporaryRdv">
                </div>
                <div v-if="newRdvStatus == 1 && newRdvKnown == 0" class="input-row">
                    <i class="icofont-phone"></i>
                    <input type="text"  @input="syncTemporaryRdv">
                </div>
                <div v-if="newRdvStatus == 1 && newRdvKnown == 1" class="input-row">
                    <i class="icofont-boy"></i>
                    <input type="text" @input="syncTemporaryRdv">
                </div>
                <div v-if="newRdvStatus == 2" class="input-row">
                    <i class="icofont-label"></i>
                    <input type="text" v-model="newRdvLabel" @input="syncTemporaryRdv">
                </div>
              <button @click="createRdv">Ajouter</button>
              <button @click="cancelRdv">Annuler</button>
          </div>
          <div v-if="showrdv" class="calendar__newrdv">
              <h1>Détails</h1>
                <p class="newrdv__decoration"><i class="icofont-ui-calendar"></i> {{ formatDateToDDDDMM(newRdvDate) }}</p>
                <p class="newrdv__decoration"><i class="icofont-clock-time"></i> {{newRdvHours}} </p>
                <h3>{{ returnRdvStatus(newRdvStatus) }}</h3>
                <p v-if="newRdvStatus == 1" class="newrdv__decoration"><i class="icofont-user-alt-3"></i>{{ newRdvName }}</p>
                <p v-if="newRdvStatus == 2" class="newrdv__decoration">{{ newRdvLabel }}</p>
              <button>Supprimer</button>
              <button @click="cancelRdv">Annuler</button>
          </div>
      </div>
      <div class="calendar__container">
        <div class="calendar__header">
            <span @click="moveCurrentWeek(-1)"><i class="icofont-arrow-left icofont-2x"></i></span>
            <h1>{{ headerWeekDays }}</h1>
            <span @click="moveCurrentWeek(1)"><i class="icofont-arrow-right icofont-2x"></i></span>
        </div>
        <div class="calendar__calendar">
            <div class="calendar__rdvs">
                <div v-for="day in days" v-bind:key="day" class="calendar__col">
                    <div v-for="rdv in getRdvsOnThatDay(day)" 
                            v-bind:key="rdv.client" class="calendar__rdv" 
                            :style="{top: getRdvTop(rdv) + 'px', height: getRdvHeight(rdv) + 'px', backgroundColor: setBgColor(rdv)}"
                            @click="showRdv(rdv)">
                        <h3> {{ getRdvHours(rdv) }}</h3>
                        <p v-if="rdv.status == 1">{{ rdv.client }}</p>
                        <p v-if="rdv.status == 2">{{ rdv.label }}</p>
                    </div>
                </div>
            </div>
            <table class="calendar__timetable-bg">
                <thead>
                    <th></th>
                    <th v-for="day in days" v-bind:key="day">{{ formatDateToDDDDMM(day) }}</th>
                </thead>                
                <tr v-for="slot in timeslots" v-bind:key="slot">
                    <td class="calendar__hour">{{slot}}</td>
                    <td v-for="day in days" v-bind:key="day" @mousedown='initEvent(slot, day)' @mouseup='newEvent(slot, day)'></td>
                </tr>
            </table>
        </div>
      </div>
      
  </div>
</template>
<script>
import axios from 'axios';
import * as dayjs from 'dayjs'
import 'dayjs/locale/fr'
var qs = require('qs')
var updateLocale = require('dayjs/plugin/updateLocale')
var weekOfYear = require('dayjs/plugin/weekOfYear')
var isoWeek = require('dayjs/plugin/isoWeek')
var duration = require('dayjs/plugin/duration')
dayjs.extend(duration)
dayjs.locale('fr')
dayjs.extend(isoWeek)
dayjs().format()
dayjs.extend(weekOfYear)
dayjs.extend(updateLocale)
dayjs.updateLocale('fr', {
  weekdays: [
    "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
  ]
})
export default {
    data() {
        return {
            newrdv: false,
            showrdv: false,
            currentweek: 0,
            fetchedweeks: [],
            timeslots: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'],
            days: [],
            rdvs: [],
            newRdvName: '',
            newRdvDate: '',
            newRdvTime: '',
            newRdvInitialTime: '',
            newRdvTemps: 0.5,
            newRdvStatus:  0,
            newRdvLabel: '',
            newRdvKnown: true,
            newRdvHours: ''
        }
    },
    computed: {
        headerWeekDays() {
            const weekstart = dayjs().week(this.currentweek).startOf('isoWeek').format('dddd DD/MM')
            const weekend = dayjs().week(this.currentweek).endOf('isoWeek').format('dddd DD/MM')
            return `Du ${weekstart} au ${weekend} (sem ${this.currentweek})`
        }
    },
    methods: {
        getRdvs() {
            const weekstart = dayjs().week(this.currentweek).startOf('isoWeek').format('YYYY-MM-DD')
            const weekend = dayjs().week(this.currentweek).endOf('isoWeek').format('YYYY-MM-DD')
            const currentweek = dayjs(weekstart).week()

            if (!this.fetchedweeks.includes(currentweek)) {                                                 // if we haven't already fetched the current week
                const query = qs.stringify({                                                                // build query for that week
                    date_gte: weekstart,
                    date_lte: weekend
                    })

                axios.get(`http://localhost:1337/rdvs?${query}`)                                            // query this week
                    .then(res => {
                        for (let r of res.data) {                                                           // add each rdv to the rdvs array
                            this.rdvs.push(r)
                        }
                        this.fetchedweeks.push(currentweek)                                                 // add current week number to the fetchedweeks array so we don't fetch them anymore
                    })
            }
        },
        getRdvTop(rdv) {
            const time = dayjs(rdv.date).hour() + ( dayjs(rdv.date).minute() / 60 )             // convertir 8:30 ('HH:mm') en 8.5 (float)
            return (27 + ( time - 8 ) * 90) + 1                                                      // marge du haut + (float - heure de départ) * pixels/heure
        },
        getRdvHeight(rdv) {
            return (rdv.temps * 90) - 2                                                               // durée du rdv * pixels/heure
        },
        getRdvHours(rdv) {
            let endDate = dayjs(rdv.date).add(rdv.temps * 60, 'm')                              // calcul de la date de fin date + durée
            return dayjs(rdv.date).format('HH:mm') + ' - ' + dayjs(endDate).format('HH:mm')     // départ('HH:mm') - fin('HH:mm')
        },
        getRdvsOnThatDay(day) {
            return this.rdvs.filter(rdv => dayjs(rdv.date).format('DD/MM/YYYY') == dayjs(day).format('DD/MM/YYYY'))
        },
        getLongestRdvDuration(start, day) {
            const todayRdvs = this.getRdvsOnThatDay(day)
            const startTime = parseInt(start.split(':')[0]) + parseInt(start.split(':')[1]) / 60
            let listOfTimes = []
            for (let rdv of todayRdvs) {
                const rdvTime = dayjs(rdv.date).hour() + dayjs(rdv.date).minute() / 60
                listOfTimes.push(rdvTime)
            }
            listOfTimes.sort((a,b)=>a-b)
            for (let time of listOfTimes) {
                console.log(time)
                console.log(startTime)
                if (time > startTime) {
                    return (time - startTime) 
                }
            }
            return 13
        },
        returnRdvStatus(status) {
            if (status == 1) return 'Rendez-vous'
            if (status == 2) return 'Créneau bloqué'
        },
        setCurrentWeek() {
            var d = new Date()
            var date = dayjs(d)
            this.currentweek = dayjs(date).week() 
        },
        setDays() {
            const weekstart = dayjs().week(this.currentweek).startOf('isoWeek')
            this.days = []
            for (let i=0; i < 7; i++) {
                this.days.push(dayjs(weekstart).add(i, 'day'))
            }
        },
        setBgColor(rdv) {
            if (rdv.status == 0) return '#675abe'
            if (rdv.status == 2 ) return  '#000000'
        },
        moveCurrentWeek(val) {
            this.currentweek += val
            this.getRdvs()
            this.setDays()
        },
        createRdv() {
            const dateTimeString = dayjs(this.newRdvDate).format('YYYY-MM-DD') + 'T' + this.newRdvInitialTime + ':00'
            axios.post('http://localhost:1337/rdvs', {
                client: this.newRdvName,
                temps: this.newRdvTemps,
                date: dateTimeString,
                status: this.newRdvStatus,
                label: this.newRdvLabel
            }).then((res) => {
                this.newrdv = false;
                this.newRdvStatus = 0;
                this.rdvs[0] = res.data;
                this.createTempRdv()
            })
        },
        showRdv(rdv) {
            this.cancelRdv();
            this.newrdv = false;
            if (rdv.id) this.showrdv = true;
            this.newRdvName = rdv.client
            this.newRdvDate = rdv.date
            this.newRdvTemps = rdv.temps
            this.newRdvLabel = rdv.label
            this.newRdvStatus = rdv.status

            let endDate = dayjs(rdv.date).add(rdv.temps * 60, 'm')                              // calcul de la date de fin date + durée
            this.newRdvHours = dayjs(rdv.date).format('HH:mm') + ' - ' + dayjs(endDate).format('HH:mm')
        },
        cancelRdv() {
            this.newrdv = false
            this.showrdv = false
            this.newRdvName = ''
            this.newRdvDate = ''
            this.newRdvTime = ''
            this.newRdvTemps = 0.5
            this.rdvs[0] = {
                    temps: 0.5,
                    date: '',
                    client: '',
                    status:  0
                }
        },
        createTempRdv() {
            this.rdvs.unshift({
                temps: 0.5,
                date: '',
                client: '',
                status:  0
            })
        },
        syncTemporaryRdv() {
            const time = this.newRdvInitialTime.split(':')
            let date = dayjs(this.newRdvDate).hour(parseInt(time[0])).minute(parseInt(time[1]))
            this.rdvs[0] = { 
                temps: this.newRdvTemps,
                date: dayjs(date).toDate(),
                client: this.newRdvName,
                status: 0
                }
        },
        floatTimeToString(float) {
            let duration = dayjs.duration(float * 60, 'minutes');
            return duration.format('HH:mm')
        },
        formatDateToDDDDMM(day) {
            return dayjs(day).format('dddd DD/MM')
        },
        initEvent(slot, day) {
            this.newrdv = true
            this.showrdv = false
            this.newRdvDate = dayjs(day).format('YYYY-MM-DD')
            this.newRdvInitialTime = slot
            this.newRdvTemps = 0.5
            this.newRdvStatus = 1
            this.newRdvKnown = 1
            this.maxDuration = this.getLongestRdvDuration(slot, day)
            this.syncTemporaryRdv()
        },
        newEvent(slot) {
            this.newRdvName = ''
            let initialTime = this.newRdvInitialTime.split(':')
            initialTime = parseInt(initialTime[0]) + parseInt(initialTime[1]) / 60
            let endTime = slot.split(':')
            endTime = parseInt(endTime[0]) + (parseInt(endTime[1]) + 30) / 60
            const duration = endTime - initialTime
            if (duration < this.maxDuration) this.newRdvTemps = endTime - initialTime
            if (duration >= this.maxDuration) this.newRdvTemps = this.maxDuration
            this.syncTemporaryRdv()
        }
    },
    mounted() {
        this.setCurrentWeek();
        this.setDays();
        this.createTempRdv();
        this.getRdvs();
    }
}
</script>
<style lang="scss">
    * {
        box-sizing: border-box;
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: left;
        label {
            margin-left: 0.5em;
        }
    }
    h1, th, h3 {
        font-weight: 500;
    }
    .admin__nav {
        position: fixed;
        left: 0;
        top: 0;
        width: 4em;
        height: 100vh;
        background-color: #2A212E;
    }
    .calendar {
        position: relative;
        width: 100%;
    }
    .calendar__container {
        padding-right: 19.5em;
        padding-left: 0.5em;
    }
    .calendar__sidebar {
        z-index: 1000;
        position: fixed;
        width: 18em;
        height: 100vh;
        top: 0;
        right: 0;
        background-color: rgb(216, 198, 224);
        padding: 1.5em;
        border-left: 1px solid rgb(240, 237, 241);
    }
    .calendar__header {
        position: relative;
        padding: 1em 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: sticky;
        span {
            padding: 2em;
            cursor: pointer;
        }
    }
    .calendar__newrdv {
        display: flex;
        flex-direction: column;
        font-weight: 300;
        font-size: 0.8em;
        * {
            margin-top: 0.5em;
        }
        h1 {
            font-size: 1.2em;
            margin-top: 0;
        }
        p {
            margin-top: 0.5em;
        }
        i {
            font-size: 1.2em;
            margin-right: 0.3em;
        }
        .input__radio {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
    .calendar__newrdvbtn {
        position: absolute;
        right: 1em;
        top: 1em;
    }
    .calendar__calendar {
        position: relative;
        min-width: 1200px;
    }
    .calendar__rdvs {
        position: absolute;
        top: 0;
        padding-left: 52px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        width: 100%;
    }
    .calendar__col {
        width: 100%;
        position: relative;
        div {
            padding-top: 0.5em;
            h3 {
                font-size: 0.9em;
                margin-bottom: 0;
                line-height: 0.8em;
            }
            p {
                margin-top: 0;
            }
        }
    }
    .calendar__rdv {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 1px;
        width: calc(100% - 2px);
        z-index: 10;
        padding: 0.3em 0.5em;
        background-color: darkslateblue;
        border: 1px solid darken(darkslateblue, 10%);
        color: white;
        cursor: pointer;
        h3 {
            font-size: 1em;
        }
        p {
            font-size: 0.8em;
        }
    }
    .calendar__hour {
        color: darken(grey, 40%);
        text-align: center;
        line-height: 0em;
        font-size: 0.8em
    }
    .calendar__timetable-bg {
        user-select: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        thead, th {
            height: 25px;
        }
        thead, tr {
            display: grid;
            grid-template-columns: 50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        }
        tr:nth-of-type(1) td {
            border-top: 1px solid rgb(236, 236, 236);
        }
        tr:nth-of-type(2n) td {
            border-bottom: 1px solid rgb(236, 236, 236);
        }
        tr:nth-of-type(2n-1) td {
            border-bottom: 1px solid rgb(245, 245, 245);
        }
        td {
            width: 100%;
            height: 45px;
        }
        tr:nth-of-type(2n) .calendar__hour {
            opacity: 0;
        }
        tr:nth-of-type(1) .calendar__hour {
            border-top: 1px solid white;
        }
    }
    .input-row  {
        display: flex;
        flex-direction: row;
        width: 100%;
        i {
            margin-right: 0.5em;
        }
        input {
            flex-grow: 0;
            flex-shrink: 1;
            width: 100%;
        }
    }
    .horizontal__divider {
        display: block;
        width: 100%;
        border-bottom: 1px solid black;
        opacity: 0.2;
    }
    .newrdv__decoration {
        padding: 0.3em;
        padding-left: 0.7em;
        background-color: rgb(26, 22, 27);
        color: white;
        border-radius: 0.5em;
    }
</style>