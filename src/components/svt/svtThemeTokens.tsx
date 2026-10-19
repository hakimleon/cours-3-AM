import React, { createContext, useContext } from 'react';
import { SvtDomainId } from '../../typesSvt';
import {
  Globe2,
  Mountain,
  Waves,
  Layers,
  Sprout,
  ShieldCheck,
  Compass,
  Footprints,
  Droplets,
  Trees,
} from 'lucide-react';

export interface SvtDomainThemeTokens {
  domainId: SvtDomainId;
  domainNumber: string;
  nameArabic: string;
  nameFrench: string;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  softBgHex: string;
  softBorderHex: string;
  cardTopBarGradient: string;
  badgeBgClass: string;
  badgeTextClass: string;
  PrimaryIcon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  SecondaryIcon: React.FC<{ className?: string; style?: React.CSSProperties }>;
}

export const SVT_DOMAIN_THEMES: Record<SvtDomainId, SvtDomainThemeTokens> = {
  'internal-geodynamics': {
    domainId: 'internal-geodynamics',
    domainNumber: '01',
    nameArabic: 'الديناميكية الداخلية للكرة الأرضية',
    nameFrench: 'Dynamique interne du globe terrestre',
    primaryHex: '#B45309', // Ambre terreux / Terre cuite
    secondaryHex: '#D97706',
    accentHex: '#C2410C',
    softBgHex: '#FEF3C7',
    softBorderHex: '#FDE68A',
    cardTopBarGradient: 'linear-gradient(90deg, #B45309 0%, #D97706 50%, #C2410C 100%)',
    badgeBgClass: 'bg-amber-100/80',
    badgeTextClass: 'text-amber-900',
    PrimaryIcon: Mountain,
    SecondaryIcon: Waves,
  },
  'external-geodynamics': {
    domainId: 'external-geodynamics',
    domainNumber: '02',
    nameArabic: 'الديناميكية الخارجية للكرة الأرضية',
    nameFrench: 'Dynamique externe du globe terrestre',
    primaryHex: '#15803D', // Vert forêt
    secondaryHex: '#16A34A',
    accentHex: '#047857',
    softBgHex: '#DCFCE7',
    softBorderHex: '#BBF7D0',
    cardTopBarGradient: 'linear-gradient(90deg, #15803D 0%, #16A34A 50%, #047857 100%)',
    badgeBgClass: 'bg-emerald-100/80',
    badgeTextClass: 'text-emerald-900',
    PrimaryIcon: Layers,
    SecondaryIcon: Trees,
  },
  'natural-resources': {
    domainId: 'natural-resources',
    domainNumber: '03',
    nameArabic: 'استغلال الموارد الطبيعية الباطنية',
    nameFrench: 'Exploitation des ressources naturelles du sous-sol',
    primaryHex: '#0369A1', // Bleu géologique profond
    secondaryHex: '#0284C7',
    accentHex: '#0D9488',
    softBgHex: '#E0F2FE',
    softBorderHex: '#BAE6FD',
    cardTopBarGradient: 'linear-gradient(90deg, #0369A1 0%, #0284C7 50%, #0D9488 100%)',
    badgeBgClass: 'bg-sky-100/80',
    badgeTextClass: 'text-sky-900',
    PrimaryIcon: Droplets,
    SecondaryIcon: Compass,
  },
  'soil-protection': {
    domainId: 'soil-protection',
    domainNumber: '04',
    nameArabic: 'التربة ثروة طبيعية هشة',
    nameFrench: 'Le sol, une ressource naturelle fragile',
    primaryHex: '#9A3412', // Terre brûlée
    secondaryHex: '#C2410C',
    accentHex: '#7C2D12',
    softBgHex: '#FFEDD5',
    softBorderHex: '#FED7AA',
    cardTopBarGradient: 'linear-gradient(90deg, #9A3412 0%, #C2410C 50%, #7C2D12 100%)',
    badgeBgClass: 'bg-orange-100/80',
    badgeTextClass: 'text-orange-950',
    PrimaryIcon: Sprout,
    SecondaryIcon: ShieldCheck,
  },
  general: {
    domainId: 'general',
    domainNumber: '00',
    nameArabic: 'علوم الطبيعة والحياة عام',
    nameFrench: 'Sciences de la Nature et de la Vie (Général)',
    primaryHex: '#15803D',
    secondaryHex: '#16A34A',
    accentHex: '#047857',
    softBgHex: '#DCFCE7',
    softBorderHex: '#BBF7D0',
    cardTopBarGradient: 'linear-gradient(90deg, #15803D 0%, #16A34A 100%)',
    badgeBgClass: 'bg-emerald-100/80',
    badgeTextClass: 'text-emerald-900',
    PrimaryIcon: Globe2,
    SecondaryIcon: Mountain,
  },
};

export function getSvtDomainTheme(domainId: SvtDomainId): SvtDomainThemeTokens {
  return SVT_DOMAIN_THEMES[domainId] || SVT_DOMAIN_THEMES['internal-geodynamics'];
}

const SvtDomainThemeContext = createContext<SvtDomainThemeTokens>(
  SVT_DOMAIN_THEMES['internal-geodynamics']
);

export const SvtDomainThemeProvider: React.FC<{
  domainId: SvtDomainId;
  children: React.ReactNode;
}> = ({ domainId, children }) => {
  const theme = getSvtDomainTheme(domainId);
  return (
    <SvtDomainThemeContext.Provider value={theme}>
      {children}
    </SvtDomainThemeContext.Provider>
  );
};

export const useSvtDomainTheme = (): SvtDomainThemeTokens => {
  return useContext(SvtDomainThemeContext);
};
