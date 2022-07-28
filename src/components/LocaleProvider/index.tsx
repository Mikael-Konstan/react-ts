import { FC, useEffect } from 'react';

import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

import resourcesLng from '@/public/lang/index.json';
import enLng from '@/public/lang/en.json';
import zhLng from '@/public/lang/zh.json';
import deLng from '@/public/lang/de.json';

const resources = {
  zh: {
    translation: {
      ...zhLng,
      ...resourcesLng.zh.translation,
    },
  },
  en: {
    translation: {
      ...enLng,
      ...resourcesLng.en.translation,
    },
  },
  de: {
    translation: {
      ...deLng,
      ...resourcesLng.de.translation,
    },
  },
};

export enum LngType {
  EN = 'en',
  ZH = 'zh',
  DE = 'de',
}

interface LocaleProviderProps {
  lng: LngType;
}

const initI18next = (lng = 'en') => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: lng,
      fallbackLng: lng,
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18next();

export const LocaleProvider: FC<LocaleProviderProps> = ({
  children,
  lng = 'en',
}) => {
  useEffect(() => {
    initI18next(lng);
  }, [lng]);

  return <>{children}</>;
};

export default LocaleProvider;
