import {
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getReadNotify, postNotifications } from "../../services/apiService";
import "./notify.scss";
import NotificationMap from "./NotificationMapLink";

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
        <Typography variant="h4" className="text-center" gutterBottom>
          Notifications
        </Typography>
        {notifications.map((notification, index) => (
          <Card className="mb-2" key={index}>
            <div className="row mx-auto">
              <div className="col-lg-9">
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
              <div className="col-lg-3 d-flex align-items-center">
                <NotificationMap notification={notification} />
              </div>
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default NotificationList;
