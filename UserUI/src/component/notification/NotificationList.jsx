import { Button, Card, CardContent, Container, CssBaseline, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Eye } from 'react-bootstrap-icons';
import { getReadNotify, postNotifications } from '../../services/apiService';

const NotificationList = () => {

    const [notifications, setNotifications] = useState([])

    const currentUser = JSON.parse(localStorage.getItem('account'))

    useEffect(() => {
        const getNotificationList = async () => {
            try {
                const response = await postNotifications(currentUser.id)
                setNotifications(response)
            } catch (error) {
                console.log('error', error)
            }
        }
        getNotificationList()
    }, [])

    const handleReadNotification = async (notificationId) => {
        //console.log('notificationId ', notificationId);
        try {
            const response = await getReadNotify(notificationId)
            if (response) {
                window.location.reload()
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <>
            <CssBaseline />
            <Container>
                <Typography variant="h4" gutterBottom>Notifications</Typography>
                {notifications.map((notification, index) => (
                    <Card style={{ marginBottom: '16px' }} key={index}>
                        <div className="row mx-auto">
                            <div className="col-lg-10">
                                <CardContent>
                                    {notification.isRead === false ? <Typography variant="caption" color="error">New</Typography> : null}
                                    <Typography variant="h6" >{notification.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">{notification.description}</Typography>

                                </CardContent>
                            </div>
                            {notification.isRead !== false ?
                                <>
                                </>
                                :
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={() => handleReadNotification(notification.id)}><Eye /></Button>
                                </div>}

                        </div>
                    </Card>
                ))}
            </Container>
        </>
    )
}

export default NotificationList