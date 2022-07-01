import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Dialog = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            {props.showHeader &&
                <>
                    <Modal.Header closeButton={props.closeButton}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Modal heading
                        </Modal.Title>
                    </Modal.Header>
                </>
            }
            <Modal.Body>
                <div className="d-flex flex-column align-items-center justify-content-center">
                <h1>Gracias por tu compra...</h1>
                <p>Se ha generado la orden {props.data.date}</p>
                <p>Tiempo estimado de entrega 30 minutos</p>
                <p>Puedes ver el estado y el detalle de tu pedido en <a href="">Mis compras</a></p>
                <Button onClick={props.onHide}>Aceptar</Button>
                </div>
            </Modal.Body>

            {props.showFooter &&
                <>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </>
            }
        </Modal>
    );
}

export default Dialog

