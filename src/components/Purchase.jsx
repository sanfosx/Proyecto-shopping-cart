import React, { useContext } from 'react'
import ContentMain from './util/structure/ContentMain'
import styled from 'styled-components'
import Inicio from './util/Inicio'
import ColumnLeft from './util/structure/ColumnLeft'
import ColumnRight from './util/structure/ColumnRight'
import { AppContext } from '../contexts/CartContext'
import { useState } from 'react'

const Purchase = ({ cantProd, tot }) => {
  const [state, setState] = useContext(AppContext);
  const [orders, setOrders] =useState(localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [])

  const calcTotal = () => {
    let tot = 0
    state.forEach(e => {
      tot = tot + e.tot
    });
    return tot
  }

  const calcCant = () => {
    let totCant = 0
    state.forEach(e => {
      totCant = totCant + e.cant
    });
    return totCant
  }

  const saveOrder = (cart) => {
    const order={}
    order.date = Date.now()
    order.data =cart
    order.tot = calcTotal()
    console.log(order)
     
    localStorage.setItem('orders', JSON.stringify([...orders, {...order}]))
    
    console.log('miscompres', JSON.parse(localStorage.getItem('orders')))
    //localStorage.setItem('orders', JSON.stringify(order))
    
  }

  return (
    <ContentMain>
      <ColumnLeft>
        <div className='container'>
          <Inicio ancho={'100px'} alto={'100px'} />
          <h1>Finalizar Compra</h1>
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Tu Carrito</span>
            <span className="badge bg-primary rounded-pill">{calcCant()}</span>
          </h4>
          <ul class="list-group mb-3">
            {state.map((dato, idx) => (
              <li class="list-group-item d-flex justify-content-between lh-sm" key={idx}>
                <div>
                  <h6 className="my-0">{dato.name}</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">${dato.price * dato.cant}</span>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between">
              <strong>Total a pagar</strong>
              <strong>${calcTotal()}</strong>
            </li>
          </ul>
        </div>

      </ColumnLeft>
      <ColumnRight>

        <div className="col-md-4 col-lg-5">

          <form className="needs-validation" novalidate>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked="true" />
              <label className="btn btn-outline-primary" for="btnradio1">Envio a Domicilio</label>
              <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked="" />
              <label className="btn btn-outline-primary" for="btnradio2">Retiro en Tienda</label>
            </div>
            <form className="needs-validation" novalidate>
              <div className="row g-3">
                <div className="col-12">
                  <label for="address" className="form-label">Direccion</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                </div>
              </div>
            </form>
            <h4 className="mb-3">Forma de Pago</h4>

            <div className="my-3">
              <div className="form-check">
                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required />
                <label className="form-check-label" for="credit">Credit card</label>
              </div>
              <div className="form-check">
                <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required />
                <label className="form-check-label" for="debit">Debit card</label>
              </div>
            </div>

            <div className="row gy-3">
              <div className="col-md-6">
                <label for="cc-name" className="form-label">Nombre y Apellido</label>
                <input type="text" className="form-control" id="cc-name" placeholder="" required />
              </div>

              <div className="col-md-6">
                <label for="cc-number" className="form-label">Numero de Tarjeta</label>
                <input type="text" className="form-control" id="cc-number" placeholder="" required />
              </div>

              <div className="col-md-3">
                <label for="cc-expiration" className="form-label">Vto.</label>
                <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
              </div>

              <div className="col-md-3 align-items-center">
                <label for="cc-cvv" className="form-label">CVV</label>
                <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
              </div>
            </div>

            <button className="w-100 btn btn-primary btn-lg mt-3" onClick={() => saveOrder(state)}>Pagar</button>
          </form>
        </div>
      </ColumnRight>

    </ContentMain>
  )
}

export default Purchase

const Content = styled.div`

`