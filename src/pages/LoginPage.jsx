export default function LoginPage() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="login-layout">
      <div className="login-intro">
        <span className="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</span>
        <h1>Good times are closer than you think.</h1>
        <p>Sign in to discover events and keep all your tickets in one place.</p>
      </div>
      <form className="login-card" onSubmit={handleSubmit}>
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign in to EventHub</h2>
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Enter your password" required />
        <button className="book-button" type="submit">Continue</button>
        <p className="form-note">Account access will be connected to the API in a later task.</p>
      </form>
    </section>
  );
}
