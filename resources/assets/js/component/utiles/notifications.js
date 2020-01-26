import React, { Component } from 'react';


export function addNotification() {
    React.createRef().current.addNotification({
      title: "Guardado",
      message: "La Información ha sido almacenada",
      type: "info",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "zoomIn"],
      animationOut: ["animated", "zoomOut"],
      dismiss: { duration: 3000 },
      dismissable: { click: true }
    });
}

export function addNotificationAlert() {
    React.createRef().current.addNotification({ 
    title: "Error",
    message: "Ha surgido un conflicto en el proceso de almacenamiento",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "zoomIn"],
    animationOut: ["animated", "zoomOut"],
    dismiss: { duration: 10000 },
    dismissable: { click: true }
    });
}