const wifiData = [
    // {
    //   "location": "Laiba's room",
    //   "signals": [
    //     {
    //       "ssid": "FLASH FIBER",
    //       "mac": "6c:e8:74:be:f0:6c",
    //       "signalStrength": "-67.0"
    //     },
    //     {
    //       "ssid": "FLASH FIBER 5G",
    //       "mac": "6c:e8:74:be:f0:70",
    //       "signalStrength": "-81.0"
    //     },
    //     {
    //       "ssid": "PTCL-GPON",
    //       "mac": "d0:c6:5b:0d:9b:64",
    //       "signalStrength": "-83.0"
    //     },
    //     {
    //       "ssid": "Mohib",
    //       "mac": "04:d4:c4:11:8a:00",
    //       "signalStrength": "-94.0"
    //     }
    //   ]
    // },
    // {
    //   "location": "Laiba's room 2",
    //   "signals": [
    //     {
    //       "ssid": "HUAWEI-sPvz",
    //       "mac": "74:5a:aa:73:66:60",
    //       "signalStrength": "-72.0"
    //     },
    //     {
    //       "ssid": "FLASH FIBER 5G",
    //       "mac": "6c:e8:74:be:f0:70",
    //       "signalStrength": "-79.0"
    //     },
    //     {
    //       "ssid": "Home Sweet Home",
    //       "mac": "28:a6:db:79:39:d4",
    //       "signalStrength": "-94.0"
    //     },
    //     {
    //       "ssid": "PTCL-GPON",
    //       "mac": "d0:c6:5b:0d:9b:64",
    //       "signalStrength": "-79.0"
    //     }
    //   ]
    // },
    // {
    //   "location": "Laiba's Lounge",
    //   "signals": [
    //     {
    //       "ssid": "FLASH FIBER",
    //       "mac": "6c:e8:74:be:f0:6c",
    //       "signalStrength": "-71.0"
    //     },
    //     {
    //       "ssid": "HUAWEI-sPvz",
    //       "mac": "74:5a:aa:73:66:60",
    //       "signalStrength": "-82.0"
    //     },
    //     {
    //       "ssid": "FLASH FIBER 5G",
    //       "mac": "6c:e8:74:be:f0:70",
    //       "signalStrength": "-86.0"
    //     },
    //     {
    //       "ssid": "PTCL-GPON",
    //       "mac": "d0:c6:5b:0d:9b:64",
    //       "signalStrength": "-72.0"
    //     }
    //   ]
    // },
    // {
    //   "location": "Laiba's kitchen",
    //   "signals": [
    //     {
    //       "ssid": "FLASH FIBER",
    //       "mac": "6c:e8:74:be:f0:6c",
    //       "signalStrength": "-88.0"
    //     },
    //     {
    //       "ssid": "Abdul Wahid",
    //       "mac": "c0:c9:e3:b5:90:38",
    //       "signalStrength": "-96.0"
    //     },
    //     {
    //       "ssid": "Home Sweet Home",
    //       "mac": "28:a6:db:79:39:d4",
    //       "signalStrength": "-96.0"
    //     },
    //     {
    //       "ssid": "PTCL-GPON",
    //       "mac": "d0:c6:5b:0d:9b:64",
    //       "signalStrength": "-79.0"
    //     },
    //     {
    //       "ssid": "PTCL G-Pon 383 ",
    //       "mac": "98:1a:35:7f:37:10",
    //       "signalStrength": "-91.0"
    //     }
    //   ]
    // },
    // {
    //   "location": "Laiba's Drawing Room",
    //   "signals": [
    //     {
    //       "ssid": "FLASH FIBER",
    //       "mac": "6c:e8:74:be:f0:6c",
    //       "signalStrength": "-67.0"
    //     },
    //     {
    //       "ssid": "FLASH FIBER 5G",
    //       "mac": "6c:e8:74:be:f0:70",
    //       "signalStrength": "-80.0"
    //     },
    //     {
    //       "ssid": "PTCL-GPON",
    //       "mac": "d0:c6:5b:0d:9b:64",
    //       "signalStrength": "-73.0"
    //     },
    //     {
    //       "ssid": "Mohib",
    //       "mac": "04:d4:c4:11:8a:00",
    //       "signalStrength": "-87.0"
    //     }
    //   ]
    // },
    // {
    //   "location": "Alishba's room",
    //   "signals": [
    //     {
    //       "ssid": "🇱🇾 ",
    //       "mac": "74:da:88:07:05:ee",
    //       "signalStrength": "-67.0"
    //     },
    //     {
    //       "ssid": "CONNECT 15",
    //       "mac": "b4:43:26:77:94:1c",
    //       "signalStrength": "-69.0"
    //     },
    //     {
    //       "ssid": "MA",
    //       "mac": "ec:08:6b:f6:f5:fc",
    //       "signalStrength": "-87.0"
    //     },
    //     {
    //       "ssid": "FTTH-1081-2",
    //       "mac": "30:d1:7e:2c:34:d4",
    //       "signalStrength": "-32.0"
    //     },
    //     {
    //       "ssid": "Ahsan-5G",
    //       "mac": "f4:e4:51:02:6c:e0",
    //       "signalStrength": "-73.0"
    //     },
    //     {
    //       "ssid": "Ahsan",
    //       "mac": "f4:e4:51:02:6c:dc",
    //       "signalStrength": "-85.0"
    //     },
    //     {
    //       "ssid": "FTTH-Salman",
    //       "mac": "80:d4:a5:5e:4c:34",
    //       "signalStrength": "-82.0"
    //     },
    //     {
    //       "ssid": "FTTH-1080",
    //       "mac": "34:6a:c2:05:8a:80",
    //       "signalStrength": "-80.0"
    //     },
    //     {
    //       "ssid": "Abdul Aziz-5G",
    //       "mac": "14:8c:4a:fc:17:08",
    //       "signalStrength": "-73.0"
    //     },
    //     {
    //       "ssid": "FAZAL",
    //       "mac": "e0:e0:c2:d0:f9:08",
    //       "signalStrength": "-87.0"
    //     },
    //     {
    //       "ssid": "FTTH-1085",
    //       "mac": "58:25:75:39:a7:20",
    //       "signalStrength": "-83.0"
    //     },
    //     {
    //       "ssid": "TP-LINK_4A50",
    //       "mac": "d4:6e:0e:77:4a:50",
    //       "signalStrength": "-78.0"
    //     },
    //     {
    //       "ssid": "WirelessNet",
    //       "mac": "c0:bf:c0:15:82:30",
    //       "signalStrength": "-82.0"
    //     },
    //     {
    //       "ssid": "FTTH-1084",
    //       "mac": "d4:6b:a6:37:58:64",
    //       "signalStrength": "-70.0"
    //     },
    //     {
    //       "ssid": "TENDA(5G)",
    //       "mac": "c8:3a:35:48:8e:50",
    //       "signalStrength": "-68.0"
    //     },
    //     {
    //       "ssid": "FTTH-KHAN",
    //       "mac": "a4:c6:4f:62:8b:98",
    //       "signalStrength": "-87.0"
    //     }
    //   ]
    // },
    // {
    //   "location": "Alishba Room2",
    //   "signals": [
    //     {
    //       "ssid": "🇱🇾 ",
    //       "mac": "74:da:88:07:05:ee",
    //       "signalStrength": "-72.0"
    //     },
    //     {
    //       "ssid": "CONNECT 15",
    //       "mac": "b4:43:26:77:94:1c",
    //       "signalStrength": "-78.0"
    //     },
    //     {
    //       "ssid": "MA",
    //       "mac": "ec:08:6b:f6:f5:fc",
    //       "signalStrength": "-87.0"
    //     },
    //     {
    //       "ssid": "FTTH-1081-2",
    //       "mac": "30:d1:7e:2c:34:d4",
    //       "signalStrength": "-39.0"
    //     },
    //     {
    //       "ssid": "Ahsan-5G",
    //       "mac": "f4:e4:51:02:6c:e0",
    //       "signalStrength": "-73.0"
    //     },
    //     {
    //       "ssid": "Ahsan",
    //       "mac": "f4:e4:51:02:6c:dc",
    //       "signalStrength": "-85.0"
    //     },
    //     {
    //       "ssid": "FTTH-1080",
    //       "mac": "34:6a:c2:05:8a:80",
    //       "signalStrength": "-80.0"
    //     },
    //     {
    //       "ssid": "Abdul Aziz-5G",
    //       "mac": "14:8c:4a:fc:17:08",
    //       "signalStrength": "-73.0"
    //     },
    //     {
    //       "ssid": "FTTH-1085",
    //       "mac": "58:25:75:39:a7:20",
    //       "signalStrength": "-83.0"
    //     },
    //     {
    //       "ssid": "TP-LINK_4A50",
    //       "mac": "d4:6e:0e:77:4a:50",
    //       "signalStrength": "-82.0"
    //     },
    //     {
    //       "ssid": "WirelessNet",
    //       "mac": "c0:bf:c0:15:82:30",
    //       "signalStrength": "-75.0"
    //     },
    //     {
    //       "ssid": "FTTH-1084",
    //       "mac": "d4:6b:a6:37:58:64",
    //       "signalStrength": "-62.0"
    //     },
    //     {
    //       "ssid": "TENDA(5G)",
    //       "mac": "c8:3a:35:48:8e:50",
    //       "signalStrength": "-69.0"
    //     }
    //   ]
    // },
    // {
    //   "location": "Alishba's lounge",
    //   "signals": [
    //     {
    //       "ssid": "🇱🇾 ",
    //       "mac": "74:da:88:07:05:ee",
    //       "signalStrength": "-67.5"
    //     },
    //     {
    //       "ssid": "CONNECT 15",
    //       "mac": "b4:43:26:77:94:1c",
    //       "signalStrength": "-78.0"
    //     },
    //     {
    //       "ssid": "MA",
    //       "mac": "ec:08:6b:f6:f5:fc",
    //       "signalStrength": "-87.0"
    //     },
    //     {
    //       "ssid": "FTTH-1081-2",
    //       "mac": "30:d1:7e:2c:34:d4",
    //       "signalStrength": "-32.5"
    //     },
    //     {
    //       "ssid": "Ahsan-5G",
    //       "mac": "f4:e4:51:02:6c:e0",
    //       "signalStrength": "-73.0"
    //     },
    //     {
    //       "ssid": "Ahsan",
    //       "mac": "f4:e4:51:02:6c:dc",
    //       "signalStrength": "-85.0"
    //     },
    //     {
    //       "ssid": "FTTH-1080",
    //       "mac": "34:6a:c2:05:8a:80",
    //       "signalStrength": "-80.0"
    //     },
    //     {
    //       "ssid": "Abdul Aziz-5G",
    //       "mac": "14:8c:4a:fc:17:08",
    //       "signalStrength": "-73.0"
    //     },
    //     {
    //       "ssid": "FTTH-1085",
    //       "mac": "58:25:75:39:a7:20",
    //       "signalStrength": "-83.0"
    //     },
    //     {
    //       "ssid": "TP-LINK_4A50",
    //       "mac": "d4:6e:0e:77:4a:50",
    //       "signalStrength": "-82.0"
    //     },
    //     {
    //       "ssid": "WirelessNet",
    //       "mac": "c0:bf:c0:15:82:30",
    //       "signalStrength": "-75.0"
    //     },
    //     {
    //       "ssid": "FTTH-1084",
    //       "mac": "d4:6b:a6:37:58:64",
    //       "signalStrength": "-60.5"
    //     },
    //     {
    //       "ssid": "TENDA(5G)",
    //       "mac": "c8:3a:35:48:8e:50",
    //       "signalStrength": "-62.5"
    //     }
    //   ]
    // },
    {
      "location": "Dr Shariq's office",
      "signals": [
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:cb:60",
          "signalStrength": "-49.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:c6:00",
          "signalStrength": "-71.0"
        },
        {
          "ssid": "NEDUET-WiFi Network",
          "mac": "14:d6:4d:a6:f7:33",
          "signalStrength": "-80.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:ca:c0",
          "signalStrength": "-89.0"
        }
      ]
    },
    {
      "location": "CSIT Room 1",
      "signals": [
        {
          "ssid": "TECNO POVA 2",
          "mac": "8a:d4:13:b2:b1:ec",
          "signalStrength": "-84.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:b0",
          "signalStrength": "-58.0"
        },
        {
          "ssid": "Classroom 1",
          "mac": "38:4b:76:c9:7f:c8",
          "signalStrength": "-80.0"
        },
        {
          "ssid": "Redmi 9",
          "mac": "fe:5f:35:f9:5f:8c",
          "signalStrength": "-91.0"
        },
        {
          "ssid": "TECNO SPARK 4",
          "mac": "b6:43:f8:1d:d8:2a",
          "signalStrength": "-65.0"
        },
        {
          "ssid": "Mango Las  C",
          "mac": "aa:4a:02:a0:77:5f",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "Pixel",
          "mac": "6a:ae:6a:0b:47:d9",
          "signalStrength": "-63.0"
        },
        {
          "ssid": "DIRECT-BF-HP ",
          "mac": "32:24:a9:f6:4b:bf",
          "signalStrength": "-84.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:4b:90",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "realme 5i",
          "mac": "4a:75:0d:bf:f3:b1",
          "signalStrength": "-68.0"
    }
    ]
    },
    {
      "location": "CSIT Room 2",
      "signals": [
        {
          "ssid": "TECNO SPARK 5 Pro",
          "mac": "e2:6d:63:c9:ee:95",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:00",
          "signalStrength": "-62.5"
        },
        {
          "ssid": "realme 5i",
          "mac": "4a:75:0d:bf:f3:b1",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:b0",
          "signalStrength": "-64.5"
        },
        {
          "ssid": "Redmi 9",
          "mac": "fe:5f:35:f9:5f:8c",
          "signalStrength": "-69.0"
        },
        {
          "ssid": "TECNO SPARK 4",
          "mac": "b6:43:f8:1d:d8:2a",
          "signalStrength": "-63.5"
        },
        {
          "ssid": "TURKI ",
          "mac": "aa:af:b1:b0:62:ca",
          "signalStrength": "-78.5"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-85.5"
        }
      ]
    },
    {
      "location": "CSIT Room 3",
      "signals": [
        {
          "ssid": "manal.",
          "mac": "ba:ee:42:9b:a7:37",
          "signalStrength": "-89.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:14:60",
          "signalStrength": "-88.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:10",
          "signalStrength": "-57.0"
        },
        {
          "ssid": "TECNO SPARK 5 Pro",
          "mac": "e2:6d:63:c9:ee:95",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "Muskan's Phone",
          "mac": "e6:71:65:04:85:2d",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:00",
          "signalStrength": "-80.0"
        },
        {
          "ssid": "realme 5i",
          "mac": "4a:75:0d:bf:f3:b1",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:a0",
          "signalStrength": "-59.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:b0",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "Redmi 9",
          "mac": "fe:5f:35:f9:5f:8c",
          "signalStrength": "-64.0"
        },
        {
          "ssid": "OPPO A53",
          "mac": "06:24:74:85:08:f8",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "TECNO SPARK 4",
          "mac": "b6:43:f8:1d:d8:2a",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "TURKI ",
          "mac": "aa:af:b1:b0:62:ca",
          "signalStrength": "-92.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:cb:50",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "Infinix SMART 7",
          "mac": "e6:b0:1c:25:e2:94",
          "signalStrength": "-78.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-89.0"
        }
      ]
    },
    {
      "location": "CSIT Room 4",
      "signals": [
        {
          "ssid": "manal.",
          "mac": "ba:ee:42:9b:a7:37",
          "signalStrength": "-89.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:14:60",
          "signalStrength": "-88.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:10",
          "signalStrength": "-57.0"
        },
        {
          "ssid": "TECNO SPARK 5 Pro",
          "mac": "e2:6d:63:c9:ee:95",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "Muskan's Phone",
          "mac": "e6:71:65:04:85:2d",
          "signalStrength": "-75.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:00",
          "signalStrength": "-62.0"
        },
        {
          "ssid": "realme 5i",
          "mac": "4a:75:0d:bf:f3:b1",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:90",
          "signalStrength": "-69.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:a0",
          "signalStrength": "-59.0"
        },
        {
          "ssid": "TECNO POVA 2",
          "mac": "8a:d4:13:b2:b1:ec",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:b0",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "Redmi 9",
          "mac": "fe:5f:35:f9:5f:8c",
          "signalStrength": "-64.0"
        },
        {
          "ssid": "OPPO A53",
          "mac": "06:24:74:85:08:f8",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "TECNO SPARK 4",
          "mac": "b6:43:f8:1d:d8:2a",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "TURKI ",
          "mac": "aa:af:b1:b0:62:ca",
          "signalStrength": "-92.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:cb:50",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:cb:40",
          "signalStrength": "-84.0"
        },
        {
          "ssid": "Infinix SMART 7",
          "mac": "e6:b0:1c:25:e2:94",
          "signalStrength": "-78.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-89.0"
        }
      ]
    },
    {
      "location": "CSIT Room 5",
      "signals": [
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:30",
          "signalStrength": "-59.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:20",
          "signalStrength": "-78.0"
        },
        {
          "ssid": "HUAWEI Y6s",
          "mac": "b2:73:5d:b6:9f:ca",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "j7",
          "mac": "32:6a:85:2d:72:84",
          "signalStrength": "-75.0"
        },
        {
          "ssid": "Techni",
          "mac": "e6:cb:49:6c:86:7f",
          "signalStrength": "-89.0"
        },
        {
          "ssid": "Nuh uh >:(",
          "mac": "16:40:34:a3:2d:b4",
          "signalStrength": "-62.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:f0",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "Redmi Note 11",
          "mac": "c6:24:0a:0b:78:d1",
          "signalStrength": "-64.0"
        },
        {
          "ssid": "V2043_21",
          "mac": "7e:8b:9c:ea:86:43",
          "signalStrength": "-63.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:a0",
          "signalStrength": "-65.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:b0",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "TECNO SPARK 5 Pro",
          "mac": "72:f8:22:7f:3a:9a",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "Huawei ",
          "mac": "8a:29:c5:1f:8a:72",
          "signalStrength": "-56.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:d0",
          "signalStrength": "-60.0"
        },
        {
          "ssid": "Hassan's 4A5G",
          "mac": "6a:cd:f2:18:01:d6",
          "signalStrength": "-83.0"
        },
        {
          "ssid": "Infinix NOTE 7",
          "mac": "f2:34:27:15:b5:7c",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-65.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:20",
          "signalStrength": "-67.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:4b:90",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "realme C25Y1",
          "mac": "32:da:7c:18:0d:ef",
          "signalStrength": "-85.0"
        }
      ]
    },
    {
      "location": "CSIT Room 6",
      "signals": [
        {
          "ssid": "OPPO F17 Pro",
          "mac": "ba:6f:42:ec:94:2f",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "TECNO SPARK 20",
          "mac": "f6:92:cc:88:43:ed",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:30",
          "signalStrength": "-69.0"
        },
        {
          "ssid": "TECNO SPARK Go 2024",
          "mac": "32:de:8f:2a:44:6a",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "Ftktyt",
          "mac": "b6:79:4e:0b:b2:89",
          "signalStrength": "-80.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:10",
          "signalStrength": "-88.0"
        },
        {
          "ssid": "realme C35",
          "mac": "6e:e3:dd:87:b3:17",
          "signalStrength": "-63.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:b0",
          "signalStrength": "-93.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:f0",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "Muhammad's Galaxy S10+",
          "mac": "fa:a2:9b:c5:d8:03",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:c0",
          "signalStrength": "-71.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:d0",
          "signalStrength": "-77.0"
        },
        {
          "ssid": "Pixel_6498",
          "mac": "1e:57:2c:34:2c:34",
          "signalStrength": "-62.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "Jazz-LTE-767F",
          "mac": "7c:45:d0:41:76:7f",
          "signalStrength": "-64.0"
        }
      ]
    },
    {
      "location": "CSIT Room 7",
      "signals": [
        {
          "ssid": "OPPO F17 Pro",
          "mac": "ba:6f:42:ec:94:2f",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "TECNO SPARK 20",
          "mac": "f6:92:cc:88:43:ed",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:30",
          "signalStrength": "-69.0"
        },
        {
          "ssid": "TECNO SPARK Go 2024",
          "mac": "32:de:8f:2a:44:6a",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:20",
          "signalStrength": "-58.0"
        },
        {
          "ssid": "Ftktyt",
          "mac": "b6:79:4e:0b:b2:89",
          "signalStrength": "-80.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:10",
          "signalStrength": "-88.0"
        },
        {
          "ssid": "realme C35",
          "mac": "6e:e3:dd:87:b3:17",
          "signalStrength": "-63.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:b0",
          "signalStrength": "-93.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:f0",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "Muhammad's Galaxy S10+",
          "mac": "fa:a2:9b:c5:d8:03",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:c0",
          "signalStrength": "-71.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:d0",
          "signalStrength": "-77.0"
        },
        {
          "ssid": "Pixel_6498",
          "mac": "1e:57:2c:34:2c:34",
          "signalStrength": "-62.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "Jazz-LTE-767F",
          "mac": "7c:45:d0:41:76:7f",
          "signalStrength": "-64.0"
        }
      ]
    },
    {
      "location": "CSIT Room 8",
      "signals": [
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:30",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:20",
          "signalStrength": "-78.0"
        },
        {
          "ssid": "HUAWEI Y6s",
          "mac": "b2:73:5d:b6:9f:ca",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "j7",
          "mac": "32:6a:85:2d:72:84",
          "signalStrength": "-75.0"
        },
        {
          "ssid": "Techni",
          "mac": "e6:cb:49:6c:86:7f",
          "signalStrength": "-89.0"
        },
        {
          "ssid": "Nuh uh >:(",
          "mac": "16:40:34:a3:2d:b4",
          "signalStrength": "-62.0"
        },
        {
          "ssid": "Redmi Note 11",
          "mac": "c6:24:0a:0b:78:d1",
          "signalStrength": "-64.0"
        },
        {
          "ssid": "V2043_21",
          "mac": "7e:8b:9c:ea:86:43",
          "signalStrength": "-63.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:a0",
          "signalStrength": "-65.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:b0",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "TECNO SPARK 5 Pro",
          "mac": "72:f8:22:7f:3a:9a",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "Huawei ",
          "mac": "8a:29:c5:1f:8a:72",
          "signalStrength": "-56.0"
        },
        {
          "ssid": "Hassan's 4A5G",
          "mac": "6a:cd:f2:18:01:d6",
          "signalStrength": "-83.0"
        },
        {
          "ssid": "Infinix NOTE 7",
          "mac": "f2:34:27:15:b5:7c",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-65.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:20",
          "signalStrength": "-67.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:4b:90",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "realme C25Y1",
          "mac": "32:da:7c:18:0d:ef",
          "signalStrength": "-85.0"
        }
      ]
    },
    {
      "location": "CSIT Exit",
      "signals": [
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:4b:50",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "Ok",
          "mac": "be:81:51:ea:0a:cf",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:30",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:20",
          "signalStrength": "-63.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:10",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "DIRECT-37-HP M402 LaserJet",
          "mac": "da:0f:99:07:4b:37",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "realme C35",
          "mac": "6e:e3:dd:87:b3:17",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "Ubaidullah",
          "mac": "ca:61:ec:d2:4b:a8",
          "signalStrength": "-65.0"
        },
        {
          "ssid": "Sabih S",
          "mac": "c6:d0:57:51:59:92",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "Infinix NOTE 10",
          "mac": "76:83:7f:55:23:c1",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:90",
          "signalStrength": "-55.0"
        },
        {
          "ssid": "Lazy's Pixel ",
          "mac": "82:76:50:71:a5:14",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:80",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:b0",
          "signalStrength": "-50.0"
        },
        {
          "ssid": "No connection",
          "mac": "76:92:ef:c8:35:4d",
          "signalStrength": "-67.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:c0",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "raafay’s iPhone",
          "mac": "ae:cd:40:1f:79:94",
          "signalStrength": "-68.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:d0",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "SNL-CHASEUP",
          "mac": "00:19:3b:24:83:0d",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:c8:70",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:3e:d0",
          "signalStrength": "-83.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-93.0"
        }
      ]
    },
    {
      "location": "CSIT Lab Exit",
      "signals": [
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:4b:50",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "Ok",
          "mac": "be:81:51:ea:0a:cf",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:30",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:20",
          "signalStrength": "-63.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:10",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "DIRECT-37-HP M402 LaserJet",
          "mac": "da:0f:99:07:4b:37",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "realme C35",
          "mac": "6e:e3:dd:87:b3:17",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "Ubaidullah",
          "mac": "ca:61:ec:d2:4b:a8",
          "signalStrength": "-65.0"
        },
        {
          "ssid": "Sabih S",
          "mac": "c6:d0:57:51:59:92",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "Infinix NOTE 10",
          "mac": "76:83:7f:55:23:c1",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:90",
          "signalStrength": "-55.0"
        },
        {
          "ssid": "Lazy's Pixel ",
          "mac": "82:76:50:71:a5:14",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:80",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:25:b0",
          "signalStrength": "-50.0"
        },
        {
          "ssid": "No connection",
          "mac": "76:92:ef:c8:35:4d",
          "signalStrength": "-67.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:c0",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "raafay’s iPhone",
          "mac": "ae:cd:40:1f:79:94",
          "signalStrength": "-68.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:d0",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "SNL-CHASEUP",
          "mac": "00:19:3b:24:83:0d",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:c8:70",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:2c:50",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:3e:d0",
          "signalStrength": "-83.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:10",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-93.0"
        }
      ]
    },
    {
      "location": "CSIT Lab Entrance",
      "signals": [
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:10",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "Sabih S",
          "mac": "c6:d0:57:51:59:92",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:90",
          "signalStrength": "-88.0"
        },
        {
          "ssid": "V2043_21",
          "mac": "7e:8b:9c:ea:86:43",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "No connection",
          "mac": "76:92:ef:c8:35:4d",
          "signalStrength": "-75.0"
        },
        {
          "ssid": "eggyolk",
          "mac": "86:7d:25:09:2a:b1",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "SNL-CHASEUP",
          "mac": "00:19:3b:24:83:0d",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:10",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:60",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "vivo Y83",
          "mac": "96:63:72:4c:64:6f",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:30",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:3e:c0",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:00",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "DIRECT-77-HP M277 LaserJet",
          "mac": "aa:6b:ad:58:47:77",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "Muhammad's Galaxy S10+",
          "mac": "fa:a2:9b:c5:d8:03",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "DESKTOP-FRL9JG6 3516",
          "mac": "d2:df:9a:8d:3e:62",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eduroam",
          "mac": "48:8e:ef:6f:f9:a0",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "Lazy's Pixel ",
          "mac": "82:76:50:71:a5:14",
          "signalStrength": "-92.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:2c:50",
          "signalStrength": "-97.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:00",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:70",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:3e:d0",
          "signalStrength": "-93.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:20",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:50",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "Vivo V40",
          "mac": "5e:05:ad:cf:4f:3b",
          "signalStrength": "-96.0"
        }
      ]
    },
    {
      "location": "CSIT Lab 2",
      "signals": [
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:10",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "Sabih S",
          "mac": "c6:d0:57:51:59:92",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:90",
          "signalStrength": "-88.0"
        },
        {
          "ssid": "V2043_21",
          "mac": "7e:8b:9c:ea:86:43",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "No connection",
          "mac": "76:92:ef:c8:35:4d",
          "signalStrength": "-75.0"
        },
        {
          "ssid": "eggyolk",
          "mac": "86:7d:25:09:2a:b1",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "SNL-CHASEUP",
          "mac": "00:19:3b:24:83:0d",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:10",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:60",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "vivo Y83",
          "mac": "96:63:72:4c:64:6f",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:30",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:3e:c0",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:00",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "DIRECT-77-HP M277 LaserJet",
          "mac": "aa:6b:ad:58:47:77",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "Muhammad's Galaxy S10+",
          "mac": "fa:a2:9b:c5:d8:03",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "DESKTOP-FRL9JG6 3516",
          "mac": "d2:df:9a:8d:3e:62",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eduroam",
          "mac": "48:8e:ef:6f:f9:a0",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "Lazy's Pixel ",
          "mac": "82:76:50:71:a5:14",
          "signalStrength": "-92.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:2c:50",
          "signalStrength": "-97.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:00",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:70",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:3e:d0",
          "signalStrength": "-93.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:20",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:50",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "Vivo V40",
          "mac": "5e:05:ad:cf:4f:3b",
          "signalStrength": "-96.0"
        }
      ]
    },
    {
      "location": "CSIT Lab 3",
      "signals": [
        {
          "ssid": "realme C35",
          "mac": "6e:e3:dd:87:b3:17",
          "signalStrength": "-91.0"
        },
        {
          "ssid": "@MuhammadAli",
          "mac": "52:c8:28:e8:53:4e",
          "signalStrength": "-88.0"
        },
        {
          "ssid": "realme C53",
          "mac": "02:23:e6:68:70:31",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "Galaxy A13A5D6",
          "mac": "2e:45:24:88:3c:6d",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "OPPO A54",
          "mac": "22:b3:e3:86:33:89",
          "signalStrength": "-84.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:f0",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "Muhammad's Galaxy S10+",
          "mac": "fa:a2:9b:c5:d8:03",
          "signalStrength": "-91.0"
        },
        {
          "ssid": "DESKTOP-FRL9JG6 3516",
          "mac": "d2:df:9a:8d:3e:62",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:90",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "HUAWEI P40 lite",
          "mac": "12:d3:08:34:51:7d",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "No connection",
          "mac": "76:92:ef:c8:35:4d",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:c0",
          "signalStrength": "-77.0"
        },
        {
          "ssid": "eggyolk",
          "mac": "86:7d:25:09:2a:b1",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:70",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:50",
          "signalStrength": "-90.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:20",
          "signalStrength": "-71.0"
        },
        {
          "ssid": "Redmi 12C",
          "mac": "ae:4f:93:63:b6:24",
          "signalStrength": "-78.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:60",
          "signalStrength": "-62.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:30",
          "signalStrength": "-75.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:4b:90",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:40",
          "signalStrength": "-76.0"
        }
      ]
    },
    {
      "location": "CSIT Lab 4",
      "signals": [
        {
          "ssid": "realme C35",
          "mac": "6e:e3:dd:87:b3:17",
          "signalStrength": "-91.0"
        },
        {
          "ssid": "@MuhammadAli",
          "mac": "52:c8:28:e8:53:4e",
          "signalStrength": "-88.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:b0",
          "signalStrength": "-57.0"
        },
        {
          "ssid": "realme C53",
          "mac": "02:23:e6:68:70:31",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "Galaxy A13A5D6",
          "mac": "2e:45:24:88:3c:6d",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "OPPO A54",
          "mac": "22:b3:e3:86:33:89",
          "signalStrength": "-84.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:f0",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "Muhammad's Galaxy S10+",
          "mac": "fa:a2:9b:c5:d8:03",
          "signalStrength": "-91.0"
        },
        {
          "ssid": "DESKTOP-FRL9JG6 3516",
          "mac": "d2:df:9a:8d:3e:62",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:90",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "HUAWEI P40 lite",
          "mac": "12:d3:08:34:51:7d",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "No connection",
          "mac": "76:92:ef:c8:35:4d",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:c0",
          "signalStrength": "-77.0"
        },
        {
          "ssid": "Redmi 9",
          "mac": "fe:5f:35:f9:5f:8c",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eggyolk",
          "mac": "86:7d:25:09:2a:b1",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:70",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:50",
          "signalStrength": "-90.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:20",
          "signalStrength": "-71.0"
        },
        {
          "ssid": "Redmi 12C",
          "mac": "ae:4f:93:63:b6:24",
          "signalStrength": "-78.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:60",
          "signalStrength": "-62.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:30",
          "signalStrength": "-75.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:4b:90",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:40",
          "signalStrength": "-76.0"
        }
      ]
    },
    {
      "location": "CSIT Entrance",
      "signals": [
        {
          "ssid": "Ok",
          "mac": "be:81:51:ea:0a:cf",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:30",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:00:20",
          "signalStrength": "-63.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:f6:10",
          "signalStrength": "-93.0"
        },
        {
          "ssid": "DIRECT-37-HP M402 LaserJet",
          "mac": "da:0f:99:07:4b:37",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "realme C35",
          "mac": "6e:e3:dd:87:b3:17",
          "signalStrength": "-73.0"
        },
        {
          "ssid": "Ubaidullah",
          "mac": "ca:61:ec:d2:4b:a8",
          "signalStrength": "-65.0"
        },
        {
          "ssid": "Sabih S",
          "mac": "c6:d0:57:51:59:92",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "Infinix NOTE 10",
          "mac": "76:83:7f:55:23:c1",
          "signalStrength": "-74.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:90",
          "signalStrength": "-55.0"
        },
        {
          "ssid": "Lazy's Pixel ",
          "mac": "82:76:50:71:a5:14",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:80",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "No connection",
          "mac": "76:92:ef:c8:35:4d",
          "signalStrength": "-67.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:c0",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "raafay’s iPhone",
          "mac": "ae:cd:40:1f:79:94",
          "signalStrength": "-68.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:d0",
          "signalStrength": "-90.0"
        },
        {
          "ssid": "SNL-CHASEUP",
          "mac": "00:19:3b:24:83:0d",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c5:c8:30",
          "signalStrength": "-93.0"
        }
      ]
    },
    {
      "location": "CSIT Project Lab",
      "signals": [
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:a0",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "@MuhammadAli",
          "mac": "52:c8:28:e8:53:4e",
          "signalStrength": "-88.0"
        },
        {
          "ssid": "Galaxy A13A5D6",
          "mac": "2e:45:24:88:3c:6d",
          "signalStrength": "-75.0"
        },
        {
          "ssid": "OPPO A54",
          "mac": "22:b3:e3:86:33:89",
          "signalStrength": "-84.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:29:90",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "Tecno ",
          "mac": "ca:41:3a:60:e2:2c",
          "signalStrength": "-86.0"
        },
        {
          "ssid": "HUAWEI P40 lite",
          "mac": "12:d3:08:34:51:7d",
          "signalStrength": "-94.0"
        },
        {
          "ssid": "No connection",
          "mac": "76:92:ef:c8:35:4d",
          "signalStrength": "-87.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:01:c0",
          "signalStrength": "-77.0"
        },
        {
          "ssid": "eggyolk",
          "mac": "86:7d:25:09:2a:b1",
          "signalStrength": "-81.0"
        },
        {
          "ssid": "Redmi 12C",
          "mac": "ae:4f:93:63:b6:24",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:60",
          "signalStrength": "-62.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:30",
          "signalStrength": "-75.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:40",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "V2038",
          "mac": "86:e2:a0:8c:34:4b",
          "signalStrength": "-67.0"
        },
        {
          "ssid": "realme C35",
          "mac": "6e:e3:dd:87:b3:17",
          "signalStrength": "-91.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:b0",
          "signalStrength": "-68.0"
        },
        {
          "ssid": "realme C53",
          "mac": "02:23:e6:68:70:31",
          "signalStrength": "-79.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:f0",
          "signalStrength": "-85.0"
        },
        {
          "ssid": "Muhammad's Galaxy S10+",
          "mac": "fa:a2:9b:c5:d8:03",
          "signalStrength": "-91.0"
        },
        {
          "ssid": "DESKTOP-FRL9JG6 3516",
          "mac": "d2:df:9a:8d:3e:62",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "OPPO A54",
          "mac": "7a:1e:ae:c3:6e:55",
          "signalStrength": "-96.0"
        },
        {
          "ssid": "Redmi 9",
          "mac": "fe:5f:35:f9:5f:8c",
          "signalStrength": "-93.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:70",
          "signalStrength": "-70.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:00",
          "signalStrength": "-72.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:49:50",
          "signalStrength": "-90.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:20",
          "signalStrength": "-71.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:4b:90",
          "signalStrength": "-94.0"
        }
      ]
    },
    {
      "location": "CSIT Lab 5",
      "signals": [
        {
          "ssid": "Aisha ka huawei",
          "mac": "38:47:bc:40:2e:e1",
          "signalStrength": "-92.0"
        },
        {
          "ssid": "V2038",
          "mac": "86:e2:a0:8c:34:4b",
          "signalStrength": "-48.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:a0",
          "signalStrength": "-76.0"
        },
        {
          "ssid": "Galaxy A03",
          "mac": "aa:d5:fa:7e:e5:ec",
          "signalStrength": "-63.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:b0",
          "signalStrength": "-84.0"
        },
        {
          "ssid": "realme C53",
          "mac": "02:23:e6:68:70:31",
          "signalStrength": "-66.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:e0",
          "signalStrength": "-91.0"
        },
        {
          "ssid": "OPPO A54",
          "mac": "22:b3:e3:86:33:89",
          "signalStrength": "-95.0"
        },
        {
          "ssid": "DIRECT-77-HP M277 LaserJet",
          "mac": "aa:6b:ad:58:47:77",
          "signalStrength": "-67.0"
        },
        {
          "ssid": "DESKTOP-FRL9JG6 3516",
          "mac": "d2:df:9a:8d:3e:62",
          "signalStrength": "-77.0"
        },
        {
          "ssid": "Tenda_09D8D8",
          "mac": "b0:df:c1:09:d8:d8",
          "signalStrength": "-59.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:00",
          "signalStrength": "-46.0"
        },
        {
          "ssid": "eduroam",
          "mac": "04:b0:e7:c6:3e:d0",
          "signalStrength": "-83.0"
        },
        {
          "ssid": "eduroam",
          "mac": "84:a9:c4:8c:78:10",
          "signalStrength": "-49.0"
        },
        {
          "ssid": "Wanna Cry",
          "mac": "7a:2e:0a:c6:e0:d2",
          "signalStrength": "-68.0"
        },
        {
          "ssid": "hmy",
          "mac": "86:6d:66:24:d2:fa",
          "signalStrength": "-97.0"
        }
      ]
    }
  ];
  
  export default wifiData;