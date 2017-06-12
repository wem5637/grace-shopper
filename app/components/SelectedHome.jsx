import React, { Component } from 'react'
import { Link } from 'react-router'
import CalendarForm from './CalendarForm'

class SelectedHome extends Component {
  constructor(props) {
    // console.log('props in selectedhome constructor', props)
    super()
    this.state = {
      home: props.selected,
      minDate: props.minDate,
      maxDate: props.maxDate,
      disabledDates: props.disabledDates,
      start: props.minDate,
      end: props.minDate,
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextprops in selectedhome', nextProps);
    // console.log('currentprops in selectedhome', this.props);
    if(nextProps !== this.props) {
      this.setState({
        home: nextProps.selected,
        minDate: nextProps.minDate,
        maxDate: nextProps.maxDate,
        start: nextProps.minDate,
        end: nextProps.minDate,
        disabledDates: nextProps.disabledDates,
      })
    }

  }

  handleSubmit() {
    console.log('onclick', this.state.start, this.state.end)
    this.props.addAvailabilityToCart(this.state.home.id, this.state.start, this.state.end)
  }

  handleDateChange(e) {
    if(e.eventType === 3) {
      this.setState({
        start: e.start,
        end: e.end,
        error: null,
      })

      this.checkDateErrors(e.start, e.end);
    }
  }

  checkDateErrors(start, end) {
    let startDate = new Date(start)
    let endDate = new Date(end)
    for(let i = 0; i < this.state.disabledDates.length; i++) {
      let unavailableDate = new Date(this.state.disabledDates[i])
      if(startDate < unavailableDate && endDate > unavailableDate) {
        this.setState({
          error: "You have selected an invalid date range. Please select a new date range."
        })
        break;
      }
    }
  }

  render() {

    // console.log('selectedhome props', this.props);
    // console.log('selectedhome state', this.state);
    const home = this.props.selected
    const host = this.props.selected.Host
    const dates = this.props.availability.list


    return (
      <div className = "container">
        <div className="alert">
          <h5><em>This is your home listing. Edit your listing here:</em></h5>
          <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
        </div>
          <hr/>
        <div className = "row">
          <div className="col-md-6 col-sm-12">
            <h1>{home.name}</h1>
            <h4>Host: <Link to={`/users/${home.host_id}`}>{host.name}</Link></h4>
            <img src={home.imageUrl} className="col-xs-12"/>
            <div className = "col-sm-12">
              <h4>Price/Night: ${home.price}</h4>
              <h4>Location: {home.location}</h4>
              <p>{home.description}</p>
            </div>
          </div>
          <div className = "col-md-6 col-sm-12">
            {
              dates.length
              ? (
                  <div>
                    <h2>Booking Details:</h2>
                    {
                      this.state.error
                      ? (
                          <div className="col-xs-12 alert alert-danger">
                            <strong>{this.state.error}</strong>
                          </div>
                        )
                      : null
                    }
                    <div className="row">
                      <CalendarForm
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                        start={this.state.start || null}
                        end={this.state.end || null}
                        disabledDates={this.state.disabledDates}
                        handleDateChange={this.handleDateChange}
                      />
                    </div>
                    <div className = "row">
                      <button
                        className = 'btn btn-primary'
                        disabled={this.state.error||false}
                        onClick ={this.handleSubmit}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )
              : (
                  <div>
                    <h2>Booking Details:</h2>
                    <h3>No dates currently available.</h3>
                    <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
                  </div>
                )
            }
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

export default SelectedHome;
