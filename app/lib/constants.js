const { CAPTCHA_KEY } = process.env;
const { ACTIVATE_CAPTCHA } = process.env;

module.exports = {
  SESSION: {
    TOKEN: 'token',
    EXPIRED: 'session_expired',
    EXPIRED_ERROR_CODE: 310
  },
  HEADER: {
    TOKEN: 'x-auth-token',
    CONTENT_TYPE: 'application/json',
    MULTIPART_CONTENT_TYPE: 'multipart/form-data',
    TIMEOUT: 120000
  },
  ERROR: {
    MSG: 'error',
    INVALID_RESPONSE: 'INVALID_RESPONSE'
  },  
  ROLES: [
    { value: 'ADMIN', label: 'Administrator' },
    { value: 'VIEWER', label: 'Viewer' }
  ],
  DATE_FORMAT: 'DD/MM/YYYY',
  DATE_TIME_FORMAT: 'DD/MM/YYYY hh:mm a',
  PHONE_LENGTH: 15,
  PAGE: 1,
  LIMIT: 20,
  REGEX: {
    CITY_PATTERN: /^[a-zA-Z,.!?-_\-`^'() áàâãéèêíïóôõöúçñ ]*$/,
    CITY_PATTERN_: /^[a-zA-Z,.!?-_\-`^'() áàâãéèêíïóôõöúçñ ÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ ]*$/,
    NUMBER: /^[0-9.]*$/,
    NAME: /^[a-zA-Z ]*$/,
    STRING: /^[a-zA-Z . ]*$/,
    LANGUAGE: /^\D+$/,
    PHONE: /^[0][7][2389]\d{7,12}$/,
    PHONE_WITH_COUNTRY_CODE: /^(\+|\d)[0-9]{9,14}$/,
    PHONE_EMBASSY: /^[0-9)(+\- ]{0,20}$/,
    DATE: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{10,16})/
  },
  CAPTCHA_KEY,
  ACTIVE_CAPTCHA: ACTIVATE_CAPTCHA,
  SLICE_CHARACTER: 30,
  CLIENT_KEY: 20,
  COMPANY_NAME: 50,
  IDLE_TIMOUT_INTERVAL: 900000,
  FACILITY_CATEGORY: [
    { label: 'Referral Hospital', value: 'Referral Hospital' },
    { label: 'Provincial Hospital', value: 'Provincial Hospital' },
    { label: 'District Hospital', value: 'District Hospital' },
    { label: 'Health Center', value: 'Health Center' },
    { label: 'Health Post', value: 'Health Post' },
    { label: 'Polyclinic', value: 'Polyclinic' },
    { label: 'Clinic', value: 'Clinic' },
    { label: 'Home(N/A)', value: 'Home(N/A)' }
  ],
  FACILITY_TYPE: [
    { label: 'Public', value: 'Public' },
    { label: 'Semi-Public', value: 'Semi-Public' },
    { label: 'Private', value: 'Private' }
  ],
  VITAL_STATUS: {
    0: 'Alive',
    13: 'Deceased'
  }
};
