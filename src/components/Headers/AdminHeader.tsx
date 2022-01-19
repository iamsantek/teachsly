// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import CreateUserModal from "../../modals/CreateUserModal";
import { useEffect, useState } from "react";
import CreateCourseModal from "../../modals/CreateCourseModal";
import { UserTypes } from "../../enums/UserTypes";
import CognitoService from "../../services/aws/CognitoService";
import { GroupType } from "@aws-sdk/client-cognito-identity-provider";

const AdminHeader = () => {
  const [createStudentModalVisibility, setCreateStudentModalVisibility] =
    useState<boolean>(false);
  const [createTeacherModalVisibility, setCreateTeacherModalVisibility] =
    useState<boolean>(false);
  const [createCourseModalVisibility, setCreateCourseModalVisibility] =
    useState<boolean>(false);
  const [cognitoGroups, setCognitoGroups] = useState<GroupType[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const cognitoGroups = await CognitoService.getCognitoGroups();
      if (cognitoGroups) {
        console.log(cognitoGroups);
        setCognitoGroups(cognitoGroups as GroupType[]);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <CreateUserModal
        isOpen={createStudentModalVisibility}
        userType={UserTypes.STUDENT}
        onClose={() => setCreateStudentModalVisibility(false)}
        cognitoGroups={cognitoGroups}
      />
      <CreateUserModal
        isOpen={createTeacherModalVisibility}
        userType={UserTypes.TEACHER}
        onClose={() => setCreateTeacherModalVisibility(false)}
        cognitoGroups={cognitoGroups}
      />
      <CreateCourseModal
        isOpen={createCourseModalVisibility}
        onClose={() => setCreateCourseModalVisibility(false)}
      />
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Alumnos
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          350,897
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-graduation-cap" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-success text-bold text-underline cursor-pointer mr-2"
                        onClick={() => setCreateStudentModalVisibility(true)}
                      >
                        <i className="fa fa-arrow-up" /> Agregar alumno
                      </span>{" "}
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Cursos
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">2,356</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-book" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-success text-bold text-underline cursor-pointer mr-2"
                        onClick={() => setCreateCourseModalVisibility(true)}
                      >
                        <i className="fa fa-arrow-up" /> Agregar curso
                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Teachers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">924</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-success text-bold text-underline cursor-pointer mr-2"
                        onClick={() => setCreateTeacherModalVisibility(true)}
                      >
                        <i className="fa fa-arrow-up" />
                        Agregar teacher
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AdminHeader;
