function Header() {
  const today = new Date();

  return (
    <header className="header">

      <div className="header-center">

        <div className="header-icon">🛡️</div>

        <h1>Container Security & Compliance Portal</h1>

        <p>
          Real-time monitoring of Harbor, Kubernetes and Argo CD
        </p>

        <div className="header-info">

          <div>
            <span>Last Updated</span>
            <strong>{today.toLocaleString()}</strong>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;