import { ThemePack, ThemeId } from './types';
import { cyberpunkTheme } from './packs/cyberpunk';
import { westernTheme } from './packs/western';
import { nordicTheme } from './packs/nordic';
import { darkAcademiaTheme } from './packs/dark-academia';
import { oceanTheme } from './packs/ocean';
import { synthwaveTheme } from './packs/synthwave';
import { kawaiiTheme } from './packs/kawaii';
import { noirTheme } from './packs/noir';
import { spaceTheme } from './packs/space';

export const themeRegistry: Record<ThemeId, ThemePack> = {
  cyberpunk: cyberpunkTheme,
  western: westernTheme,
  nordic: nordicTheme,
  'dark-academia': darkAcademiaTheme,
  ocean: oceanTheme,
  synthwave: synthwaveTheme,
  kawaii: kawaiiTheme,
  noir: noirTheme,
  space: spaceTheme,
};

export const themeList = Object.values(themeRegistry);

export const getTheme = (id: ThemeId): ThemePack => {
  return themeRegistry[id] || themeRegistry.nordic;
};

export const DEFAULT_THEME: ThemeId = 'cyberpunk';
