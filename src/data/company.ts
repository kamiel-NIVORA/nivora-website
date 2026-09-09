/**
 * De wettelijke identiteit van Nivora, op één plek.
 *
 * Artikel XII.6 WER verplicht elke onderneming die diensten via een website
 * aanbiedt om haar naam, ondernemingsnummer, geografisch adres en een direct
 * contactkanaal permanent en makkelijk vindbaar te tonen. De Economische
 * Inspectie controleert daarop. Tot september 2026 stond hier letterlijk
 * "[company registration number]" in de juridische pagina's; dat is nu ingevuld
 * met de gegevens uit de KBO.
 *
 * Verander dit nooit op één plek alleen: de footer, de voorwaarden, het
 * privacybeleid en het cookiebeleid lezen allemaal uit dit bestand.
 */

export const COMPANY = {
  /** Handelsnaam zoals ingeschreven in de KBO. */
  name: 'Nivoraworks',
  /** Wat er in een juridische aanhef hoort te staan. */
  legalName: 'Nivoraworks, eenmanszaak van Kamiel Niville',
  legalNameEn: 'Nivoraworks, sole proprietorship of Kamiel Niville',
  /** Ondernemingsnummer = btw-nummer voor een Belgische eenmanszaak. */
  enterpriseNumber: 'BE 1041.516.417',
  vatNumber: 'BE 1041.516.417',
  /** Maatschappelijke zetel zoals ingeschreven in de KBO. */
  street: 'Julius en Maurits Sabbestraat 15',
  postalCity: '8000 Brugge',
  country: 'België',
  countryEn: 'Belgium',
  email: 'kamiel@nivoraworks.com',
  phone: '+32 489 00 77 37',
  /** Bevoegd bij een geschil, tenzij dwingend recht anders bepaalt. */
  court: 'Gent, afdeling Brugge',
  courtEn: 'Ghent, Bruges division',
} as const

/** "Julius en Maurits Sabbestraat 15, 8000 Brugge, België" */
export const COMPANY_ADDRESS_NL = `${COMPANY.street}, ${COMPANY.postalCity}, ${COMPANY.country}`
export const COMPANY_ADDRESS_EN = `${COMPANY.street}, ${COMPANY.postalCity}, ${COMPANY.countryEn}`

/** De regel onderaan elke pagina. Kort genoeg voor een footer, volledig genoeg
 *  voor artikel XII.6 WER zolang het adres er ook staat. */
export const COMPANY_LINE_NL = `${COMPANY.legalName} · ${COMPANY.enterpriseNumber} · ${COMPANY_ADDRESS_NL}`
export const COMPANY_LINE_EN = `${COMPANY.legalNameEn} · ${COMPANY.enterpriseNumber} · ${COMPANY_ADDRESS_EN}`

/** De Belgische toezichthouder, voor de klachtenparagraaf in het privacybeleid. */
export const DPA = {
  nameNl: 'Gegevensbeschermingsautoriteit',
  nameEn: 'Belgian Data Protection Authority',
  address: 'Drukpersstraat 35, 1000 Brussel',
  email: 'contact@apd-gba.be',
  phone: '+32 2 274 48 00',
  site: 'gegevensbeschermingsautoriteit.be',
} as const
