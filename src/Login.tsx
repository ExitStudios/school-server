import "./css/Login.css";

const Login = () => {
  return (
    <div className="Login">
      <div className="header">
        <h3 className="logo">
          <a href="index.html">SchoolServer</a>
        </h3>
      </div>

      <div className="main">
        <div className="main-content">
          <h1 id="main-title">SchoolServer</h1>

          <div id="introduction">
            <div id="img">
              <img
                src="https://www.gymnasium-beetzendorf.de/fotos/Schule2015.png"
                id="title-img"
                draggable="false"
                loading="lazy"
              />
            </div>

            <span id="introduction-text">Herzlich wilkommen!</span>
          </div>
        </div>

        <div className="login">
          <div className="login-field">
            <h2 id="login-title">Login</h2>

            <div className="inputs">
              <label htmlFor="username-input-field" id="username-label">
                Nutzername
              </label>
              <input type="text" id="username-input-field" autoComplete="off" />

              <label htmlFor=" password-input-field" id="password-label">
                Kennwort
              </label>
              <input
                type="password"
                id="password-input-field"
                autoComplete="off"
              />
            </div>

            <div className="login-btn">
              <button id="login-btn">Login</button>
            </div>

            <span id="forgot-password">
              <a href="#" id="forgot-password-link">
                Kennwort vergessen?
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
