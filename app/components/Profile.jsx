import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

const SelectedUser= ({selected, guest, host}) => {
  const user = selected
  console.log("transactions in profile", guest, host)
  console.log("user in profile", user)
  return (
    <div className="panel panel-default">
      <div className="col-lg-3 col-md-3 hidden-sm hidden-xs panel-body">
          <div className="media">
              <div>
                  <img className="thumbnail img-responsive" src="https://lut.im/7JCpw12uUT/mY0Mb78SvSIcjvkf.png" width="300px" height="300px"/>
              </div>
              <div className="media-body">
                  <hr/>
                  <h3><strong>Name</strong></h3>
                  <p>{user.name}</p>
                  <hr/>
                  <h3><strong>Email</strong></h3>
                  <p>{user.email}</p>
                  <hr/>
                  <h3><strong>Type</strong></h3>
                  <p>{user.userType}</p>
              </div>
          </div>
      </div>
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 panel-body">
            <div className="panel panel-default">
                <div className="panel-body">
                    <h1>Your Reservations</h1>
                    <div className="table table-striped table-hover">
                        {guest.map(transaction => {
                            return (
                                <div key={transaction.id}>
                                    <div className="order order-header row thead-inverse">
                                        <div className="order-column">
                                            <div><strong>Order placed</strong></div>
                                            <div>{moment(transaction.created_at).format('LL')}</div>
                                        </div>
                                        <div className="order-column">
                                            <div><strong>Total</strong></div>
                                            <div>${transaction.price}</div>
                                        </div>
                                        <div className="right">
                                            <div><strong>Order #</strong></div>
                                            <div className="center">{transaction.id}</div>
                                        </div>
                                    </div>
                                    <div className="order order-body flex">
                                        <div className="left"><img src={transaction.home.imageUrl} className="order-thumb"/></div>
                                        <div className="no-flex">
                                            <div className="bottom-padding"><Link to="/homes/{transaction.home.id}" className="link">{transaction.home.name}</Link></div>
                                            <div className="bottom-padding">From <strong>{moment(transaction.startDate).format('LL')}</strong> to <strong>{moment(transaction.endDate).format('LL')}</strong></div>
                                            <div className="price">${transaction.price}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <hr/>
                    <div className="table table-striped table-hover">
                        <h1>Transaction History as Host</h1>
                        <div className="table table-striped table-hover">
                            {host.map(transaction => {
                                return (
                                    <div key={transaction.id}>
                                        <div className="order order-header row thead-inverse">
                                            <div className="order-column">
                                        <div><strong>Order placed</strong></div>
                                            <div>{moment(transaction.created_at).format('LL')}</div>
                                        </div>
                                        <div className="order-column">
                                            <div><strong>Total</strong></div>
                                            <div>${transaction.price}</div>
                                        </div>
                                        <div className="order-column">
                                            <div><strong>Guest</strong></div>
                                            <div><a href={`mailto:${transaction.guest.email}`}>{transaction.guest.name}</a></div>
                                        </div>
                                        <div className="right">
                                            <div><strong>Order #</strong></div>
                                            <div className="center">{transaction.id}</div>
                                        </div>
                                    </div>
                                    <div className="order order-body flex">
                                        <div className="left"><img src={transaction.home.imageUrl} className="order-thumb"/></div>
                                        <div className="no-flex">
                                            <div className="bottom-padding"><Link to="/homes/{transaction.home.id}" className="link">{transaction.home.name}</Link></div>
                                            <div className="bottom-padding">From <strong>{moment(transaction.startDate).format('LL')}</strong> to <strong>{moment(transaction.endDate).format('LL')}</strong></div>
                                            <div className="price">${transaction.price}</div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
  )
}

export default SelectedUser;
