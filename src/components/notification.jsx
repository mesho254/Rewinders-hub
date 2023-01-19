import React, { useState, useEffect } from 'react';
import '../styles/notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Notification() {
  // const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Notification 1', type: 'success' },
    { id: 2, message: 'Notification 2', type: 'danger' },
    { id: 3, message: 'Notification 3', type: 'warning' },
]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.read).length);
      });
  }, []);

  const handleClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <div className="notification-icon" onClick={() => setUnreadCount(0) && {handleClick}}>
        <span className="unread-count">{unreadCount}</span>
        <i className="fas fa-bell"><FontAwesomeIcon icon={faBell}/></i>
      </div>
      
      <div className="notification-list">
        {notifications.map(notification => (
          <div key={notification._id} className={`notification ${!notification.read ? 'unread' : ''}`}>
            <p className="message">{notification.message}</p>
            <p className="time">{notification.time}</p>
            <button className="mark-as-read" onClick={() => markAsRead(notification._id)}>Mark as Read</button>
          </div>
        ))}
      </div>
    </div>
  );

  function markAsRead(id) {
    // Make a PUT request to the API to mark the notification as read
    fetch(`/api/notifications/${id}`, {
      method: 'PUT',
    })
    .then(res => res.json())
    .then(data => {
      setNotifications(prevNotifications => prevNotifications.map(n => {
        if(n._id === id) {
          return {...n, read: true};
        }
        return n;
      }));
      setUnreadCount(prevCount => prevCount - 1);
    });
  }
}

export default Notification;
