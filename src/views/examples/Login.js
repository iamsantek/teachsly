// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import SignIn from "../../components/SignIn";

const Login = () => {
  return (
    <>
      <Col lg="6" md="8">
        <SignIn />
      </Col>
    </>
  );
};

export default Login;
