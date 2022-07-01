import React, { useContext } from 'react'
import ContentMain from './util/structure/ContentMain'
import styled from 'styled-components'
import Inicio from './util/Inicio'
import ColumnLeft from './util/structure/ColumnLeft'
import ColumnRight from './util/structure/ColumnRight'
import { AppContext } from '../contexts/CartContext'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Dialog from './util/Dialog'

const Purchase = () => {
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false);
  const [shippingType, setShippingType] = useState('Envio a domicilio')
  const [paymentType, setPaymentType] = useState('Tarjeta')
  const [state, setState] = useContext(AppContext);
  const [orders, setOrders] = useState(localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [])
  const [order, setOrder] = useState({})

  const handleShippingType = (e) => {
    setShippingType(e.target.value)
  }

  const handlePaymentType = (e) => {
    setPaymentType(e.target.value)
  }

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

  const successPay = () => {
    setState([])
    localStorage.setItem('cart', JSON.stringify([]))
    setModalShow(false)
    navigate('/')
  }

  const saveOrder = (cart) => {
    const auxOrder = {}
    auxOrder.date = Date.now()
    auxOrder.data = cart
    auxOrder.status = 'En proceso'
    auxOrder.shippingType = shippingType
    auxOrder.paymentType = paymentType
    auxOrder.tot = calcTotal()
    console.log(order)
    setOrder(auxOrder)
    localStorage.setItem('orders', JSON.stringify([...orders, { ...order }]))

    console.log('miscompres', JSON.parse(localStorage.getItem('orders')))
    setModalShow(true)
    //localStorage.setItem('orders', JSON.stringify(order))

  }

  return (
    <ContentMain>
      <div className="text-end me-5">
        <MdClose className='btn-close' onClick={() => navigate('/cart')} />
      </div>
      <ColumnLeft>
        <div className='container p-0'>
          <Inicio ancho={'200px'} alto={'200px'} />
          <h1 className='mx-5'>Finalizar Compra</h1>
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Tu Carrito</span>
            <span className="badge bg-primary rounded-pill">{calcCant()}</span>
          </h4>
          
          <ul className="list-group mb-3">
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
              <h4><strong>Total a pagar</strong></h4>
              <h4><strong>${calcTotal()}</strong></h4>
            </li>
          </ul>
        </div>

      </ColumnLeft>

      <ColumnRight>
        <div className="col-md-10 col-lg-10">
          <h1 className="my-3">Forma de Entrega</h1>
          <form className="needs-validation " >
            <div className="btn-group my-3" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" className="btn-check" name="btnradio1" id="btnradio1" value={'Envio a domicilio'} checked={shippingType === 'Envio a domicilio' ? true : false} onChange={(e) => handleShippingType(e)} />
              <label className="btn btn-outline-primary" htmlFor="btnradio1">Envio a Domicilio</label>
              <input type="radio" className="btn-check" name="btnradio2" id="btnradio2" value={'Retiro en tienda'} checked={shippingType === 'Retiro en tienda' ? true : false} onChange={(e) => handleShippingType(e)} />
              <label className="btn btn-outline-primary" for="btnradio2">Retiro en Tienda</label>
            </div>

            {shippingType === 'Envio a domicilio' &&
              <form className="needs-validation" noValidate>
                <div className="row g-1 w-100">
                  <div className="">
                    <label htmlFor="address" className="form-label">Direccion</label>
                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                  </div>
                </div>
              </form>}
            <h1 className="my-3">Forma de Pago</h1>

            <div className="my-3">
              <div className="form-check text-start">
                <input id="reemb" name="paymentMethod" type="radio" className="form-check-input" value={'Pago contra Entrega'} checked={paymentType === 'Pago contra Entrega' ? true : false} onChange={(e) => handlePaymentType(e)} />
                <label className="form-check-label" htmlFor="reemb">Pago contra Entrega</label>
              </div>
              <div className="form-check text-start">
                <input id="mpago" name="paymentMethod" type="radio" className="form-check-input" value={'Mercado Pago'} checked={paymentType === 'Mercado Pago' ? true : false} onChange={(e) => handlePaymentType(e)} />
                <label className="form-check-label" htmlFor="mpago">Mercado Pago</label>
              </div>
              <div className="form-check text-start">
                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" value={'Tarjeta'} checked={paymentType === 'Tarjeta' ? true : false} onChange={(e) => handlePaymentType(e)} />
                <label className="form-check-label" htmlFor="credit">Tarjeta de Credito</label>
              </div>
              <div className="form-check text-start">
                <input id="debit" name="paymentMethod" type="radio" className="form-check-input" value={'Tarjeta'} checked={paymentType === 'Tarjeta' ? true : false} onChange={(e) => handlePaymentType(e)} />
                <label className="form-check-label" htmlFor="debit">Tarjeta de Debito</label>
              </div>
            </div>

            {paymentType === 'Tarjeta' &&
              <div className="row gy-3 justify-content-center">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">Nombre y Apellido</label>
                  <input type="text" className="form-control" id="cc-name" placeholder="" required />
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">Numero de Tarjeta</label>
                  <input type="text" className="form-control" id="cc-number" placeholder="" required />
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">Vencimiento</label>
                  <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                </div>

                <div className="col-md-3 align-items-center">
                  <label htmlFor="cc-cvv" className="form-label">Codigo seguridad</label>
                  <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                </div>
              </div>}

            <button className="w-100 btn btn-primary bg-black shadow-lg btn-lg mt-3" onClick={() => saveOrder(state)}>Pagar</button>
          </form>
        </div>
      </ColumnRight>

      <Dialog
        show={modalShow}
        onHide={() => successPay()}
        closeButton={true}
        showHeader={false}
        showFooter={false}
        data={order}
      />

    </ContentMain>
  )
}

export default Purchase

const Content = styled.div`

 
 
`