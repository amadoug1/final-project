function Home() {
  return (
    <div className="page hero">
      <h1 className="fade-in">
        Build Your Digital Presence <span className="accent">Smarter</span>
      </h1>

      <p className="fade-in delay-1">
        DoDigital Tech helps small businesses launch modern websites,
        optimize delivery platforms, and grow online.
      </p>

      <div className="feature-grid">
        <div className="feature-card slide-up delay-1">
          <h3>🚀 Website Development</h3>
          <p>Clean, fast, mobile-friendly websites built for growth.</p>
        </div>

        <div className="feature-card slide-up delay-2">
          <h3>📦 UberEats & DoorDash</h3>
          <p>Setup, optimization, and visibility for food businesses.</p>
        </div>

        <div className="feature-card slide-up delay-3">
          <h3>📊 Strategy & Consulting</h3>
          <p>Data-driven decisions to scale your online presence.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
