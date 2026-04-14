import styles from './HeroEstadoCero.module.css';

const STAGES = ['Caos', 'Ventas', 'Creatividad', 'Estado Cero'];

export default function VerticalSlider({ value, onChange }) {
  return (
    <div className={styles.sliderWrapper} aria-label="Control de transformación">
      <div className={styles.sliderTrack}>
        <input
          type="range"
          className={styles.slider}
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Nivel de transformación"
        />
      </div>
      <div className={styles.sliderStages}>
        {STAGES.map((stage) => (
          <span key={stage}>{stage}</span>
        ))}
      </div>
    </div>
  );
}