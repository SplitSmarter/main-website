import { useEffect, useState } from 'react';
import {
  IconBuildingBank,
  IconCamera,
  IconCheck,
  IconChartLine,
  IconChartPie,
  IconChevronDown,
  IconFish,
  IconGlassCocktail,
  IconMapPin,
  IconMicrophone,
  IconPencil,
  IconPhoto,
  IconReceipt,
  IconRoute,
  IconScan,
  IconToolsKitchen2,
} from '@tabler/icons-react';
import { problemScenes } from '@/content/product';
import styles from '../StartPage.module.css';

type PhonePhase = 'records' | 'scan' | 'type' | 'scanning' | 'saved' | 'trail' | 'analytics' | 'celebrate';

const bankRecords = [
  { merchant: 'Cafe Lumen', detail: 'Card · today', amount: '€182.00', chosen: true },
  { merchant: 'Uber', detail: 'Card · yesterday', amount: '€14.20', chosen: false },
  { merchant: 'Rent', detail: 'Transfer · 1 Oct', amount: '€900.00', chosen: false },
] as const;

const stepNotice: Record<PhonePhase, string> = {
  records: 'A line from your bank',
  scan: 'Scan the bill',
  type: 'Add a note with voice or text',
  scanning: 'Parse complex transactions easily',
  saved: 'Expense saved',
  trail: 'Where everyone spent',
  analytics: 'People, categories, and the trend',
  celebrate: 'Helps you save more.',
};

function StepIcon({ phase }: { phase: PhonePhase }) {
  const props = { size: 15, stroke: 1.8 } as const;
  if (phase === 'records') return <IconBuildingBank {...props} />;
  if (phase === 'type') return <IconMicrophone {...props} />;
  if (phase === 'scanning') return <IconScan {...props} />;
  if (phase === 'saved') return <IconCheck {...props} />;
  if (phase === 'trail') return <IconRoute {...props} />;
  if (phase === 'analytics') return <IconChartLine {...props} />;
  if (phase === 'celebrate') return <IconCheck {...props} />;
  return <IconReceipt {...props} />;
}

type SavedLine = (typeof problemScenes.capture.saved.lines)[number];
type SavedPerson = SavedLine['paidBy'][number];

function faceStyle(initial: string) {
  if (initial === 'A') return styles.faceA;
  if (initial === 'Y') return styles.faceY;
  if (initial === 'J') return styles.faceJ;
  return styles.faceP;
}

const savedPins = [
  { x: '22%', y: '38%' },
  { x: '48%', y: '24%' },
  { x: '70%', y: '46%' },
  { x: '36%', y: '62%' },
];

function LineMark({ icon }: { icon: SavedLine['icon'] }) {
  const props = { size: 14, stroke: 1.7 } as const;
  if (icon === 'fish') return <IconFish {...props} />;
  if (icon === 'plate') return <IconToolsKitchen2 {...props} />;
  return <IconGlassCocktail {...props} />;
}

function Faces({ people }: { people: SavedPerson[] }) {
  return (
    <span className={styles.phoneFaces}>
      {people.map((person) => (
        <span
          key={person.person}
          className={`${styles.phoneFaceDot} ${faceStyle(person.initial)}`}
          title={person.person}
        >
          {person.initial}
        </span>
      ))}
    </span>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  return reduce;
}

export function PhoneMock() {
  const capture = problemScenes.capture;
  const budget = problemScenes.budget;
  const reduce = usePrefersReducedMotion();
  const [phase, setPhase] = useState<PhonePhase>('records');
  const [typed, setTyped] = useState(0);
  const [recordsPressed, setRecordsPressed] = useState(false);
  const [trailPressed, setTrailPressed] = useState(false);
  const [analyticsPressed, setAnalyticsPressed] = useState(false);
  const [brandOn, setBrandOn] = useState(false);
  const [brandTyped, setBrandTyped] = useState(0);
  const brandName = 'Split Smarter';
  const showForm = phase === 'scan' || phase === 'type' || phase === 'scanning';
  const reducedPhases: PhonePhase[] = ['saved', 'trail', 'analytics', 'celebrate'];

  if (reduce && !reducedPhases.includes(phase)) {
    setPhase('saved');
  }
  if ((reduce || phase !== 'records') && recordsPressed) {
    setRecordsPressed(false);
  }
  if ((reduce || phase !== 'saved') && trailPressed) {
    setTrailPressed(false);
  }
  if ((reduce || phase !== 'trail') && analyticsPressed) {
    setAnalyticsPressed(false);
  }
  if (phase !== 'celebrate' && (brandOn || brandTyped !== 0)) {
    setBrandOn(false);
    setBrandTyped(0);
  } else if (phase === 'celebrate' && reduce && (!brandOn || brandTyped !== brandName.length)) {
    setBrandOn(true);
    setBrandTyped(brandName.length);
  }

  useEffect(() => {
    if (reduce) return;
    const hold = phase === 'records'
      ? 5200
      : phase === 'type'
      ? capture.note.length * 36 + 1800
      : phase === 'scan'
        ? 3800
        : phase === 'scanning'
          ? 5200
          : phase === 'saved'
            ? 8200
            : 6800;
    const timer = window.setTimeout(() => {
      if (phase === 'records') {
        setPhase('scan');
      } else if (phase === 'scan') {
        setTyped(0);
        setPhase('type');
      } else if (phase === 'type') {
        setPhase('scanning');
      } else if (phase === 'scanning') {
        setPhase('saved');
      } else if (phase === 'saved') {
        setPhase('trail');
      } else if (phase === 'trail') {
        setPhase('analytics');
      } else if (phase === 'analytics') {
        setPhase('celebrate');
      } else {
        setPhase('records');
      }
    }, hold);
    return () => window.clearTimeout(timer);
  }, [phase, reduce, capture.note.length]);

  useEffect(() => {
    if (reduce || phase !== 'type') return;
    const timer = window.setInterval(() => {
      setTyped((count) => (count >= capture.note.length ? count : count + 1));
    }, 36);
    return () => window.clearInterval(timer);
  }, [phase, reduce, capture.note]);

  useEffect(() => {
    if (reduce || phase !== 'records') return;
    const timer = window.setTimeout(() => setRecordsPressed(true), 4000);
    return () => window.clearTimeout(timer);
  }, [phase, reduce]);

  useEffect(() => {
    if (reduce || phase !== 'saved') return;
    const timer = window.setTimeout(() => setTrailPressed(true), 6400);
    return () => window.clearTimeout(timer);
  }, [phase, reduce]);

  useEffect(() => {
    if (reduce || phase !== 'trail') return;
    const timer = window.setTimeout(() => setAnalyticsPressed(true), 5200);
    return () => window.clearTimeout(timer);
  }, [phase, reduce]);

  useEffect(() => {
    if (reduce || phase !== 'celebrate') return;
    const timer = window.setTimeout(() => setBrandOn(true), 500);
    return () => window.clearTimeout(timer);
  }, [phase, reduce]);

  useEffect(() => {
    if (reduce || !brandOn || phase !== 'celebrate') return;
    const timer = window.setInterval(() => {
      setBrandTyped((count) => (count >= brandName.length ? count : count + 1));
    }, 48);
    return () => window.clearInterval(timer);
  }, [brandOn, phase, reduce, brandName.length]);

  const note = phase === 'scan' ? '' : phase === 'type' ? capture.note.slice(0, typed) : capture.note;
  const trailPins = [
    { ...problemScenes.trail.stops[0], who: 'Anika, You', category: 'Food', x: '26%', y: '62%' },
    { ...problemScenes.trail.stops[1], who: 'Jonah', category: 'Food', x: '50%', y: '34%' },
    { ...problemScenes.trail.stops[2], who: 'Priya', category: 'Stay', x: '74%', y: '52%' },
  ];
  const trailValues = trailPins.map((stop) => Number(stop.amount.replace(/[^\d.]/g, '')));
  const trailMax = Math.max(...trailValues);
  const trailTotal = trailValues.reduce((sum, value) => sum + value, 0);
  const donutRadius = 30;
  const donutLength = 2 * Math.PI * donutRadius;
  let donutOffset = 0;
  const donutArcs = trailValues.map((value) => {
    const gap = 3;
    const length = Math.max(0, (value / trailTotal) * donutLength - gap);
    const arc = { length, offset: donutOffset };
    donutOffset += length + gap;
    return arc;
  });
  const trend = trailValues.map((value, index) => {
    const x = 18 + index * 112;
    const y = 62 - (value / trailMax) * 48;
    return { x, y };
  });
  const trendLine = trend.map((point) => `${point.x},${point.y}`).join(' ');
  const categorySlots = ['morning', 'evening'] as const;
  const categories = [...trailPins.reduce((totals, stop) => {
    const value = Number(stop.amount.replace(/[^\d.]/g, ''));
    const current = totals.get(stop.category) ?? 0;
    totals.set(stop.category, current + value);
    return totals;
  }, new Map<string, number>())].map(([title, value]) => ({
    title,
    value,
    amount: `€${value.toFixed(2)}`,
  }));
  const categoryMax = Math.max(...categories.map((category) => category.value));

  return (
    <div className={styles.stage} id="phone">
      <div className={styles.phone}>
        <div className={styles.screen}>
          <span className={styles.island} aria-hidden />
          <p className={styles.phoneNotice} key={phase}>
            <StepIcon phase={phase} />
            {phase === 'celebrate' ? (
              <span className={styles.phoneNoticeCopy}>
                <span>{stepNotice[phase]}</span>
                {brandOn && (
                  <span className={styles.phoneNoticeBrand}>
                    with {brandName.slice(0, brandTyped)}
                    {brandTyped < brandName.length && <i className={styles.phoneCaret} />}
                  </span>
                )}
              </span>
            ) : (
              stepNotice[phase]
            )}
          </p>
          {phase === 'records' && (
            <div className={styles.phoneFace}>
              <p className={styles.phoneKicker}>Bank</p>
              <p className={styles.phoneTitle}>Recent records</p>
              <ul className={styles.phoneRecords}>
                {bankRecords.map((record) => (
                  <li key={record.merchant} className={record.chosen ? styles.phoneRecordChosen : undefined}>
                    {record.chosen && <i className={styles.phoneSweep} />}
                    <strong>{record.merchant}</strong>
                    <small>{record.detail}</small>
                    <em>{record.amount}</em>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`${styles.phoneTrailButton} ${styles.phoneRecordsButton}${recordsPressed ? ` ${styles.isPressed}` : ''}`}
                onClick={() => setPhase('scan')}
              >
                <IconReceipt size={16} stroke={1.8} />
                Add expense
              </button>
            </div>
          )}
          {showForm && (
            <div className={styles.phoneFace}>
              <p className={styles.phoneKicker}>{capture.heading}</p>
              <div className={styles.phoneNote}>
                <span>
                  {note}
                  {phase === 'type' && <i className={styles.phoneCaret} />}
                </span>
                <IconMicrophone className={phase === 'type' ? styles.phoneMicLive : styles.phoneMic} size={16} stroke={1.7} />
              </div>
              <div className={styles.phoneTiles}>
                <span className={`${styles.phoneTile} ${styles.phoneBill} ${phase === 'scan' ? styles.phoneBillLive : ''}`}>
                  {phase === 'scan' && <i className={styles.phoneSweep} />}
                  <IconReceipt size={18} stroke={1.6} />
                  {capture.bill}
                </span>
                <span className={styles.phoneTile}>
                  <IconCamera size={18} stroke={1.6} />
                  {capture.camera}
                </span>
                <span className={styles.phoneTile}>
                  <IconPhoto size={18} stroke={1.6} />
                  {capture.library}
                </span>
              </div>
              <div className={styles.phoneCta}>
                <IconScan size={16} stroke={1.8} />
                {capture.action}
              </div>
              {phase === 'scanning' && (
                <div className={styles.phoneModal}>
                  <div className={styles.phoneModalCard}>
                    <span className={styles.phoneSpinner} aria-hidden />
                    <strong>{capture.reading}</strong>
                    <ul className={styles.phoneThoughts}>
                      {capture.thoughts.map((thought) => (
                        <li key={thought}>{thought}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
          {(phase === 'saved' || phase === 'trail') && (
            <div className={`${styles.phoneSaved}${phase === 'trail' ? ` ${styles.phoneBelowNotice}` : ''}`}>
              <div className={`${styles.phoneSavedMap}${phase === 'trail' ? ` ${styles.phoneTrailMap}` : ''}`} aria-hidden={phase === 'saved'}>
                {phase === 'trail' ? (
                  <>
                    <svg className={styles.phoneTrailPath} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                      <polyline points="26,62 50,34 74,52" />
                    </svg>
                    {trailPins.map((stop) => (
                      <span key={stop.index} className={`${styles.phonePin} ${styles[stop.slot]}`} style={{ left: stop.x, top: stop.y }}>
                        {stop.index}
                      </span>
                    ))}
                  </>
                ) : (
                  savedPins.map((pin) => (
                    <span key={`${pin.x}-${pin.y}`} className={styles.phoneSavedPin} style={{ left: pin.x, top: pin.y }}>
                      <IconMapPin size={16} stroke={1.8} />
                    </span>
                  ))
                )}
              </div>
              <div className={styles.phoneSavedSheet}>
                {phase === 'trail' ? (
                  <>
                    <p className={styles.phoneKicker}>{capture.trip}</p>
                    <p className={styles.phoneTitle}>Where everyone spent</p>
                    <ul className={styles.phoneTrailList}>
                      {trailPins.map((stop) => (
                        <li key={stop.index}>
                          <span className={`${styles.phonePin} ${styles[stop.slot]}`}>{stop.index}</span>
                          <span>
                            <strong>{stop.name}</strong>
                            <small>{stop.category} · {stop.who}</small>
                          </span>
                          <em>{stop.amount}</em>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`${styles.phoneTrailButton}${analyticsPressed ? ` ${styles.isPressed}` : ''}`}
                    onClick={() => setPhase('analytics')}
                  >
                    <IconChartLine size={16} stroke={1.8} />
                    Show analytics
                  </button>
                </>
              ) : (
                  <>
                    <p className={styles.phoneKicker}>{capture.trip}</p>
                    <strong className={styles.phoneAmount}>{capture.saved.total}</strong>
                    <p className={styles.phoneTitle}>{capture.loggedTitle}</p>
                    <p className={styles.phoneSplit}>{capture.saved.split}</p>
                    <ul className={styles.phoneLines}>
                      {capture.saved.lines.map((line) => (
                        <li key={line.title}>
                          <div className={styles.phoneLineHead}>
                            <span className={styles.phoneLineIcon} aria-hidden>
                              <LineMark icon={line.icon} />
                            </span>
                            <span>
                              <strong>{line.title}</strong>
                              {line.paidBy.length > 0 && line.shared.length === 0 && (
                                <small className={styles.phoneLineMeta}>
                                  Paid by
                                  <Faces people={line.paidBy} />
                                </small>
                              )}
                            </span>
                            <em>{line.amount}</em>
                            <IconPencil className={styles.phonePencil} size={14} stroke={1.7} aria-hidden />
                          </div>
                          {line.shared.length > 0 && (
                            <div className={styles.phoneLinePeople}>
                              <span>
                                Paid by
                                <Faces people={line.paidBy} />
                                <IconChevronDown size={12} stroke={1.8} aria-hidden />
                              </span>
                              <span>
                                Shared between
                                <Faces people={line.shared} />
                              </span>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className={`${styles.phoneTrailButton}${trailPressed ? ` ${styles.isPressed}` : ''}`}
                      onClick={() => setPhase('trail')}
                    >
                      <IconRoute size={16} stroke={1.8} />
                      Trail
                    </button>
                    <span className={styles.phoneSpark} aria-hidden />
                  </>
                )}
              </div>
            </div>
          )}
          {(phase === 'analytics' || phase === 'celebrate') && (
            <div className={styles.phoneFace}>
              <p className={styles.phoneKicker}>{capture.trip}</p>
              <p className={styles.phoneTitle}>Analytics</p>
              <p className={styles.phoneDetail}>{problemScenes.trail.note}</p>
              <div className={styles.phoneCharts}>
                <section>
                  <p className={styles.phoneChartLabel}>People</p>
                  <div className={styles.phoneDonut}>
                    <div className={styles.phoneDonutMark}>
                      <svg viewBox="0 0 80 80" aria-hidden>
                        <circle cx="40" cy="40" r={donutRadius} />
                        {donutArcs.map((arc, index) => (
                          <circle
                            key={trailPins[index].index}
                            className={styles[trailPins[index].slot]}
                            cx="40"
                            cy="40"
                            r={donutRadius}
                            strokeDasharray={`${arc.length} ${donutLength}`}
                            strokeDashoffset={-arc.offset}
                            transform="rotate(-90 40 40)"
                          />
                        ))}
                      </svg>
                      <strong>€{trailTotal.toFixed(2)}</strong>
                    </div>
                    <ul className={styles.phoneLegend}>
                      {trailPins.map((stop) => (
                        <li key={stop.index}>
                          <i className={styles[stop.slot]} aria-hidden />
                          <span>{stop.who}</span>
                          <em>{stop.amount}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
                <section>
                  <p className={styles.phoneChartLabel}>Categories</p>
                  <ul className={styles.phoneColumns}>
                    {categories.map((category, index) => {
                      const slot = categorySlots[index] ?? 'morning';
                      return (
                        <li key={category.title}>
                          <span className={styles.phoneColumn}>
                            <i className={styles[slot]} style={{ height: `${Math.max(6, Math.round((category.value / categoryMax) * 72))}px` }} />
                          </span>
                          <small>{category.title}</small>
                          <small>{category.amount}</small>
                        </li>
                      );
                    })}
                  </ul>
                </section>
                <section>
                  <p className={styles.phoneChartLabel}>Trend</p>
                  <svg className={styles.phoneTrend} viewBox="0 0 260 78" aria-hidden>
                    <polygon points={`18,70 ${trendLine} 242,70`} />
                    <polyline points={trendLine} />
                    {trend.map((point) => (
                      <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="3.5" />
                    ))}
                  </svg>
                  <ul className={styles.phoneTrendStops}>
                    {trailPins.map((stop) => (
                      <li key={stop.index}><small>{stop.name}</small></li>
                    ))}
                  </ul>
                </section>
              </div>
              {phase === 'celebrate' && (
                <div className={styles.phoneModal}>
                  <div className={`${styles.phoneModalCard} ${styles.phoneWin}`}>
                    <span className={`${styles.phoneWinMark} ${styles.phoneWarnMark}`}><IconChartPie size={26} stroke={1.8} /></span>
                    <p className={styles.phoneWinLead}>{budget.name}</p>
                    <strong className={styles.phoneWinAmount}>{budget.level}</strong>
                    <p className={styles.phoneWinCompare}>{budget.strength} cap warns</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
