import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Model(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-75 mx-auto">
          {props.image && (
            <img
              src={`${props.image}`}
              alt=""
              className={`img-fluid w-50 mx-auto ms-3`}
            />
          )}
        </div>
        <p>{props.Body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Model;
