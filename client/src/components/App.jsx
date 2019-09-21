import React from 'react'
import styled from 'styled-components'
import OuterComponent from './outerComponent.jsx'
import ReportListing from './ReportListing.jsx'
import $ from 'jquery'

const OuterComp = styled.div`
z-index: 999;
position: absolute;
left: 850px;
top: 0px;
`;


class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      yindex: window.scrollY,
//pulled from server
      cost: null,
      rating: null,
      ratingAmount: null,
      guestsAllowed: null,
      guestsInfants: null,
      cleaningFee: null,
      serviceFee: null,
      occupancyFee: null,
      daysMinimum: null,
      reservations: null,
//choices made in app
      adultsChosen: 1,
      childrenChosen: 0,
      infantsChosen: 0,
      startDate: null,
      endDate: null,
      blackDate: null,
    }
    this.onAddGuest = this.onAddGuest.bind(this);
    this.onSubGuest = this.onSubGuest.bind(this);
  }

  componentDidMount() {
    this.getListingdata()
    this.getReservations()
  }
  

  getListingdata () {
    // var listNum = document.URL.split("/")[4]
    var listNum = document.URL.split("/")
    listNum = parseInt(listNum[4]);
    $.ajax({
      url: `http://localhost:3002/api/listing/${listNum}`,
      success: (result) => {
                console.log(result)
        this.setState({
          cost: result[0].pernight,
          rating: result[0].rating,
          ratingAmount: result[0].ratingamount,
          guestsAllowed: result[0].guestsallowed,
          guestsInfants: result[0].guestsinfants,
          cleaningFee: result[0].cleaningfee,
          serviceFee: result[0].servicefee,
          occupancyFee: result[0].occupancyfee,
          daysMinimum: result[0].daysminimum,
        })
      },
    });
  }

  getReservations () {
    var listNum = document.URL.split("/")[4]
    listNum = parseInt(listNum);
    $.ajax({
      url: `http://localhost:3002/api/reservations/${listNum}`,
      success: (result) => {
        this.setState({
          reservations: result,
        })
      },
    });
  }

  onAddGuest(string) {
    if (string === "childrenChosen" || string == "adultsChosen") {
      if (this.state.adultsChosen + this.state.childrenChosen === this.state.guestsAllowed) {
      return;
      }
    } else if (string === "infantsChosen") {
      if (this.state.guestsInfants === this.state.infantsChosen) {
        return;
      }
    }
    var num = this.state[string]
    num++
    var object = {};
    object[string] = num;
    this.setState(object)
  }

  onSubGuest(string) {
    if (string === "adultsChosen") {
      if (this.state.adultsChosen === 1) {
        return;
      }
    } else if (string === "childrenChosen" || string === "infantsChosen") {
      if (this.state[string] === 0) {
        return;
      }
    }
    var num = this.state[string]
    num--
    var object = {};
    object[string] = num;
    this.setState(object)
  }

  onSelectDate(startEnd, day, month, year) {
    var Obj = {}
    Obj[startEnd] = {};
    Obj[startEnd].day = day;
    Obj[startEnd].month = month;
    Obj[startEnd].year = year;
    this.setState(Obj)
  }

  onClearDates() {
    this.setState({
      startDate: null,
      endDate: null,
      blackDate: null,
    })
  }

  closeModal() {
    window.onclick = function() {
      this.setState({
        start: false,
        end: false,
      })
    }
  }

  onBlack (thing) {
    this.setState({
      blackDate: thing,
    })
  }

  render () {
    return (
      <OuterComp>
        <OuterComponent state = {this.state} onAdd = {this.onAddGuest.bind(this)} onSub = {this.onSubGuest.bind(this)}
          onSelect = {this.onSelectDate.bind(this)} onClear = {this.onClearDates.bind(this)} onBlack = {this.onBlack.bind(this)}
        />
        <ReportListing/>
      </OuterComp>
    )
  }
}

export default App