import React, { useEffect, useState } from "react";
import "./app.css";
import { Table, Tag, Space, Row, Col } from "antd";

export default function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((user) => setUsername(user.username));

    fetch("/api/getTableData")
      .then((res) => res.json())
      .then((data) => {
        populateData(data.organizations);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      // key: "name",
    },
    {
      title: "Organisation Id",
      dataIndex: "organization_id",
      // key: "organization_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      // key: "email",
    },
    {
      title: "Contact Name",
      dataIndex: "contact_name",
      // key: "contact_name",
    },
    {
      title: "Country",
      dataIndex: "country",
      // key: "country",
    },
  ];

  function populateData(data) {
    const dataSource = [];
    let key = 0;
    for (const iterator of data) {
      const obj = {
        key: key++,
        name: iterator.name,
        organization_id: iterator.organization_id,
        email: iterator.email,
        contact_name: iterator.contact_name,
        country: iterator.country,
      };
      dataSource.push(obj);
    }
    setData(dataSource);
  }

  return (
    <div>
      {username ? (
        <h1>{`Hello ${username}`}</h1>
      ) : (
        <h1>Loading.. please wait!</h1>
      )}
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            // pagination={false}
            // bordered={true}
          />
        </Col>
      </Row>
    </div>
  );
}

// export default class App extends Component {
//   state = { username: null };

//   componentDidMount() {
//     fetch("/api/getUsername")
//       .then((res) => res.json())
//       .then((user) => this.setState({ username: user.username }));
//   }

//   render() {
//     const { username } = this.state;
//     return (
//       <div>
//         {username ? (
//           <h1>{`Hello ${username}`}</h1>
//         ) : (
//           <h1>Loading.. please wait!</h1>
//         )}
//         <img src={ReactImage} alt="react" />
//       </div>
//     );
//   }
// }
