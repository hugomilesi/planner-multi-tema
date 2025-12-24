'use client';

import { useTheme } from '@/themes/ThemeContext';
import { CyberpunkBackground } from './CyberpunkBackground';
import { WesternBackground } from './WesternBackground';
import { NordicBackground } from './NordicBackground';
import { DarkAcademiaBackground } from './DarkAcademiaBackground';
import { OceanBackground } from './OceanBackground';
import { SynthwaveBackground } from './SynthwaveBackground';
import { KawaiiBackground } from './KawaiiBackground';
import { NoirBackground } from './NoirBackground';
import { SpaceBackground } from './SpaceBackground';

const backgroundComponents = {
  cyberpunk: CyberpunkBackground,
  western: WesternBackground,
  nordic: NordicBackground,
  'dark-academia': DarkAcademiaBackground,
  ocean: OceanBackground,
  synthwave: SynthwaveBackground,
  kawaii: KawaiiBackground,
  noir: NoirBackground,
  space: SpaceBackground,
  'sacred-serenity': NoirBackground, // Reuse Noir background for Sacred Serenity
};

export function ThemeBackground() {
  const { themeId } = useTheme();
  const BackgroundComponent = backgroundComponents[themeId];

  if (!BackgroundComponent) {
    return null;
  }

  return <BackgroundComponent />;
}
