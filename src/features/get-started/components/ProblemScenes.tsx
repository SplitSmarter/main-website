import { useEffect, useState } from 'react';
import {
  IconArrowsExchange,
  IconCheck,
  IconBasket,
  IconBuildingStore,
  IconSearch,
  IconCalendar,
  IconCamera,
  IconCategory,
  IconChartPie,
  IconGlass,
  IconHome,
  IconMapPin,
  IconMicrophone,
  IconPhoto,
  IconRoute,
  IconScan,
  IconPill,
  IconReceipt,
  IconToolsKitchen2,
  IconUsers,
} from '@tabler/icons-react';
import { problemScenes } from '@/content/product';
import styles from '../StartPage.module.css';

const dishIcons = {
  dish: IconToolsKitchen2,
  glass: IconGlass,
};

const lineIcons = {
  basket: IconBasket,
  home: IconHome,
  pill: IconPill,
};

const filterIcons = [IconCategory, IconMapPin, IconBuildingStore, IconPhoto];

const readIcons = [IconCalendar, IconCategory, IconUsers, IconArrowsExchange];

const slotClass = {
  morning: styles.morning,
  afternoon: styles.afternoon,
  evening: styles.evening,
};

function SceneCopy({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.sceneCopy}>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

type CapturePhase = 'scan' | 'type' | 'scanning' | 'logged' | 'saved';

const captureOrder: CapturePhase[] = ['scan', 'type', 'scanning', 'logged', 'saved'];

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

function CapturePanel() {
  const capture = problemScenes.capture;
  const reduce = usePrefersReducedMotion();
  const [phase, setPhase] = useState<CapturePhase>('scan');
  const [typed, setTyped] = useState(0);
  const logged = phase === 'logged' || phase === 'saved';

  useEffect(() => {
    if (reduce) return;
    const hold = phase === 'type' ? capture.note.length * 38 + 520 : phase === 'scan' ? 1700 : phase === 'scanning' ? 1300 : phase === 'logged' ? 2100 : 1500;
    const timer = window.setTimeout(() => {
      const next = captureOrder[(captureOrder.indexOf(phase) + 1) % captureOrder.length];
      if (next === 'type') setTyped(0);
      setPhase(next);
    }, hold);
    return () => window.clearTimeout(timer);
  }, [phase, reduce, capture.note.length]);

  useEffect(() => {
    if (reduce || phase !== 'type') return;
    const timer = window.setInterval(() => {
      setTyped((count) => (count >= capture.note.length ? count : count + 1));
    }, 38);
    return () => window.clearInterval(timer);
  }, [phase, reduce, capture.note]);

  const note = phase === 'scan' && !reduce
    ? ''
    : phase === 'type' && !reduce
      ? capture.note.slice(0, typed)
      : capture.note;
  const showLogged = reduce || logged;

  return (
    <div className={styles.captureStage}>
      <div className={showLogged ? styles.captureHidden : styles.captureShown} aria-hidden={showLogged}>
        <header className={styles.panelHead}>
          <span className={styles.panelIcon}><IconScan size={16} stroke={1.7} /></span>
          <span>
            <strong>{capture.heading}</strong>
            <small>{capture.hint}</small>
          </span>
        </header>
        <div className={styles.noteField}>
          <span>
            {note}
            {phase === 'type' && <i className={styles.caret} />}
          </span>
          <IconMicrophone className={phase === 'type' ? styles.micLive : styles.mic} size={18} stroke={1.7} />
        </div>
        <p className={styles.parent}>{capture.photos}</p>
        <div className={styles.captureRow}>
          <span className={`${styles.captureTile} ${styles.billTile} ${phase === 'scan' ? styles.billLive : ''}`}>
            {phase === 'scan' && <i className={styles.scanLine} />}
            <IconReceipt size={22} stroke={1.6} />
            {capture.bill}
          </span>
          <span className={styles.captureTile}>
            <IconCamera size={22} stroke={1.6} />
            {capture.camera}
          </span>
          <span className={styles.captureTile}>
            <IconPhoto size={22} stroke={1.6} />
            {capture.library}
          </span>
        </div>
        <div className={styles.scanCta}>
          <IconScan size={18} stroke={1.8} />
          {phase === 'scanning' ? capture.scanning : capture.action}
        </div>
      </div>
      <div className={showLogged ? styles.captureShown : styles.captureHidden} aria-hidden={!showLogged}>
        <header className={styles.panelHead}>
          <span className={styles.panelIcon}><IconReceipt size={16} stroke={1.7} /></span>
          <span>
            <strong>{capture.loggedTitle}</strong>
            <small>{capture.loggedDetail}</small>
          </span>
          <em className={phase === 'saved' || reduce ? styles.settled : undefined}>
            {phase === 'saved' || reduce ? <IconCheck size={13} stroke={2} /> : null}
            {phase === 'saved' || reduce ? capture.saved : capture.review}
          </em>
        </header>
        <p className={styles.loggedNote}>{capture.note}</p>
        <p className={styles.total}>
          <span>Amount</span>
          <strong>{capture.loggedAmount}</strong>
        </p>
        <div className={`${styles.savedMap} ${phase === 'saved' || reduce ? styles.savedMapOn : ''}`}>
          <span className={styles.pin} aria-hidden><IconMapPin size={18} stroke={1.8} /></span>
          <strong>{capture.loggedTitle}</strong>
          <small>{capture.loggedPlace}</small>
        </div>
      </div>
    </div>
  );
}

export function ProblemScenes() {
  const { capture, ledger, debt, receipt, merchants, budget, trip, trail } = problemScenes;

  return (
    <div className={styles.scenes}>
      <section className={styles.scene} id={capture.id}>
        <SceneCopy title={capture.title} body={capture.body} />
        <div className={styles.panel}>
          <CapturePanel />
        </div>
      </section>

      <section className={styles.scene} id={ledger.id}>
        <SceneCopy title={ledger.title} body={ledger.body} />
        <div className={styles.panel}>
          <header className={styles.panelHead}>
            <span className={styles.panelIcon}><IconReceipt size={16} stroke={1.7} /></span>
            <strong>Saturday dinner</strong>
            <em>{ledger.sample}</em>
          </header>
          <ul className={styles.items}>
            {ledger.items.map((item) => {
              const DishIcon = dishIcons[item.icon];
              return (
              <li key={item.title}>
                <div className={styles.itemRow}>
                  <span className={styles.panelIcon}><DishIcon size={16} stroke={1.7} /></span>
                  <strong>{item.title}</strong>
                  <em>{item.amount}</em>
                </div>
                <p className={styles.sharedLabel}>Shared between</p>
                <ul className={styles.sharers}>
                  {item.shared.map((person) => (
                    <li key={person.person}>
                      <span className={styles.initial} aria-hidden>{person.initial}</span>
                      {person.person}
                    </li>
                  ))}
                </ul>
              </li>
              );
            })}
          </ul>
          <p className={styles.total}>
            <span>Paid by</span>
            <strong>{ledger.paid}</strong>
          </p>
        </div>
      </section>

      <section className={styles.scene} id={debt.id}>
        <SceneCopy title={debt.title} body={debt.body} />
        <div className={styles.panel}>
          <ul className={styles.stack}>
            <li>
              <span className={styles.panelIcon}><IconToolsKitchen2 size={16} stroke={1.7} /></span>
              <span>
                <small className={styles.kind}>{debt.expense.kind}</small>
                <strong>{debt.expense.title}</strong>
                <ul className={styles.sharers}>
                  {debt.expense.shared.map((person) => (
                    <li key={person.person}>
                      <span className={styles.initial} aria-hidden>{person.initial}</span>
                      {person.person}
                    </li>
                  ))}
                </ul>
              </span>
              <em>{debt.expense.amount}</em>
            </li>
            <li className={styles.quiet}>
              <span className={styles.panelIcon}><IconArrowsExchange size={16} stroke={1.7} /></span>
              <span>
                <small className={styles.kind}>{debt.transfer.kind}</small>
                <strong>{debt.transfer.title}</strong>
                <small>{debt.transfer.detail}</small>
              </span>
              <em>{debt.transfer.amount}</em>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.scene} id={receipt.id}>
        <SceneCopy title={receipt.title} body={receipt.body} />
        <div className={styles.panel}>
          <header className={styles.panelHead}>
            <span className={styles.panelIcon}><IconReceipt size={16} stroke={1.7} /></span>
            <strong>Market run</strong>
            <em>{receipt.sample}</em>
          </header>
          <div className={styles.tree}>
            {receipt.groups.map((group) => (
              <div key={group.parent}>
                <p className={styles.parent}>{group.parent}</p>
                <ul className={styles.ledger}>
                  {group.lines.map((line) => {
                    const LineIcon = lineIcons[line.icon];
                    return (
                      <li key={line.title}>
                        <span className={styles.panelIcon}><LineIcon size={16} stroke={1.7} /></span>
                        <strong>{line.title}</strong>
                        <em>{line.amount}</em>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.total}>
            <span>{receipt.total.label}</span>
            <strong>{receipt.total.amount}</strong>
          </p>
        </div>
      </section>

      <section className={styles.scene} id={merchants.id}>
        <SceneCopy title={merchants.title} body={merchants.body} />
        <div className={styles.panel}>
          <header className={styles.panelHead}>
            <span className={styles.panelIcon}><IconSearch size={16} stroke={1.7} /></span>
            <strong>Merchant catalog</strong>
            <em>Search</em>
          </header>
          <ul className={styles.ledger}>
            {merchants.rows.map((row) => (
              <li key={row.name}>
                <span className={styles.panelIcon}><IconBuildingStore size={16} stroke={1.7} /></span>
                <span>
                  <strong>{row.name}</strong>
                  <small>{row.branch}</small>
                </span>
                <em>{row.amount}</em>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.scene} id={budget.id}>
        <SceneCopy title={budget.title} body={budget.body} />
        <div className={styles.panel}>
          <header className={styles.panelHead}>
            <span className={styles.panelIcon}><IconChartPie size={16} stroke={1.7} /></span>
            <span>
              <strong>{budget.name}</strong>
              <small>{budget.strength} cap</small>
            </span>
            <em className={styles.settled}><IconUsers size={13} stroke={1.8} />{budget.who}</em>
          </header>
          <ul className={styles.sharers}>
            {budget.people.map((person) => (
              <li key={person.person}>
                <span className={styles.initial} aria-hidden>{person.initial}</span>
                {person.person}
              </li>
            ))}
          </ul>
          <div className={styles.meter} aria-hidden>
            <span />
          </div>
          <p className={styles.meterLabel}>{budget.level} of the cap</p>
          <ul className={styles.chips}>
            {budget.filters.map((filter, index) => {
              const FilterIcon = filterIcons[index];
              return (
                <li key={filter}>
                  <FilterIcon size={13} stroke={1.7} />
                  {filter}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={styles.scene} id={trip.id}>
        <SceneCopy title={trip.title} body={trip.body} />
        <div className={styles.pair}>
          <article className={styles.panel}>
            <span className={styles.panelIcon}><IconCalendar size={16} stroke={1.7} /></span>
            <strong>{trip.memory.title}</strong>
            <small>{trip.memory.detail}</small>
          </article>
          <article className={`${styles.panel} ${styles.placeCard}`}>
            <span className={styles.pin} aria-hidden><IconMapPin size={18} stroke={1.8} /></span>
            <strong>{trip.place.title}</strong>
            <small>{trip.place.detail}</small>
          </article>
        </div>
      </section>

      <section className={styles.scene} id={trail.id}>
        <SceneCopy title={trail.title} body={trail.body} />
        <div className={styles.panel}>
          <header className={styles.panelHead}>
            <span className={styles.panelIcon}><IconRoute size={16} stroke={1.7} /></span>
            <strong>{trail.name}</strong>
            <em>{trail.sample}</em>
          </header>
          <ol className={styles.trail}>
            {trail.stops.map((stop) => (
              <li key={stop.index}>
                <span className={`${styles.step} ${slotClass[stop.slot]}`}>{stop.index}</span>
                <span>
                  <strong>{stop.name}</strong>
                  <small>{stop.when}</small>
                </span>
                <em>{stop.amount}</em>
              </li>
            ))}
          </ol>
          <p className={styles.meterLabel}>{trail.note}</p>
          <ul className={styles.chips}>
            {trail.reads.map((read, index) => {
              const ReadIcon = readIcons[index];
              return (
                <li key={read}>
                  <ReadIcon size={13} stroke={1.7} />
                  {read}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
