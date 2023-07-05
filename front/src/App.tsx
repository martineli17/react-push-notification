function App() {
  const handleRequestNotification = async () => {
    await Notification.requestPermission();
  }
  return (
    <>
      <button onClick={handleRequestNotification}>Habilitar Notificação</button>
    </>
  );
}

export default App;
