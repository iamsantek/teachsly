/*eslint-disable*/

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { Links } from "../../enums/Links";

const CommonFooter = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href={Links.Website}
              rel="noopener noreferrer"
              target="_blank"
            >
              The Office English Learning Platform - v.1.0.0
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href={Links.Facebook}
                rel="noopener noreferrer"
                target="_blank"
              >
                Facebook
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href={Links.Instagram}
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href={Links.DevelopedBy}
                rel="noopener noreferrer"
                target="_blank"
              >
                Desarrollado por Santek
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default CommonFooter;
