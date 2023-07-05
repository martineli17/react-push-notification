self.addEventListener('push', (event) => {
  const data = event.data?.json();
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    data: {
      url: data.url
    }
  }));
});

self.addEventListener('notificationclick', (event) => {
  const data = event.notification.data;
  if (data) {
    console.log(event);
    event.notification.close();
    // Get all the Window clients
    event.waitUntil(clients.matchAll({ type: 'window' }).then((clientsArr) => {
      // If a Window tab matching the targeted URL already exists, focus that;
      const hadWindowToFocus = clientsArr.some((windowClient) => windowClient.url === event.notification.data.url ? (windowClient.focus(), true) : false);
      // Otherwise, open a new tab to the applicable URL and focus it.
      if (!hadWindowToFocus) clients.openWindow(data.url).then((windowClient) => windowClient ? windowClient.focus() : null);
    }));
  }
});