const countriesList = [
  {
    label: 'Rwanda',
    value: 'RW',
    nationality: 'Rwandan'
  },
  {
    label: 'Afghanistan',
    value: 'AF',
    nationality: 'Afghan'
  },
  {
    label: 'Åland Islands',
    value: 'AX',
    nationality: 'Ålandish'
  },
  {
    label: 'Albania',
    value: 'AL',
    nationality: 'Albanian'
  },
  {
    label: 'Algeria',
    value: 'DZ',
    nationality: 'Algerian'
  },
  {
    label: 'American Samoa',
    value: 'AS',
    nationality: 'American Samoan'
  },
  {
    label: 'Andorra',
    value: 'AD',
    nationality: 'Andorran'
  },
  {
    label: 'Angola',
    value: 'AO',
    nationality: 'Angolan'
  },
  {
    label: 'Anguilla',
    value: 'AI',
    nationality: 'Anguillian'
  },
  {
    label: 'Antarctica',
    value: 'AQ',
    nationality: ''
  },
  {
    label: 'Antigua and Barbuda',
    value: 'AG',
    nationality: 'Antiguan, Barbudan'
  },
  {
    label: 'Argentina',
    value: 'AR',
    nationality: 'Argentinean'
  },
  {
    label: 'Armenia',
    value: 'AM',
    nationality: 'Armenian'
  },
  {
    label: 'Aruba',
    value: 'AW',
    nationality: 'Aruban'
  },
  {
    label: 'Australia',
    value: 'AU',
    nationality: 'Australian'
  },
  {
    label: 'Austria',
    value: 'AT',
    nationality: 'Austrian'
  },
  {
    label: 'Azerbaijan',
    value: 'AZ',
    nationality: 'Azerbaijani'
  },
  {
    label: 'Bahamas',
    value: 'BS',
    nationality: 'Bahamian'
  },
  {
    label: 'Bahrain',
    value: 'BH',
    nationality: 'Bahraini'
  },
  {
    label: 'Bangladesh',
    value: 'BD',
    nationality: 'Bangladeshi'
  },
  {
    label: 'Barbados',
    value: 'BB',
    nationality: 'Barbadian'
  },
  {
    label: 'Belarus',
    value: 'BY',
    nationality: 'Belarusian'
  },
  {
    label: 'Belgium',
    value: 'BE',
    nationality: 'Belgian'
  },
  {
    label: 'Belize',
    value: 'BZ',
    nationality: 'Belizean'
  },
  {
    label: 'Benin',
    value: 'BJ',
    nationality: 'Beninese'
  },
  {
    label: 'Bermuda',
    value: 'BM',
    nationality: 'Bermudian'
  },
  {
    label: 'Bhutan',
    value: 'BT',
    nationality: 'Bhutanese'
  },
  {
    label: 'Bolivia (Plurinational State of)',
    value: 'BO',
    nationality: 'Bolivian'
  },
  {
    label: 'Bonaire, Sint Eustatius and Saba',
    value: 'BQ',
    nationality: 'Dutch'
  },
  {
    label: 'Bosnia and Herzegovina',
    value: 'BA',
    nationality: 'Bosnian, Herzegovinian'
  },
  {
    label: 'Botswana',
    value: 'BW',
    nationality: 'Motswana'
  },
  {
    label: 'Bouvet Island',
    value: 'BV',
    nationality: ''
  },
  {
    label: 'Brazil',
    value: 'BR',
    nationality: 'Brazilian'
  },
  {
    label: 'British Indian Ocean Territory',
    value: 'IO',
    nationality: 'Indian'
  },
  {
    label: 'United States Minor Outlying Islands',
    value: 'UM',
    nationality: 'American'
  },
  {
    label: 'Virgin Islands (British)',
    value: 'VG',
    nationality: 'Virgin Islander'
  },
  {
    label: 'Virgin Islands (U.S.)',
    value: 'VI',
    nationality: 'Virgin Islander'
  },
  {
    label: 'Brunei Darussalam',
    value: 'BN',
    nationality: 'Bruneian'
  },
  {
    label: 'Bulgaria',
    value: 'BG',
    nationality: 'Bulgarian'
  },
  {
    label: 'Burkina Faso',
    value: 'BF',
    nationality: 'Burkinabe'
  },
  {
    label: 'Burundi',
    value: 'BI',
    nationality: 'Burundian'
  },
  {
    label: 'Cambodia',
    value: 'KH',
    nationality: 'Cambodian'
  },
  {
    label: 'Cameroon',
    value: 'CM',
    nationality: 'Cameroonian'
  },
  {
    label: 'Canada',
    value: 'CA',
    nationality: 'Canadian'
  },
  {
    label: 'Cabo Verde',
    value: 'CV',
    nationality: 'Cape Verdian'
  },
  {
    label: 'Cayman Islands',
    value: 'KY',
    nationality: 'Caymanian'
  },
  {
    label: 'Central African Republic',
    value: 'CF',
    nationality: 'Central African'
  },
  {
    label: 'Chad',
    value: 'TD',
    nationality: 'Chadian'
  },
  {
    label: 'Chile',
    value: 'CL',
    nationality: 'Chilean'
  },
  {
    label: 'China',
    value: 'CN',
    nationality: 'Chinese'
  },
  {
    label: 'Christmas Island',
    value: 'CX',
    nationality: 'Christmas Island'
  },
  {
    label: 'Cocos (Keeling) Islands',
    value: 'CC',
    nationality: 'Cocos Islander'
  },
  {
    label: 'Colombia',
    value: 'CO',
    nationality: 'Colombian'
  },
  {
    label: 'Comoros',
    value: 'KM',
    nationality: 'Comoran'
  },
  {
    label: 'Congo',
    value: 'CG',
    nationality: 'Congolese'
  },
  {
    label: 'Congo (Democratic Republic of the)',
    value: 'CD',
    nationality: 'Congolese'
  },
  {
    label: 'Cook Islands',
    value: 'CK',
    nationality: 'Cook Islander'
  },
  {
    label: 'Costa Rica',
    value: 'CR',
    nationality: 'Costa Rican'
  },
  {
    label: 'Croatia',
    value: 'HR',
    nationality: 'Croatian'
  },
  {
    label: 'Cuba',
    value: 'CU',
    nationality: 'Cuban'
  },
  {
    label: 'Curaçao',
    value: 'CW',
    nationality: 'Dutch'
  },
  {
    label: 'Cyprus',
    value: 'CY',
    nationality: 'Cypriot'
  },
  {
    label: 'Czech Republic',
    value: 'CZ',
    nationality: 'Czech'
  },
  {
    label: 'Denmark',
    value: 'DK',
    nationality: 'Danish'
  },
  {
    label: 'Djibouti',
    value: 'DJ',
    nationality: 'Djibouti'
  },
  {
    label: 'Dominica',
    value: 'DM',
    nationality: 'Dominican'
  },
  {
    label: 'Dominican Republic',
    value: 'DO',
    nationality: 'Dominican'
  },
  {
    label: 'Ecuador',
    value: 'EC',
    nationality: 'Ecuadorean'
  },
  {
    label: 'Egypt',
    value: 'EG',
    nationality: 'Egyptian'
  },
  {
    label: 'El Salvador',
    value: 'SV',
    nationality: 'Salvadoran'
  },
  {
    label: 'Equatorial Guinea',
    value: 'GQ',
    nationality: 'Equatorial Guinean'
  },
  {
    label: 'Eritrea',
    value: 'ER',
    nationality: 'Eritrean'
  },
  {
    label: 'Estonia',
    value: 'EE',
    nationality: 'Estonian'
  },
  {
    label: 'Ethiopia',
    value: 'ET',
    nationality: 'Ethiopian'
  },
  {
    label: 'Falkland Islands (Malvinas)',
    value: 'FK',
    nationality: 'Falkland Islander'
  },
  {
    label: 'Faroe Islands',
    value: 'FO',
    nationality: 'Faroese'
  },
  {
    label: 'Fiji',
    value: 'FJ',
    nationality: 'Fijian'
  },
  {
    label: 'Finland',
    value: 'FI',
    nationality: 'Finnish'
  },
  {
    label: 'France',
    value: 'FR',
    nationality: 'French'
  },
  {
    label: 'French Guiana',
    value: 'GF',
    nationality: ''
  },
  {
    label: 'French Polynesia',
    value: 'PF',
    nationality: 'French Polynesian'
  },
  {
    label: 'French Southern Territories',
    value: 'TF',
    nationality: 'French'
  },
  {
    label: 'Gabon',
    value: 'GA',
    nationality: 'Gabonese'
  },
  {
    label: 'Gambia',
    value: 'GM',
    nationality: 'Gambian'
  },
  {
    label: 'Georgia',
    value: 'GE',
    nationality: 'Georgian'
  },
  {
    label: 'Germany',
    value: 'DE',
    nationality: 'German'
  },
  {
    label: 'Ghana',
    value: 'GH',
    nationality: 'Ghanaian'
  },
  {
    label: 'Gibraltar',
    value: 'GI',
    nationality: 'Gibraltar'
  },
  {
    label: 'Greece',
    value: 'GR',
    nationality: 'Greek'
  },
  {
    label: 'Greenland',
    value: 'GL',
    nationality: 'Greenlandic'
  },
  {
    label: 'Grenada',
    value: 'GD',
    nationality: 'Grenadian'
  },
  {
    label: 'Guadeloupe',
    value: 'GP',
    nationality: 'Guadeloupian'
  },
  {
    label: 'Guam',
    value: 'GU',
    nationality: 'Guamanian'
  },
  {
    label: 'Guatemala',
    value: 'GT',
    nationality: 'Guatemalan'
  },
  {
    label: 'Guernsey',
    value: 'GG',
    nationality: 'Channel Islander'
  },
  {
    label: 'Guinea',
    value: 'GN',
    nationality: 'Guinean'
  },
  {
    label: 'Guinea-Bissau',
    value: 'GW',
    nationality: 'Guinea-Bissauan'
  },
  {
    label: 'Guyana',
    value: 'GY',
    nationality: 'Guyanese'
  },
  {
    label: 'Haiti',
    value: 'HT',
    nationality: 'Haitian'
  },
  {
    label: 'Heard Island and McDonald Islands',
    value: 'HM',
    nationality: 'Heard and McDonald Islander'
  },
  {
    label: 'Holy See',
    value: 'VA',
    nationality: ''
  },
  {
    label: 'Honduras',
    value: 'HN',
    nationality: 'Honduran'
  },
  {
    label: 'Hong Kong',
    value: 'HK',
    nationality: 'Chinese'
  },
  {
    label: 'Hungary',
    value: 'HU',
    nationality: 'Hungarian'
  },
  {
    label: 'Iceland',
    value: 'IS',
    nationality: 'Icelander'
  },
  {
    label: 'India',
    value: 'IN',
    nationality: 'Indian'
  },
  {
    label: 'Indonesia',
    value: 'ID',
    nationality: 'Indonesian'
  },
  {
    label: "Côte d'Ivoire",
    value: 'CI',
    nationality: 'Ivorian'
  },
  {
    label: 'Iran (Islamic Republic of)',
    value: 'IR',
    nationality: 'Iranian'
  },
  {
    label: 'Iraq',
    value: 'IQ',
    nationality: 'Iraqi'
  },
  {
    label: 'Ireland',
    value: 'IE',
    nationality: 'Irish'
  },
  {
    label: 'Isle of Man',
    value: 'IM',
    nationality: 'Manx'
  },
  {
    label: 'Israel',
    value: 'IL',
    nationality: 'Israeli'
  },
  {
    label: 'Italy',
    value: 'IT',
    nationality: 'Italian'
  },
  {
    label: 'Jamaica',
    value: 'JM',
    nationality: 'Jamaican'
  },
  {
    label: 'Japan',
    value: 'JP',
    nationality: 'Japanese'
  },
  {
    label: 'Jersey',
    value: 'JE',
    nationality: 'Channel Islander'
  },
  {
    label: 'Jordan',
    value: 'JO',
    nationality: 'Jordanian'
  },
  {
    label: 'Kazakhstan',
    value: 'KZ',
    nationality: 'Kazakhstani'
  },
  {
    label: 'Kenya',
    value: 'KE',
    nationality: 'Kenyan'
  },
  {
    label: 'Kiribati',
    value: 'KI',
    nationality: 'I-Kiribati'
  },
  {
    label: 'Kuwait',
    value: 'KW',
    nationality: 'Kuwaiti'
  },
  {
    label: 'Kyrgyzstan',
    value: 'KG',
    nationality: 'Kirghiz'
  },
  {
    label: "Lao People's Democratic Republic",
    value: 'LA',
    nationality: 'Laotian'
  },
  {
    label: 'Latvia',
    value: 'LV',
    nationality: 'Latvian'
  },
  {
    label: 'Lebanon',
    value: 'LB',
    nationality: 'Lebanese'
  },
  {
    label: 'Lesotho',
    value: 'LS',
    nationality: 'Mosotho'
  },
  {
    label: 'Liberia',
    value: 'LR',
    nationality: 'Liberian'
  },
  {
    label: 'Libya',
    value: 'LY',
    nationality: 'Libyan'
  },
  {
    label: 'Liechtenstein',
    value: 'LI',
    nationality: 'Liechtensteiner'
  },
  {
    label: 'Lithuania',
    value: 'LT',
    nationality: 'Lithuanian'
  },
  {
    label: 'Luxembourg',
    value: 'LU',
    nationality: 'Luxembourger'
  },
  {
    label: 'Macao',
    value: 'MO',
    nationality: 'Chinese'
  },
  {
    label: 'Macedonia (the former Yugoslav Republic of)',
    value: 'MK',
    nationality: 'Macedonian'
  },
  {
    label: 'Madagascar',
    value: 'MG',
    nationality: 'Malagasy'
  },
  {
    label: 'Malawi',
    value: 'MW',
    nationality: 'Malawian'
  },
  {
    label: 'Malaysia',
    value: 'MY',
    nationality: 'Malaysian'
  },
  {
    label: 'Maldives',
    value: 'MV',
    nationality: 'Maldivan'
  },
  {
    label: 'Mali',
    value: 'ML',
    nationality: 'Malian'
  },
  {
    label: 'Malta',
    value: 'MT',
    nationality: 'Maltese'
  },
  {
    label: 'Marshall Islands',
    value: 'MH',
    nationality: 'Marshallese'
  },
  {
    label: 'Martinique',
    value: 'MQ',
    nationality: 'French'
  },
  {
    label: 'Mauritania',
    value: 'MR',
    nationality: 'Mauritanian'
  },
  {
    label: 'Mauritius',
    value: 'MU',
    nationality: 'Mauritian'
  },
  {
    label: 'Mayotte',
    value: 'YT',
    nationality: 'French'
  },
  {
    label: 'Mexico',
    value: 'MX',
    nationality: 'Mexican'
  },
  {
    label: 'Micronesia (Federated States of)',
    value: 'FM',
    nationality: 'Micronesian'
  },
  {
    label: 'Moldova (Republic of)',
    value: 'MD',
    nationality: 'Moldovan'
  },
  {
    label: 'Monaco',
    value: 'MC',
    nationality: 'Monegasque'
  },
  {
    label: 'Mongolia',
    value: 'MN',
    nationality: 'Mongolian'
  },
  {
    label: 'Montenegro',
    value: 'ME',
    nationality: 'Montenegrin'
  },
  {
    label: 'Montserrat',
    value: 'MS',
    nationality: 'Montserratian'
  },
  {
    label: 'Morocco',
    value: 'MA',
    nationality: 'Moroccan'
  },
  {
    label: 'Mozambique',
    value: 'MZ',
    nationality: 'Mozambican'
  },
  {
    label: 'Myanmar',
    value: 'MM',
    nationality: 'Burmese'
  },
  {
    label: 'Namibia',
    value: 'NA',
    nationality: 'Namibian'
  },
  {
    label: 'Nauru',
    value: 'NR',
    nationality: 'Nauruan'
  },
  {
    label: 'Nepal',
    value: 'NP',
    nationality: 'Nepalese'
  },
  {
    label: 'Netherlands',
    value: 'NL',
    nationality: 'Dutch'
  },
  {
    label: 'New Caledonia',
    value: 'NC',
    nationality: 'New Caledonian'
  },
  {
    label: 'New Zealand',
    value: 'NZ',
    nationality: 'New Zealander'
  },
  {
    label: 'Nicaragua',
    value: 'NI',
    nationality: 'Nicaraguan'
  },
  {
    label: 'Niger',
    value: 'NE',
    nationality: 'Nigerien'
  },
  {
    label: 'Nigeria',
    value: 'NG',
    nationality: 'Nigerian'
  },
  {
    label: 'Niue',
    value: 'NU',
    nationality: 'Niuean'
  },
  {
    label: 'Norfolk Island',
    value: 'NF',
    nationality: 'Norfolk Islander'
  },
  {
    label: "Korea (Democratic People's Republic of)",
    value: 'KP',
    nationality: 'North Korean'
  },
  {
    label: 'Northern Mariana Islands',
    value: 'MP',
    nationality: 'American'
  },
  {
    label: 'Norway',
    value: 'NO',
    nationality: 'Norwegian'
  },
  {
    label: 'Oman',
    value: 'OM',
    nationality: 'Omani'
  },
  {
    label: 'Pakistan',
    value: 'PK',
    nationality: 'Pakistani'
  },
  {
    label: 'Palau',
    value: 'PW',
    nationality: 'Palauan'
  },
  {
    label: 'Palestine, State of',
    value: 'PS',
    nationality: 'Palestinian'
  },
  {
    label: 'Panama',
    value: 'PA',
    nationality: 'Panamanian'
  },
  {
    label: 'Papua New Guinea',
    value: 'PG',
    nationality: 'Papua New Guinean'
  },
  {
    label: 'Paraguay',
    value: 'PY',
    nationality: 'Paraguayan'
  },
  {
    label: 'Peru',
    value: 'PE',
    nationality: 'Peruvian'
  },
  {
    label: 'Philippines',
    value: 'PH',
    nationality: 'Filipino'
  },
  {
    label: 'Pitcairn',
    value: 'PN',
    nationality: 'Pitcairn Islander'
  },
  {
    label: 'Poland',
    value: 'PL',
    nationality: 'Polish'
  },
  {
    label: 'Portugal',
    value: 'PT',
    nationality: 'Portuguese'
  },
  {
    label: 'Puerto Rico',
    value: 'PR',
    nationality: 'Puerto Rican'
  },
  {
    label: 'Qatar',
    value: 'QA',
    nationality: 'Qatari'
  },
  {
    label: 'Republic of Kosovo',
    value: 'XK',
    nationality: 'Kosovar'
  },
  {
    label: 'Réunion',
    value: 'RE',
    nationality: 'French'
  },
  {
    label: 'Romania',
    value: 'RO',
    nationality: 'Romanian'
  },
  {
    label: 'Russian Federation',
    value: 'RU',
    nationality: 'Russian'
  },
  {
    label: 'Saint Barthélemy',
    value: 'BL',
    nationality: 'Saint Barthélemy Islander'
  },
  {
    label: 'Saint Helena, Ascension and Tristan da Cunha',
    value: 'SH',
    nationality: 'Saint Helenian'
  },
  {
    label: 'Saint Kitts and Nevis',
    value: 'KN',
    nationality: 'Kittian and Nevisian'
  },
  {
    label: 'Saint Lucia',
    value: 'LC',
    nationality: 'Saint Lucian'
  },
  {
    label: 'Saint Martin (French part)',
    value: 'MF',
    nationality: 'Saint Martin Islander'
  },
  {
    label: 'Saint Pierre and Miquelon',
    value: 'PM',
    nationality: 'French'
  },
  {
    label: 'Saint Vincent and the Grenadines',
    value: 'VC',
    nationality: 'Saint Vincentian'
  },
  {
    label: 'Samoa',
    value: 'WS',
    nationality: 'Samoan'
  },
  {
    label: 'San Marino',
    value: 'SM',
    nationality: 'Sammarinese'
  },
  {
    label: 'Sao Tome and Principe',
    value: 'ST',
    nationality: 'Sao Tomean'
  },
  {
    label: 'Saudi Arabia',
    value: 'SA',
    nationality: 'Saudi Arabian'
  },
  {
    label: 'Senegal',
    value: 'SN',
    nationality: 'Senegalese'
  },
  {
    label: 'Serbia',
    value: 'RS',
    nationality: 'Serbian'
  },
  {
    label: 'Seychelles',
    value: 'SC',
    nationality: 'Seychellois'
  },
  {
    label: 'Sierra Leone',
    value: 'SL',
    nationality: 'Sierra Leonean'
  },
  {
    label: 'Singapore',
    value: 'SG',
    nationality: 'Singaporean'
  },
  {
    label: 'Sint Maarten (Dutch part)',
    value: 'SX',
    nationality: 'Dutch'
  },
  {
    label: 'Slovakia',
    value: 'SK',
    nationality: 'Slovak'
  },
  {
    label: 'Slovenia',
    value: 'SI',
    nationality: 'Slovene'
  },
  {
    label: 'Solomon Islands',
    value: 'SB',
    nationality: 'Solomon Islander'
  },
  {
    label: 'Somalia',
    value: 'SO',
    nationality: 'Somali'
  },
  {
    label: 'South Africa',
    value: 'ZA',
    nationality: 'South African'
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    value: 'GS',
    nationality: 'South Georgia and the South Sandwich Islander'
  },
  {
    label: 'Korea (Republic of)',
    value: 'KR',
    nationality: 'South Korean'
  },
  {
    label: 'South Sudan',
    value: 'SS',
    nationality: 'South Sudanese'
  },
  {
    label: 'Spain',
    value: 'ES',
    nationality: 'Spanish'
  },
  {
    label: 'Sri Lanka',
    value: 'LK',
    nationality: 'Sri Lankan'
  },
  {
    label: 'Sudan',
    value: 'SD',
    nationality: 'Sudanese'
  },
  {
    label: 'Suriname',
    value: 'SR',
    nationality: 'Surinamer'
  },
  {
    label: 'Svalbard and Jan Mayen',
    value: 'SJ',
    nationality: 'Norwegian'
  },
  {
    label: 'Swaziland',
    value: 'SZ',
    nationality: 'Swazi'
  },
  {
    label: 'Sweden',
    value: 'SE',
    nationality: 'Swedish'
  },
  {
    label: 'Switzerland',
    value: 'CH',
    nationality: 'Swiss'
  },
  {
    label: 'Syrian Arab Republic',
    value: 'SY',
    nationality: 'Syrian'
  },
  {
    label: 'Taiwan',
    value: 'TW',
    nationality: 'Taiwanese'
  },
  {
    label: 'Tajikistan',
    value: 'TJ',
    nationality: 'Tadzhik'
  },
  {
    label: 'Tanzania, United Republic of',
    value: 'TZ',
    nationality: 'Tanzanian'
  },
  {
    label: 'Thailand',
    value: 'TH',
    nationality: 'Thai'
  },
  {
    label: 'Timor-Leste',
    value: 'TL',
    nationality: 'East Timorese'
  },
  {
    label: 'Togo',
    value: 'TG',
    nationality: 'Togolese'
  },
  {
    label: 'Tokelau',
    value: 'TK',
    nationality: 'Tokelauan'
  },
  {
    label: 'Tonga',
    value: 'TO',
    nationality: 'Tongan'
  },
  {
    label: 'Trinidad and Tobago',
    value: 'TT',
    nationality: 'Trinidadian'
  },
  {
    label: 'Tunisia',
    value: 'TN',
    nationality: 'Tunisian'
  },
  {
    label: 'Turkey',
    value: 'TR',
    nationality: 'Turkish'
  },
  {
    label: 'Turkmenistan',
    value: 'TM',
    nationality: 'Turkmen'
  },
  {
    label: 'Turks and Caicos Islands',
    value: 'TC',
    nationality: 'Turks and Caicos Islander'
  },
  {
    label: 'Tuvalu',
    value: 'TV',
    nationality: 'Tuvaluan'
  },
  {
    label: 'Uganda',
    value: 'UG',
    nationality: 'Ugandan'
  },
  {
    label: 'Ukraine',
    value: 'UA',
    nationality: 'Ukrainian'
  },
  {
    label: 'United Arab Emirates',
    value: 'AE',
    nationality: 'Emirati'
  },
  {
    label: 'United Kingdom of Great Britain and Northern Ireland',
    value: 'GB',
    nationality: 'British'
  },
  {
    label: 'United States of America',
    value: 'US',
    nationality: 'American'
  },
  {
    label: 'Uruguay',
    value: 'UY',
    nationality: 'Uruguayan'
  },
  {
    label: 'Uzbekistan',
    value: 'UZ',
    nationality: 'Uzbekistani'
  },
  {
    label: 'Vanuatu',
    value: 'VU',
    nationality: 'Ni-Vanuatu'
  },
  {
    label: 'Venezuela (Bolivarian Republic of)',
    value: 'VE',
    nationality: 'Venezuelan'
  },
  {
    label: 'Viet Nam',
    value: 'VN',
    nationality: 'Vietnamese'
  },
  {
    label: 'Wallis and Futuna',
    value: 'WF',
    nationality: 'Wallis and Futuna Islander'
  },
  {
    label: 'Western Sahara',
    value: 'EH',
    nationality: 'Sahrawi'
  },
  {
    label: 'Yemen',
    value: 'YE',
    nationality: 'Yemeni'
  },
  {
    label: 'Zambia',
    value: 'ZM',
    nationality: 'Zambian'
  },
  {
    label: 'Zimbabwe',
    value: 'ZW',
    nationality: 'Zimbabwean'
  }
];

export default countriesList;
