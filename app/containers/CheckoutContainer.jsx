import React from 'react'
import { connect } from 'react-redux'
import Checkout from '../components/Checkout'
import { updateAvailability } from '../action-creators/availability'

const mapStateToProps = (state) => {
 return {
  cart: state.cart.selected,
  user: state.auth
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reserveDate: (date) => dispatch(updateAvailability(date))
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)

export default CheckoutContainer
