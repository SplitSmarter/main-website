import { useEffect, useState } from 'react';
import {
  IconCamera,
  IconCheck,
  IconChartLine,
  IconChartPie,
  IconMapPin,
  IconMicrophone,
  IconPhoto,
  IconReceipt,
  IconRoute,
  IconScan,
} from '@tabler/icons-react';
import { problemScenes } from '@/content/product';
import styles from '../StartPage.module.css';

type PhonePhase = 'scan' | 'type' | 'scanning' | 'saved' | 'trail' | 'analytics' | 'celebrate';

const stepNotice: Record<PhonePhase, string> = {
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
  if (phase === 'type') return <IconMicrophone {...props} />;
  if (phase === 'scanning') return <IconScan {...props} />;
  if (phase === 'saved') return <IconCheck {...props} />;
  if (phase === 'trail') return <IconRoute {...props} />;
  if (phase === 'analytics') return <IconChartLine {...props} />;
  if (phase === 'celebrate') return <IconCheck {...props} />;
  return <IconReceipt {...props} />;
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
  const item = problemScenes.ledger.items[0];
  const reduce = usePrefersReducedMotion();
  const [phase, setPhase] = useState<PhonePhase>(() => {
    if (typeof window === 'undefined') return 'scan';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'saved' : 'scan';
  });
  const [typed, setTyped] = useState(0);
  const [trailPressed, setTrailPressed] = useState(false);
  const [analyticsPressed, setAnalyticsPressed] = useState(false);
  const [brandOn, setBrandOn] = useState(false);
  const [brandTyped, setBrandTyped] = useState(0);
  const brandName = 'Split Smarter';
  const showForm = phase === 'scan' || phase === 'type' || phase === 'scanning';

  useEffect(() => {
    if (reduce) {
      if (phase !== 'saved' && phase !== 'trail' && phase !== 'analytics' && phase !== 'celebrate') setPhase('saved');
      return;
    }
    const hold = phase === 'type'
      ? capture.note.length * 36 + 480
      : phase === 'scan'
        ? 1600
        : phase === 'scanning'
          ? 2800
          : phase === 'saved'
            ? 4600
            : 3800;
    const timer = window.setTimeout(() => {
      if (phase === 'scan') {
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
        setPhase('scan');
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
    if (reduce || phase !== 'saved') {
      setTrailPressed(false);
      return;
    }
    const timer = window.setTimeout(() => setTrailPressed(true), 3400);
    return () => window.clearTimeout(timer);
  }, [phase, reduce]);

  useEffect(() => {
    if (reduce || phase !== 'trail') {
      setAnalyticsPressed(false);
      return;
    }
    const timer = window.setTimeout(() => setAnalyticsPressed(true), 2600);
    return () => window.clearTimeout(timer);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase !== 'celebrate') {
      setBrandOn(false);
      setBrandTyped(0);
      return;
    }
    if (reduce) {
      setBrandOn(true);
      setBrandTyped(brandName.length);
      return;
    }
    const timer = window.setTimeout(() => setBrandOn(true), 500);
    return () => window.clearTimeout(timer);
  }, [phase, reduce, brandName.length]);

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
                  <IconMapPin size={26} stroke={1.8} />
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
                    <strong className={styles.phoneAmount}>{capture.loggedAmount}</strong>
                    <p className={styles.phoneTitle}>{capture.loggedTitle}</p>
                    <ul className={styles.phoneFacts}>
                      <li>
                        <span>
                          <strong>{item.title}</strong>
                          <small>Shared by {item.shared.map((person) => person.person).join(' and ')}</small>
                        </span>
                        <em>{capture.loggedAmount}</em>
                      </li>
                      <li>
                        <span>
                          <strong>Still open</strong>
                          <small>Priya and Jonah</small>
                        </span>
                      </li>
                    </ul>
                    <div className={styles.phoneBudget}>
                      <div className={styles.phoneRow}>
                        <span className={styles.appIcon}><IconChartPie size={15} stroke={1.6} /></span>
                        <span>
                          <strong>{budget.name}</strong>
                          <small>{budget.strength} · {budget.level} used</small>
                        </span>
                      </div>
                      <div className={styles.phoneUsage} aria-hidden>
                        <span />
                      </div>
                    </div>
                    <div className={styles.phoneRow}>
                      <span className={styles.appIcon}><IconMapPin size={15} stroke={1.6} /></span>
                      <span>
                        <strong>{capture.loggedPlace}</strong>
                        <small>Place</small>
                      </span>
                    </div>
                    <button
                      type="button"
                      className={`${styles.phoneTrailButton}${trailPressed ? ` ${styles.isPressed}` : ''}`}
                      onClick={() => setPhase('trail')}
                    >
                      <IconRoute size={16} stroke={1.8} />
                      Show trail
                    </button>
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
