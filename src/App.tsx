import React, { FC, useState } from "react";
import { Modal, Typography, Button, Divider } from "antd";
import {
  EditOutlined,
  CloseOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { MdOutlineModeEdit } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { GET_TEST_EVENT } from "./graphql/testEventQueries";

const { Title, Text } = Typography;

const App: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { data, loading, error } = useQuery(GET_TEST_EVENT);
  const client = useApolloClient();

  const handleCancelEvent = () => {
    if (data?.getTestEvent) {
      client.cache.modify({
        id: client.cache.identify(data.getTestEvent),
        fields: {
          name: () => "Canceled Test Event",
        },
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const weekdayFormatter = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
    });
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    });

    const weekday = weekdayFormatter.format(startDate);
    const datePart = dateFormatter.format(startDate);
    const fullDatePart = `${weekday}, ${datePart}`;

    const timeFormatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const startTime = timeFormatter.format(startDate);
    const endTime = timeFormatter.format(endDate);

    return `${fullDatePart}, ${startTime}–${endTime}`;
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { name, description, dateRange } = data.getTestEvent;

  return (
    <>
      <Modal
        open={isModalVisible}
        footer={null}
        closable={false}
        bodyStyle={{ padding: "16px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title
            level={5}
            style={{
              display: "flex",
              alignItems: "center",
              margin: 0,
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
                backgroundColor: "#52c41a",
                borderRadius: "10px",
                marginRight: "8px",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            ></span>
            {name}
          </Title>

          <div style={{ display: "flex", gap: "8px" }}>
            <MdOutlineModeEdit
              style={{
                cursor: "pointer",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            />
            <CloseOutlined
              style={{
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
                paddingLeft: "12px",
              }}
              onClick={handleCancel}
            />
          </div>
        </div>

        <Divider style={{ margin: "12px 0", background: "#dedede" }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <ClockCircleOutlined
            style={{ fontSize: "20px", marginRight: "12px" }}
          />
          <Text style={{ fontSize: "20px" }}>
            {formatDateRange(dateRange.start, dateRange.end)}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <BiMenuAltLeft style={{ fontSize: "20px", marginRight: "12px" }} />
          <Text style={{ fontSize: "20px" }}>{description}</Text>
        </div>
        <Divider style={{ margin: "12px 0", background: "#dedede" }} />

        <Button
          type="primary"
          block
          onClick={handleCancelEvent}
          style={{
            marginTop: "16px",
            background: "#e6e6e6",
            color: "red",
            height: "40px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Cancel event
        </Button>
      </Modal>
    </>
  );
};

export default App;
