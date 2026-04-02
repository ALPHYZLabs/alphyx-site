import { useMemo, useState } from 'react'

export default function ReconstitutionCalculator({
  defaultVialMg = 10,
  title = 'Reconstitution Calculator',
}) {
  const [vialMg, setVialMg] = useState(defaultVialMg)
  const [bacMl, setBacMl] = useState(2)
  const [doseValue, setDoseValue] = useState(500)
  const [doseUnit, setDoseUnit] = useState('mcg')

  const results = useMemo(() => {
    const vial = Number(vialMg)
    const bac = Number(bacMl)
    const dose = Number(doseValue)

    if (!vial || !bac || !dose || vial <= 0 || bac <= 0 || dose <= 0) {
      return null
    }

    const desiredDoseMg = doseUnit === 'mcg' ? dose / 1000 : dose
    const concentrationMgPerMl = vial / bac
    const drawMl = desiredDoseMg / concentrationMgPerMl
    const syringeUnits = drawMl * 100
    const clampedPercent = Math.max(0, Math.min(100, syringeUnits))

    return {
      concentrationMgPerMl,
      desiredDoseMg,
      drawMl,
      syringeUnits,
      clampedPercent,
    }
  }, [vialMg, bacMl, doseValue, doseUnit])

  return (
    <div className="calculator-card">
      <div className="section-kicker">Calculator</div>
      <h2 className="calculator-title">{title}</h2>
      <p className="calculator-text">
        For reference purposes only. Verify all calculations independently.
      </p>

      <div className="calculator-grid">
        <div className="calculator-field">
          <label>Vial Strength (mg)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={vialMg}
            onChange={(e) => setVialMg(e.target.value)}
          />
        </div>

        <div className="calculator-field">
          <label>BAC Water Added (mL)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={bacMl}
            onChange={(e) => setBacMl(e.target.value)}
          />
        </div>

        <div className="calculator-field">
          <label>Desired Dose</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={doseValue}
            onChange={(e) => setDoseValue(e.target.value)}
          />
        </div>

        <div className="calculator-field">
          <label>Dose Unit</label>
          <select value={doseUnit} onChange={(e) => setDoseUnit(e.target.value)}>
            <option value="mcg">mcg</option>
            <option value="mg">mg</option>
          </select>
        </div>
      </div>

      {results ? (
        <>
          <div className="calculator-results">
            <div className="calculator-result">
              <h3>Concentration</h3>
              <p>{results.concentrationMgPerMl.toFixed(2)} mg/mL</p>
            </div>

            <div className="calculator-result">
              <h3>Dose in mg</h3>
              <p>{results.desiredDoseMg.toFixed(3)} mg</p>
            </div>

            <div className="calculator-result">
              <h3>Draw Amount</h3>
              <p>{results.drawMl.toFixed(3)} mL</p>
            </div>

            <div className="calculator-result">
              <h3>Insulin Syringe Units</h3>
              <p>{results.syringeUnits.toFixed(1)} units</p>
            </div>
          </div>

          <div className="syringe-card">
            <div className="order-label">Syringe Measurement</div>
            <p className="calculator-text">
              Draw to approximately <strong>{results.syringeUnits.toFixed(1)} units</strong> on a
              100-unit insulin syringe.
            </p>

            <div className="syringe-shell">
              <div className="syringe-top-labels">
                <span>Insulin Syringe Guide</span>
                <span>{results.syringeUnits.toFixed(1)} units</span>
              </div>

              <div className="syringe-scale">
                {[...Array(101)].map((_, i) => (
                  <div
                    key={i}
                    className={`tick ${
                      i % 10 === 0 ? 'tick-major' : i % 5 === 0 ? 'tick-medium' : 'tick-small'
                    }`}
                    style={{ left: `${i}%` }}
                  />
                ))}

                <div
                  className="syringe-fill"
                  style={{ width: `${results.clampedPercent}%` }}
                />

                <div
                  className="syringe-marker"
                  style={{ left: `${results.clampedPercent}%` }}
                >
                  <div className="syringe-marker-label">
                    {results.syringeUnits.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="syringe-label-row">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
                <span>60</span>
                <span>70</span>
                <span>80</span>
                <span>90</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="calculator-empty">
          Enter values above to calculate concentration and draw amount.
        </div>
      )}
    </div>
  )
}