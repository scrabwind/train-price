export interface TrainResponse {
  list: ListEntity[]
  connThere?: null
  allowNext: boolean
  allowPrev: boolean
  pageType: number
  guid: string
  ttFirstValidDate: string
  ttLastValidDate: string
  lastValidDate: string
  serverDateTime: string
  ttCombination: number
  formType: number
  isReturnOnly: boolean
  filter: Filter
  searchDate: string
  searchDateWarning: boolean
  searchDateThere4Back?: null
  orderUrl: string
  trainDetailUrl: string
  pocketTTUrl: string
  stationDetailUrl: string
  connectionParamsModel: ConnectionParamsModel
  connectionDefaultParamsModel: ConnectionDefaultParamsModel
  absCombId: string
  dataSendEmail: DataSendEmail
  isFavorite: boolean
  onlyForOneConnection: boolean
  fromConnByTicket: boolean
  isBikeOrder: boolean
  searchDateTime: string
  searchFrom: string
  searchTo: string
  hasLoyaltyAccount: boolean
  azakAppBackUrl: string
  eshopContextUrlPart: string
  errors?: null
  businessWarning: boolean
  isChangeReservation: boolean
  connectionServicesModel: ConnectionServicesModel
  onlyReservation: boolean
  searchDateBack?: null
  connectionUpdate: boolean
  passengersInfo: string
  autoTrain: boolean
  isGroups: boolean
  azakUrl: string
}
export interface ListEntity {
  handle: number
  id: number
  trains: TrainsEntity[]
  distance: string
  timeLength: string
  change?: null
  changesCount?: null
  trainTypes: string
  priceOltas: PriceOltas
  price: Price
  price4PdfEshop?: null
  price4PdfCashDesk?: null
  preVozUrl: string
  groupUrl?: null
  add2CalParams: string
  remarks?: string[] | null
  there: boolean
  auxDesc: string
}
export interface TrainsEntity {
  trainName: string
  trainNum: string
  trainTypeAndNum: string
  trainEndStation: string
  from: string
  fromSR70: number
  isFromNAD: boolean
  to: string
  toSr70: number
  isToNAD: boolean
  depDate: string
  depTime: string
  arrDate: string
  arrTime: string
  delay: number
  order: boolean
  trainDetail: string
  fromStandFx?: null
  toStandFx?: null
  distance: string
  timeLength: string
  waitTime: number
  linkDist: number
  standardChange: number
  isShift: boolean
  trainFx?: TrainFxEntity[] | null
  excs?: null
  ttIndex: number
  trainIndex: number
  bonusServices?: BonusServicesEntity[] | null
  trainTypeID: number
  tooltipTitle: string
  historyTrain: boolean
  carrier: string
}
export interface TrainFxEntity {
  text?: null
  title: string
  css: string
  code: string
  restriction: boolean
  icoSrc: string
}
export interface BonusServicesEntity {
  class: string
  sectionFrom?: null
  sectionTo?: null
  services?: ServicesEntity[] | null
}
export interface ServicesEntity {
  icon: number
  title: string
  text: string
}
export interface PriceOltas {
  priceId?: null
  priceOffers?: null
  basicPrice: BasicPrice
  priceOffersFlags: number
  availableClasses: number
  trainClassInfos?: null
  errorId: number
  errorText?: null
}
export interface BasicPrice {
  flags: number
  price: number
  loyaltyPoints: number
  bonusLoyaltyPoints: number
}
export interface Price {
  cashDeskPrice: boolean
  canProceed: boolean
  price: number
  priceFrom: boolean
  loyaltyPoint: number
  loyaltyBonusPoint: number
  hasRes: boolean
  hasBusinessRes: boolean
  businessResNotChecked: boolean
  priceInNextStep: boolean
  freeRes: boolean
  canRes: boolean
  canAddedServices: boolean
  stationInfoLink: string
  noPrice: boolean
  soldOut: boolean
  eshopCantSell: boolean
  onlyRes: boolean
  delayedConn: boolean
}
export interface Filter {
  sortType: number
  priceType: number
}
export interface ConnectionParamsModel {
  onlyDirectConnections: boolean
  onlyConnWithoutRes: boolean
  useBed: string
  deltaPMax: string
  maxChanges: string
  minChangeTime: string
  maxChangeTime: string
  minChangeTimeOptions?:
    | MinChangeTimeOptionsEntityOrMaxChangeTimeOptionsEntity[]
    | null
  maxChangeTimeOptions?:
    | MinChangeTimeOptionsEntityOrMaxChangeTimeOptionsEntity[]
    | null
  onlyCD: boolean
  onlyCDPartners: boolean
  cdNonCom: boolean
  trainTypes?: null[] | null
  trainTypeItems?: TrainTypeItemsEntity[] | null
  historyTrain: boolean
  psgOwnTicket: boolean
  psgOwnTicketVisible: boolean
  addServiceReservation: boolean
  addServiceDog: boolean
  addServiceBike: boolean
  addServiceSMS: boolean
  showParams: boolean
}
export interface MinChangeTimeOptionsEntityOrMaxChangeTimeOptionsEntity {
  name: string
  value: string
  shortName?: null
}
export interface TrainTypeItemsEntity {
  name: string
  value: string
  shortName: string
}
export interface ConnectionDefaultParamsModel {
  onlyDirectConnections: boolean
  onlyConnWithoutRes: boolean
  useBed: string
  deltaPMax: string
  maxChanges: string
  minChangeTime: string
  maxChangeTime: string
  minChangeTimeOptions?: null
  maxChangeTimeOptions?: null
  onlyCD: boolean
  onlyCDPartners: boolean
  cdNonCom: boolean
  trainTypes?: null[] | null
  trainTypeItems?: null
  historyTrain: boolean
  psgOwnTicket: boolean
  psgOwnTicketVisible: boolean
  addServiceReservation: boolean
  addServiceDog: boolean
  addServiceBike: boolean
  addServiceSMS: boolean
  showParams: boolean
}
export interface DataSendEmail {
  ogLang?: null
  winTitle?: null
  siteKey: string
  ajaxUrl?: null
  emailText: string
  dataShared: DataShared
  pdfGeneratorParams?: null
}
export interface DataShared {
  emailSubject: string
  attachmentName: string
}
export interface ConnectionServicesModel {
  bike: boolean
  children: boolean
  wheelChair: boolean
  refreshment: boolean
  carTrain: boolean
  silentComp: boolean
  ladiesComp: boolean
  powerSupply: boolean
  wiFi: boolean
  onlyConnWithoutRes: boolean
  beds: boolean
  serviceClass: string
  class1Visible: boolean
  class2Visible: boolean
  classBusinessVisible: boolean
}
