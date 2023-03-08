import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DoctorForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>Your name</Form.Label>
        <Form.Control type="" placeholder="Enter your name" />
        <Form.Text className="text-muted">
            Please enter your full name
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Practice type</Form.Label>
        <Form.Control type="" placeholder="Practice type" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Area of expertise</Form.Label>
        <Form.Control type="" placeholder="Area of expertise" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="" placeholder="Phone number" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="All information I have provided is correct and I agree to the fact that this information will
        be stored on the Stacks blockchain" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

    </Form>
  );
}

export default DoctorForm;