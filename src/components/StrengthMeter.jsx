function StrengthMeter() {
  const strength = 75;

  return (
    <div className="box strength-box">
      <h3>📊 Market Strength</h3>

      <div className="strength-value">
        {strength}%
      </div>

      <div className="meter">
        <div
          className="meter-fill"
          style={{ width: `${strength}%` }}
        ></div>
      </div>

      <div className="strength-labels">
        <span>Weak</span>
        <span>Strong</span>
      </div>

      <p className="strength-desc">
        Market is performing <strong>strong</strong> today
      </p>
    </div>
  );
}

export default StrengthMeter;