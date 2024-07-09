import {
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Eye } from "react-bootstrap-icons";
import { getReadNotify, postNotifications } from "../../services/apiService";
import { Link } from "react-router-dom";
import "./notify.scss";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("account"));

  useEffect(() => {
    const getNotificationList = async () => {
      try {
        const response = await postNotifications(currentUser.memberId);
        setNotifications(response);
      } catch (error) {
        console.log("error", error);
      }
    };
    getNotificationList();
  }, []);

  const handleReadNotification = async (notificationId) => {
    //console.log('notificationId ', notificationId);
    try {
      const response = await getReadNotify(notificationId);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container className="notifies">
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        {notifications.map((notification, index) => (
          <Card className="mb-2" key={index}>
            <div className="row mx-auto">
              <div className="col-lg-10">
                <CardContent>
                  {notification.isRead === false ? (
                    <Typography variant="caption" color="error">
                      New
                    </Typography>
                  ) : null}
                  <Typography variant="h6">{notification.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {notification.description}
                  </Typography>
                </CardContent>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                {notification.notifiableType === "VALUATION_REQUEST_SUCCESS" &&
                notification.notifiableId !== null ? (
                  <Button
                    className="detail-button px-3 py-1"
                    as={Link}
                    to={`/valuation-request/${notification.notifiableId}`}
                    onClick={() => handleReadNotification(notification.id)}
                  >
                    View
                  </Button>
                ) : null}
              </div>

              {notification.isRead !== false ? (
                <></>
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={() => handleReadNotification(notification.id)}
                  >
                    <Eye />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default NotificationList;
