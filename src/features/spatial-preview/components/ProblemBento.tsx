import type { CSSProperties } from 'react';
import {
  IconBed,
  IconBuildingSkyscraper,
  IconBus,
  IconCamera,
  IconCar,
  IconCoffee,
  IconHome,
  IconMusic,
  IconPlane,
  IconReceipt,
  IconSearch,
  IconShoppingBag,
  IconToolsKitchen2,
  IconUsers,
  IconWallet,
} from '@tabler/icons-react';
import { placeStories, placesSection, sampleGroup } from '@/content/product';
import styles from '../SpatialPreview.module.css';

const satellites = [
  { icon: IconCoffee, angle: -38 },
  { icon: IconCar, angle: 48 },
  { icon: IconHome, angle: 142 },
  { icon: IconPlane, angle: 214 },
];

const mosaic = [
  IconToolsKitchen2,
  IconBus,
  IconBed,
  IconShoppingBag,
  IconCamera,
  IconMusic,
  IconBuildingSkyscraper,
  IconWallet,
];

function Orbit() {
  return (
    <div className={styles.orbit} aria-hidden>
      <span className={styles.ring} />
      <span className={styles.ringInner} />
      <span className={styles.core}>Split</span>
      {satellites.map(({ icon: Icon, angle }) => (
        <span
          key={angle}
          className={styles.sat}
          style={{ '--a': `${angle}deg` } as CSSProperties}
        >
          <Icon size={16} stroke={1.5} />
        </span>
      ))}
    </div>
  );
}

function Mosaic() {
  return (
    <div className={styles.mosaic} aria-hidden>
      {mosaic.map((Icon, index) => (
        <span key={Icon.displayName ?? index} className={index % 3 === 0 ? styles.mosaicDim : undefined}>
          <Icon size={18} stroke={1.4} />
        </span>
      ))}
    </div>
  );
}

function SplitGraph() {
  const { split } = sampleGroup;
  return (
    <div className={styles.graph} aria-hidden>
      <svg className={styles.graphLines} viewBox="0 0 360 220" preserveAspectRatio="none">
        <path d="M72 48 C 130 48, 150 108, 168 110" />
        <path d="M70 172 C 130 170, 150 114, 168 110" />
        <path d="M288 50 C 230 64, 210 108, 192 110" />
        <path d="M290 170 C 230 158, 210 114, 192 110" />
      </svg>
      <span className={styles.gNode} style={{ top: '14%', left: '8%' }}>{split.you}</span>
      <span className={styles.gNode} style={{ top: '68%', left: '7%' }}>{split.maya}</span>
      <span className={styles.gHub}>{split.hubTitle}<br />{split.hubAmount}</span>
      <span className={styles.gNode} style={{ top: '16%', right: '8%' }}>{split.jonah}</span>
      <span className={styles.gNode} style={{ top: '66%', right: '7%' }}>{split.priya}</span>
    </div>
  );
}

function Story({ title, accent, body }: { title: string; accent: string; body: string }) {
  return (
    <div className={styles.copyCell}>
      <h3>
        {title}
        <br />
        <em>{accent}</em>
      </h3>
      <p>{body}</p>
    </div>
  );
}

export function ProblemBento() {
  const [scan, find, budget] = placeStories;

  return (
    <section className={styles.problems} id="places">
      <p className={styles.eyebrow}>
        <span className={styles.dot} />
        {placesSection.eyebrow}
      </p>
      <h2 className={styles.sectionTitle}>
        {placesSection.title}
        <br />
        <em>{placesSection.accent}</em>
      </h2>

      <div className={styles.bento}>
        <div className={styles.orbitCell}>
          <Orbit />
        </div>

        <div className={styles.copyCell}>
          <h3>
            {scan.title}
            <br />
            <em>{scan.accent}</em>
          </h3>
          <p>{scan.body}</p>
          <div className={styles.iconRow} aria-hidden>
            <span><IconReceipt size={16} stroke={1.5} /></span>
            <span><IconCoffee size={16} stroke={1.5} /></span>
            <span><IconSearch size={16} stroke={1.5} /></span>
            <span><IconUsers size={16} stroke={1.5} /></span>
          </div>
        </div>

        <Story {...find} />

        <div className={styles.mosaicCell}>
          <Mosaic />
        </div>

        <div className={styles.graphCell}>
          <SplitGraph />
        </div>

        <Story {...budget} />
      </div>
    </section>
  );
}
