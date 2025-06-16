// Map configuration constants
export const LIBRARIES = ['marker', 'places'];

export const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

export const defaultCenter = {
  lat: 40.723617,
  lng: -73.950836
};

export const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

// Updated with all 38 restaurants from Google Places API extraction
export const initialMarkersData = [
  {
    "id": 1,
    "name": "StEight(behind KUNIYA HAIR)",
    "position": {
      "lat": 40.7182225,
      "lng": -73.9917547
    },
    "address": "116 Eldridge St, New York, NY 10002, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJldB8qZNZwokRYwDAq_cgDro"
  },
  {
    "id": 2,
    "name": "Shuya",
    "position": {
      "lat": 40.7460834,
      "lng": -73.9775784
    },
    "address": "517 3rd Ave, New York, NY 10016, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJl1mCTwBZwokR2pxwHafrjJE"
  },
  {
    "id": 3,
    "name": "Cafe O'Te by HOUSE Brooklyn",
    "position": {
      "lat": 40.7245089,
      "lng": -73.9539175
    },
    "address": "38 Norman Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ417z_aJZwokROPV2Oz3myKg"
  },
  {
    "id": 4,
    "name": "TabeTomo",
    "position": {
      "lat": 40.7269404,
      "lng": -73.9831557
    },
    "address": "131 Avenue A, New York, NY 10009, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJMcrE97VZwokR6_VTjbNC-MI"
  },
  {
    "id": 5,
    "name": "Rule of Thirds",
    "position": {
      "lat": 40.7247448,
      "lng": -73.9552327
    },
    "address": "171 Banker St, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJaQRXYuRZwokRHjAN5MkBizY"
  },
  {
    "id": 6,
    "name": "The Greats of Craft LIC",
    "position": {
      "lat": 40.7521825,
      "lng": -73.9480531
    },
    "address": "10-15 43rd Ave, Long Island City, NY 11101, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJL0xJb_ZZwokRfmKufMDAycE"
  },
  {
    "id": 7,
    "name": "Smør",
    "position": {
      "lat": 40.6826191,
      "lng": -73.96096039999999
    },
    "address": "26 Putnam Ave, Brooklyn, NY 11238, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJid6BdwBbwokRe3HVRa9K1VE"
  },
  {
    "id": 8,
    "name": "Lovely Day",
    "position": {
      "lat": 40.7217681,
      "lng": -73.9942796
    },
    "address": "196 Elizabeth St, New York, NY 10012, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJW5IvBIZZwokRVaV7E-M6m8M"
  },
  {
    "id": 10,
    "name": "Beer Table",
    "position": {
      "lat": 40.75533765467295,
      "lng": -73.97084354572672
    },
    "address": "87 E 42nd St, New York, NY 10017, USA",
    "placeId": "ChIJGyXkmBxZwokRxObhoMjsqv0"
  },
  {
    "id": 11,
    "name": "yakuni",
    "position": {
      "lat": 40.7571743,
      "lng": -73.96838300000002
    },
    "address": "226 E 53rd St BSMT w, New York, NY 10022, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJN0u8egBZwokRCM2XbebokuQ"
  },
  {
    "id": 13,
    "name": "Hard to Explain",
    "position": {
      "lat": 40.72912609999999,
      "lng": -73.98560379999999
    },
    "address": "224 E 10th St, New York, NY 10003, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJZyhu1alZwokRDu4FC-wriY4"
  },
  {
    "id": 14,
    "name": "Velma Restaurant",
    "position": {
      "lat": 40.7042332,
      "lng": -73.9104028
    },
    "address": "584 Seneca Ave, Queens, NY 11385, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJl-QwDnxdwokRUoS7oTlwK0Q"
  },
  {
    "id": 15,
    "name": "icca",
    "position": {
      "lat": 40.7143008,
      "lng": -74.0076845
    },
    "address": "20 Warren St, New York, NY 10007, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJyRIhC_dbwokRqGoh89KPQME"
  },
  {
    "id": 16,
    "name": "As you like",
    "position": {
      "lat": 40.71659049999999,
      "lng": -73.9427596
    },
    "address": "428 Humboldt St, Brooklyn, NY 11211, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJCbecnoVZwokRiMxQmAt9pxk"
  },
  {
    "id": 17,
    "name": "DASHI OKUME Brooklyn",
    "position": {
      "lat": 40.7246839,
      "lng": -73.9536504
    },
    "address": "50 Norman Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJYe9rSINZwokRw_36I8jEHzM"
  },
  {
    "id": 18,
    "name": "Creston",
    "position": {
      "lat": 40.71794500000001,
      "lng": -73.99243299999999
    },
    "address": "282 Grand St, New York, NY 10002, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJxx06i8dZwokRMgAg7mEIwSw"
  },
  {
    "id": 19,
    "name": "Wasan Brooklyn",
    "position": {
      "lat": 40.6812952,
      "lng": -73.9768496
    },
    "address": "440 Bergen St, Brooklyn, NY 11217, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJBavgoa5bwokRmG1fmugGzlE"
  },
  {
    "id": 20,
    "name": "Bar Moga",
    "position": {
      "lat": 40.7278195,
      "lng": -74.0010896
    },
    "address": "128 W Houston St, New York, NY 10012, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJRy7Z-I1ZwokRQm17a6QDJ6E"
  },
  {
    "id": 21,
    "name": "The Izakaya NYC",
    "position": {
      "lat": 40.72671450000001,
      "lng": -73.98734
    },
    "address": "326 E 6th St, New York, NY 10003, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJKWfvx5xZwokRpeSAmKP10Sg"
  },
  {
    "id": 22,
    "name": "OKONOMI / YUJI Ramen Manhattan",
    "position": {
      "lat": 40.7442476,
      "lng": -73.9906333
    },
    "address": "36 W 26th St, New York, NY 10010, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJtSiEHwBZwokRvaIX7do3E7Y"
  },
  {
    "id": 23,
    "name": "TONCHIN NEW YORK",
    "position": {
      "lat": 40.7502712,
      "lng": -73.9845225
    },
    "address": "13 W 36th St., New York, NY 10018, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJBwGziqlZwokRb3MTH3xUt0Y"
  },
  {
    "id": 24,
    "name": "C as in Charlie",
    "position": {
      "lat": 40.7255039,
      "lng": -73.99270179999999
    },
    "address": "5 Bleecker St, New York, NY 10012, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJx-bMHr1ZwokRd3i_y7F3VlE"
  },
  {
    "id": 25,
    "name": "Secchu Yokota 折衷よこ田",
    "position": {
      "lat": 40.7228463,
      "lng": -73.9831229
    },
    "address": "199 E 3rd St, New York, NY 10009, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ8-YKf4JZwokR8E9EvXIGnhI"
  },
  {
    "id": 26,
    "name": "Beer Run UWS",
    "position": {
      "lat": 40.7867868,
      "lng": -73.9717038
    },
    "address": "547 Columbus Ave, New York, NY 10024, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ3S2hi5RZwokR62FzBraqmQ0"
  },
  {
    "id": 27,
    "name": "Susuru Ramen",
    "position": {
      "lat": 40.75567,
      "lng": -73.92734399999999
    },
    "address": "33-19 36th Ave, Long Island City, NY 11106, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJI24tFJtfwokRG-LlfsXYTDA"
  },
  {
    "id": 28,
    "name": "Sweet Avenue",
    "position": {
      "lat": 40.744124,
      "lng": -73.923926
    },
    "address": "40-05 Queens Blvd, Sunnyside, NY 11104, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJmbusst5fwokRG7J7eIN55AU"
  },
  {
    "id": 29,
    "name": "MOGMOG",
    "position": {
      "lat": 40.74233189999999,
      "lng": -73.9552533
    },
    "address": "5-35 51st Ave, Long Island City, NY 11101, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJP196UmFZwokR9HJCzWGczA4"
  },
  {
    "id": 30,
    "name": "Brouwerij Lane",
    "position": {
      "lat": 40.729628,
      "lng": -73.957911
    },
    "address": "78 Greenpoint Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJQVgaRkBZwokRXAw3-NTM6hw"
  },
  {
    "id": 31,
    "name": "A-un Brooklyn",
    "position": {
      "lat": 40.7041433,
      "lng": -73.9280254
    },
    "address": "156 Knickerbocker Ave, Brooklyn, NY 11237, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJF-b7DGRdwokRQ86k2XAopKk"
  },
  {
    "id": 32,
    "name": "Monarch Izakaya Restaurant",
    "position": {
      "lat": 40.7159106,
      "lng": -73.9622605
    },
    "address": "146 Metropolitan Ave, Brooklyn, NY 11249, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ6_M75OhZwokRiuRfFsoX7K8"
  },
  {
    "id": 33,
    "name": "TONCHIN BROOKLYN",
    "position": {
      "lat": 40.716755,
      "lng": -73.9616957
    },
    "address": "109 N 3rd St, Brooklyn, NY 11249, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJVQw7S69ZwokRxkRkuFLa494"
  },
  {
    "id": 34,
    "name": "Taku Sando",
    "position": {
      "lat": 40.72988,
      "lng": -73.95963569999999
    },
    "address": "29 Greenpoint Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ8ZshVyFZwokRqQFLjNmfWmE"
  },
  {
    "id": 35,
    "name": "SSAW Brooklyn",
    "position": {
      "lat": 40.7092207,
      "lng": -73.95397609999999
    },
    "address": "330 S 3rd St, Brooklyn, NY 11211, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ3xYJKABbwokRjhgU1mfahJk"
  },
  {
    "id": 36,
    "name": "TØRST",
    "position": {
      "lat": 40.72341399999999,
      "lng": -73.9507986
    },
    "address": "615 Manhattan Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJlaFjTURZwokRvsN6V805OEk"
  },
  {
    "id": 37,
    "name": "Brooklyn Kura",
    "position": {
      "lat": 40.6578887,
      "lng": -74.0074793
    },
    "address": "34 34th St, Brooklyn, NY 11232, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJnxaggMBawokRt7fWu0tvGBY"
  },
  {
    "id": 38,
    "name": "Queue Beer",
    "position": {
      "lat": 40.6740637,
      "lng": -73.99825770000001
    },
    "address": "500 Smith St, Brooklyn, NY 11231, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJHzJT8c9bwokRyBhYdoeZIE8"
  },
  {
    "id": 39,
    "name": "Coffee Table",
    "position": {
      "lat": 40.75546768875217,
      "lng": -73.97805332353686
    },
    "address": "107 E 42nd St, New York, NY 10017, USA",
    "placeId": "ChIJzcLzQtVZwokR9sn3GLG1aJw"
  },
  {
    "id": 41,
    "name": "The Lantern Inn",
    "position": {
      "lat": 41.80629948063366,
      "lng": -73.54754507316198
    },
    "address": "10 Main St, Wassaic, NY 12592, USA",
    "placeId": "ChIJH6rIA55k3YkRknH_IoV1fn4"
  },
  {
    "id": 42,
    "name": "Jō",
    "position": {
      "lat": 40.74927454661329,
      "lng": -73.98107069916597
    },
    "address": "127 E 34th St, New York, NY 10016, USA",
    "placeId": "ChIJ0wqA3DVZwokRw9mv_CYa8XQ"
  },
  {
    "id": 40,
    "name": "Beer Table Penn Station",
    "position": {
      "lat": 40.75403729989236,
      "lng": -73.99367450879208
    },
    "address": "1 Pennsylvania Plaza LIRR Concourse #115, New York, NY 10119, USA",
    "placeId": "ChIJFya9D-pZwokRAqPOcznC7P4"
  },
];