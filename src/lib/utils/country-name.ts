"use client";
import * as countries from "i18n-iso-countries";

// Type definitions
export type LanguageCode =
  | "en"
  | "ar"
  | "de"
  | "es"
  | "fr"
  | "ja"
  | "pt"
  | "ru"
  | "zh"
  | string;
// Define CountryCode as string for now since we can't use dynamic type here
export type CountryCode = string;

// Register default locales
const registeredLocales = new Set<string>();

/**
 * Ensures the requested locale is registered
 * @param locale The locale to register (e.g., 'en', 'ar')
 */
function ensureLocaleRegistered(locale: string): void {
  if (registeredLocales.has(locale)) return;

  try {
    // Dynamically import the locale file
    // Note: This uses a dynamic import which works with most bundlers
    // If you're using a different build system, you might need to adjust this
    const localeData = require(`i18n-iso-countries/langs/${locale}.json`);
    countries.registerLocale(localeData);
    registeredLocales.add(locale);
  } catch (error) {
    console.warn(`Failed to load locale '${locale}'. Falling back to English.`);
    if (!registeredLocales.has("en")) {
      countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
      registeredLocales.add("en");
    }
  }
}

// Register default locales
["en", "ar"].forEach(ensureLocaleRegistered);

/**
 * Gets the name of a country by its ISO 3166-1 alpha-2 code
 * @param code ISO 3166-1 alpha-2 country code (e.g., 'US', 'EG')
 * @param locale Language code for the country name (e.g., 'en', 'ar')
 * @param fallbackToCode Whether to return the country code if name not found
 * @returns The country name in the specified language, or the code if not found and fallbackToCode is true
 * @throws {Error} If the code is not a valid ISO 3166-1 alpha-2 code
 */
export function getCountryName(
  code: string | null | undefined,
  locale: LanguageCode = "en",
  fallbackToCode: boolean = true
): string | null {
  if (!code) return null;
  const upperCode = code.toUpperCase();
  ensureLocaleRegistered(locale);

  try {
    const name = countries.getName(upperCode, locale);

    if (name) return name;

    if (fallbackToCode) {
      return upperCode;
    }

    return null;
  } catch (error) {
    console.warn(`Failed to get country name for code '${code}':`, error);
    return fallbackToCode ? upperCode : null;
  }
}

/**
 * Gets all country names for a specific locale
 * @param locale Language code for the country names (e.g., 'en', 'ar')
 * @returns Object mapping country codes to their names in the specified language
 */
export function getAllCountryNames(
  locale: LanguageCode = "en"
): Record<string, string> {
  ensureLocaleRegistered(locale);
  return countries.getNames(locale) as Record<string, string>;
}

/**
 * Gets country code from country name
 * @param name Country name in any registered language
 * @param locale Language of the provided name
 * @returns ISO 3166-1 alpha-2 country code or null if not found
 */
export function getCountryCode(
  name: string,
  locale: LanguageCode = "en"
): string | null {
  if (!name) return null;

  ensureLocaleRegistered(locale);
  return countries.getAlpha2Code(name, locale) || null;
}

/**
 * Gets country information including name in multiple languages
 * @param code ISO 3166-1 alpha-2 country code
 * @param locales Array of language codes to get names for
 * @returns Object with country code and names in specified languages
 */
export function getCountryInfo(
  code: string,
  locales: LanguageCode[] = ["en"]
): { code: string; names: Record<LanguageCode, string> } | null {
  if (!code) return null;

  const upperCode = code.toUpperCase();
  const names: Record<LanguageCode, string> = {} as any;

  for (const locale of locales) {
    ensureLocaleRegistered(locale);
    const name = countries.getName(upperCode, locale);
    if (name) {
      names[locale] = name;
    }
  }

  if (Object.keys(names).length === 0) return null;

  return {
    code: upperCode,
    names,
  };
}
