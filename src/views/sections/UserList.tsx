import { Avatar } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
import { CourseBadgeList } from "../../components/Badges/CourseBadge";
// core components
import { UserTypes } from "../../enums/UserTypes";
import { DynamoDBUser } from "../../models/index.js";
import UserService from "../../services/UserService";

interface Props {
  listType: UserTypes | "ALL";
}

const UserList = (props: Props) => {
  const [users, setUsers] = useState<DynamoDBUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await UserService.fetchUsersByType(props.listType);

      if (users) {
        setUsers(users);
      }
    };

    fetchUsers();
  }, [props.listType]);

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">{props.listType}</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nombre y Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Cursos</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Avatar name={user.name} marginRight={4} />

                          <Media>
                            <span className="mb-0 text-sm">{user.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        <span className="mb-0 text-sm">{user.email}</span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">{user.phone}</span>
                      </td>
                      <td>
                        <CourseBadgeList courses={user.groups as string[]} />
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserList;
