import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class citiesService {
  
  constructor(private http: HttpClient) { }

cities= 
{
    "city": [
      {
        "id": "1",
        "city": "Aïn Harrouda",
        "region": "6"
      },
      {
        "id": "2",
        "city": "Ben Yakhlef",
        "region": "6"
      },
      {
        "id": "3",
        "city": "Bouskoura",
        "region": "6"
      },
      {
        "id": "4",
        "city": "Casablanca",
        "region": "6"
      },
      {
        "id": "5",
        "city": "Médiouna",
        "region": "6"
      },
      {
        "id": "6",
        "city": "Mohammadia",
        "region": "6"
      },
      {
        "id": "7",
        "city": "Tit Mellil",
        "region": "6"
      },
      {
        "id": "8",
        "city": "Ben Yakhlef",
        "region": "6"
      },
      {
        "id": "9",
        "city": "Bejaâd",
        "region": "5"
      },
      {
        "id": "10",
        "city": "Ben Ahmed",
        "region": "6"
      },
      {
        "id": "11",
        "city": "Benslimane",
        "region": "6"
      },
      {
        "id": "12",
        "city": "Berrechid",
        "region": "6"
      },
      {
        "id": "13",
        "city": "Boujniba",
        "region": "5"
      },
      {
        "id": "14",
        "city": "Boulanouare",
        "region": "5"
      },
      {
        "id": "15",
        "city": "Bouznika",
        "region": "6"
      },
      {
        "id": "16",
        "city": "Deroua",
        "region": "6"
      },
      {
        "id": "17",
        "city": "El Borouj",
        "region": "6"
      },
      {
        "id": "18",
        "city": "El Gara",
        "region": "6"
      },
      {
        "id": "19",
        "city": "Guisser",
        "region": "6"
      },
      {
        "id": "20",
        "city": "Hattane",
        "region": "5"
      },
      {
        "id": "21",
        "city": "Khouribga",
        "region": "5"
      },
      {
        "id": "22",
        "city": "Loulad",
        "region": "6"
      },
      {
        "id": "23",
        "city": "Oued Zem",
        "region": "5"
      },
      {
        "id": "24",
        "city": "Oulad Abbou",
        "region": "6"
      },
      {
        "id": "25",
        "city": "Oulad H'Riz Sahel",
        "region": "6"
      },
      {
        "id": "26",
        "city": "Oulad M'rah",
        "region": "6"
      },
      {
        "id": "27",
        "city": "Oulad Saïd",
        "region": "6"
      },
      {
        "id": "28",
        "city": "Oulad Sidi Ben Daoud",
        "region": "6"
      },
      {
        "id": "29",
        "city": "Ras El Aïn",
        "region": "6"
      },
      {
        "id": "30",
        "city": "Settat",
        "region": "6"
      },
      {
        "id": "31",
        "city": "Sidi Rahhal Chataï",
        "region": "6"
      },
      {
        "id": "32",
        "city": "Soualem",
        "region": "6"
      },
      {
        "id": "33",
        "city": "Azemmour",
        "region": "6"
      },
      {
        "id": "34",
        "city": "Bir Jdid",
        "region": "6"
      },
      {
        "id": "35",
        "city": "Bouguedra",
        "region": "7"
      },
      {
        "id": "36",
        "city": "Echemmaia",
        "region": "7"
      },
      {
        "id": "37",
        "city": "El Jadida",
        "region": "6"
      },
      {
        "id": "38",
        "city": "Hrara",
        "region": "7"
      },
      {
        "id": "39",
        "city": "Ighoud",
        "region": "7"
      },
      {
        "id": "40",
        "city": "Jamâat Shaim",
        "region": "7"
      },
      {
        "id": "41",
        "city": "Jorf Lasfar",
        "region": "6"
      },
      {
        "id": "42",
        "city": "Khemis Zemamra",
        "region": "6"
      },
      {
        "id": "43",
        "city": "Laaounate",
        "region": "6"
      },
      {
        "id": "44",
        "city": "Moulay Abdallah",
        "region": "6"
      },
      {
        "id": "45",
        "city": "Oualidia",
        "region": "6"
      },
      {
        "id": "46",
        "city": "Oulad Amrane",
        "region": "6"
      },
      {
        "id": "47",
        "city": "Oulad Frej",
        "region": "6"
      },
      {
        "id": "48",
        "city": "Oulad Ghadbane",
        "region": "6"
      },
      {
        "id": "49",
        "city": "Safi",
        "region": "7"
      },
      {
        "id": "50",
        "city": "Sebt El Maârif",
        "region": "6"
      },
      {
        "id": "51",
        "city": "Sebt Gzoula",
        "region": "7"
      },
      {
        "id": "52",
        "city": "Sidi Ahmed",
        "region": "7"
      },
      {
        "id": "53",
        "city": "Sidi Ali Ban Hamdouche",
        "region": "6"
      },
      {
        "id": "54",
        "city": "Sidi Bennour",
        "region": "6"
      },
      {
        "id": "55",
        "city": "Sidi Bouzid",
        "region": "6"
      },
      {
        "id": "56",
        "city": "Sidi Smaïl",
        "region": "6"
      },
      {
        "id": "57",
        "city": "Youssoufia",
        "region": "7"
      },
      {
        "id": "58",
        "city": "Fès",
        "region": "3"
      },
      {
        "id": "59",
        "city": "Aïn Cheggag",
        "region": "3"
      },
      {
        "id": "60",
        "city": "Bhalil",
        "region": "3"
      },
      {
        "id": "61",
        "city": "Boulemane",
        "region": "3"
      },
      {
        "id": "62",
        "city": "El Menzel",
        "region": "3"
      },
      {
        "id": "63",
        "city": "Guigou",
        "region": "3"
      },
      {
        "id": "64",
        "city": "Imouzzer Kandar",
        "region": "3"
      },
      {
        "id": "65",
        "city": "Imouzzer Marmoucha",
        "region": "3"
      },
      {
        "id": "66",
        "city": "Missour",
        "region": "3"
      },
      {
        "id": "67",
        "city": "Moulay Yaâcoub",
        "region": "3"
      },
      {
        "id": "68",
        "city": "Ouled Tayeb",
        "region": "3"
      },
      {
        "id": "69",
        "city": "Outat El Haj",
        "region": "3"
      },
      {
        "id": "70",
        "city": "Ribate El Kheir",
        "region": "3"
      },
      {
        "id": "71",
        "city": "Séfrou",
        "region": "3"
      },
      {
        "id": "72",
        "city": "Skhinate",
        "region": "3"
      },
      {
        "id": "73",
        "city": "Tafajight",
        "region": "3"
      },
      {
        "id": "74",
        "city": "Arbaoua",
        "region": "4"
      },
      {
        "id": "75",
        "city": "Aïn Dorij",
        "region": "1"
      },
      {
        "id": "76",
        "city": "Dar Gueddari",
        "region": "4"
      },
      {
        "id": "77",
        "city": "Had Kourt",
        "region": "4"
      },
      {
        "id": "78",
        "city": "Jorf El Melha",
        "region": "4"
      },
      {
        "id": "79",
        "city": "Kénitra",
        "region": "4"
      },
      {
        "id": "80",
        "city": "Khenichet",
        "region": "4"
      },
      {
        "id": "81",
        "city": "Lalla Mimouna",
        "region": "4"
      },
      {
        "id": "82",
        "city": "Mechra Bel Ksiri",
        "region": "4"
      },
      {
        "id": "83",
        "city": "Mehdia",
        "region": "4"
      },
      {
        "id": "84",
        "city": "Moulay Bousselham",
        "region": "4"
      },
      {
        "id": "85",
        "city": "Sidi Allal Tazi",
        "region": "4"
      },
      {
        "id": "86",
        "city": "Sidi Kacem",
        "region": "4"
      },
      {
        "id": "87",
        "city": "Sidi Slimane",
        "region": "4"
      },
      {
        "id": "88",
        "city": "Sidi Taibi",
        "region": "4"
      },
      {
        "id": "89",
        "city": "Sidi Yahya El Gharb",
        "region": "4"
      },
      {
        "id": "90",
        "city": "Souk El Arbaa",
        "region": "4"
      },
      {
        "id": "91",
        "city": "Akka",
        "region": "9"
      },
      {
        "id": "92",
        "city": "Assa",
        "region": "10"
      },
      {
        "id": "93",
        "city": "Bouizakarne",
        "region": "10"
      },
      {
        "id": "94",
        "city": "El Ouatia",
        "region": "10"
      },
      {
        "id": "95",
        "city": "Es-Semara",
        "region": "11"
      },
      {
        "id": "96",
        "city": "Fam El Hisn",
        "region": "9"
      },
      {
        "id": "97",
        "city": "Foum Zguid",
        "region": "9"
      },
      {
        "id": "98",
        "city": "Guelmim",
        "region": "10"
      },
      {
        "id": "99",
        "city": "Taghjijt",
        "region": "10"
      },
      {
        "id": "100",
        "city": "Tan-Tan",
        "region": "10"
      },
      {
        "id": "101",
        "city": "Tata",
        "region": "9"
      },
      {
        "id": "102",
        "city": "Zag",
        "region": "10"
      },
      {
        "id": "103",
        "city": "Marrakech",
        "region": "7"
      },
      {
        "id": "104",
        "city": "Ait Daoud",
        "region": "7"
      },
      {
        "id": "115",
        "city": "Amizmiz",
        "region": "7"
      },
      {
        "id": "116",
        "city": "Assahrij",
        "region": "7"
      },
      {
        "id": "117",
        "city": "Aït Ourir",
        "region": "7"
      },
      {
        "id": "118",
        "city": "Ben Guerir",
        "region": "7"
      },
      {
        "id": "119",
        "city": "Chichaoua",
        "region": "7"
      },
      {
        "id": "120",
        "city": "El Hanchane",
        "region": "7"
      },
      {
        "id": "121",
        "city": "El Kelaâ des Sraghna",
        "region": "7"
      },
      {
        "id": "122",
        "city": "Essaouira",
        "region": "7"
      },
      {
        "id": "123",
        "city": "Fraïta",
        "region": "7"
      },
      {
        "id": "124",
        "city": "Ghmate",
        "region": "7"
      },
      {
        "id": "125",
        "city": "Ighounane",
        "region": "8"
      },
      {
        "id": "126",
        "city": "Imintanoute",
        "region": "7"
      },
      {
        "id": "127",
        "city": "Kattara",
        "region": "7"
      },
      {
        "id": "128",
        "city": "Lalla Takerkoust",
        "region": "7"
      },
      {
        "id": "129",
        "city": "Loudaya",
        "region": "7"
      },
      {
        "id": "130",
        "city": "Lâattaouia",
        "region": "7"
      },
      {
        "id": "131",
        "city": "Moulay Brahim",
        "region": "7"
      },
      {
        "id": "132",
        "city": "Mzouda",
        "region": "7"
      },
      {
        "id": "133",
        "city": "Ounagha",
        "region": "7"
      },
      {
        "id": "134",
        "city": "Sid L'Mokhtar",
        "region": "7"
      },
      {
        "id": "135",
        "city": "Sid Zouin",
        "region": "7"
      },
      {
        "id": "136",
        "city": "Sidi Abdallah Ghiat",
        "region": "7"
      },
      {
        "id": "137",
        "city": "Sidi Bou Othmane",
        "region": "7"
      },
      {
        "id": "138",
        "city": "Sidi Rahhal",
        "region": "7"
      },
      {
        "id": "139",
        "city": "Skhour Rehamna",
        "region": "7"
      },
      {
        "id": "140",
        "city": "Smimou",
        "region": "7"
      },
      {
        "id": "141",
        "city": "Tafetachte",
        "region": "7"
      },
      {
        "id": "142",
        "city": "Tahannaout",
        "region": "7"
      },
      {
        "id": "143",
        "city": "Talmest",
        "region": "7"
      },
      {
        "id": "144",
        "city": "Tamallalt",
        "region": "7"
      },
      {
        "id": "145",
        "city": "Tamanar",
        "region": "7"
      },
      {
        "id": "146",
        "city": "Tamansourt",
        "region": "7"
      },
      {
        "id": "147",
        "city": "Tameslouht",
        "region": "7"
      },
      {
        "id": "148",
        "city": "Tanalt",
        "region": "9"
      },
      {
        "id": "149",
        "city": "Zeubelemok",
        "region": "7"
      },
      {
        "id": "150",
        "city": "Meknès‎",
        "region": "3"
      },
      {
        "id": "151",
        "city": "Khénifra",
        "region": "5"
      },
      {
        "id": "152",
        "city": "Agourai",
        "region": "3"
      },
      {
        "id": "153",
        "city": "Ain Taoujdate",
        "region": "3"
      },
      {
        "id": "154",
        "city": "MyAliCherif",
        "region": "8"
      },
      {
        "id": "155",
        "city": "Rissani",
        "region": "8"
      },
      {
        "id": "156",
        "city": "Amalou Ighriben",
        "region": "5"
      },
      {
        "id": "157",
        "city": "Aoufous",
        "region": "8"
      },
      {
        "id": "158",
        "city": "Arfoud",
        "region": "8"
      },
      {
        "id": "159",
        "city": "Azrou",
        "region": "3"
      },
      {
        "id": "160",
        "city": "Aïn Jemaa",
        "region": "3"
      },
      {
        "id": "161",
        "city": "Aïn Karma",
        "region": "3"
      },
      {
        "id": "162",
        "city": "Aïn Leuh",
        "region": "3"
      },
      {
        "id": "163",
        "city": "Aït Boubidmane",
        "region": "3"
      },
      {
        "id": "164",
        "city": "Aït Ishaq",
        "region": "5"
      },
      {
        "id": "165",
        "city": "Boudnib",
        "region": "8"
      },
      {
        "id": "166",
        "city": "Boufakrane",
        "region": "3"
      },
      {
        "id": "167",
        "city": "Boumia",
        "region": "8"
      },
      {
        "id": "168",
        "city": "El Hajeb",
        "region": "3"
      },
      {
        "id": "169",
        "city": "Elkbab",
        "region": "5"
      },
      {
        "id": "170",
        "city": "Er-Rich",
        "region": "5"
      },
      {
        "id": "171",
        "city": "Errachidia",
        "region": "8"
      },
      {
        "id": "172",
        "city": "Gardmit",
        "region": "8"
      },
      {
        "id": "173",
        "city": "Goulmima",
        "region": "8"
      },
      {
        "id": "174",
        "city": "Gourrama",
        "region": "8"
      },
      {
        "id": "175",
        "city": "Had Bouhssoussen",
        "region": "5"
      },
      {
        "id": "176",
        "city": "Haj Kaddour",
        "region": "3"
      },
      {
        "id": "177",
        "city": "Ifrane",
        "region": "3"
      },
      {
        "id": "178",
        "city": "Itzer",
        "region": "8"
      },
      {
        "id": "179",
        "city": "Jorf",
        "region": "8"
      },
      {
        "id": "180",
        "city": "Kehf Nsour",
        "region": "5"
      },
      {
        "id": "181",
        "city": "Kerrouchen",
        "region": "5"
      },
      {
        "id": "182",
        "city": "M'haya",
        "region": "3"
      },
      {
        "id": "183",
        "city": "M'rirt",
        "region": "5"
      },
      {
        "id": "184",
        "city": "Midelt",
        "region": "8"
      },
      {
        "id": "185",
        "city": "Moulay Ali Cherif",
        "region": "8"
      },
      {
        "id": "186",
        "city": "Moulay Bouazza",
        "region": "5"
      },
      {
        "id": "187",
        "city": "Moulay Idriss Zerhoun",
        "region": "3"
      },
      {
        "id": "188",
        "city": "Moussaoua",
        "region": "3"
      },
      {
        "id": "189",
        "city": "N'Zalat Bni Amar",
        "region": "3"
      },
      {
        "id": "190",
        "city": "Ouaoumana",
        "region": "5"
      },
      {
        "id": "191",
        "city": "Oued Ifrane",
        "region": "3"
      },
      {
        "id": "192",
        "city": "Sabaa Aiyoun",
        "region": "3"
      },
      {
        "id": "193",
        "city": "Sebt Jahjouh",
        "region": "3"
      },
      {
        "id": "194",
        "city": "Sidi Addi",
        "region": "3"
      },
      {
        "id": "195",
        "city": "Tichoute",
        "region": "8"
      },
      {
        "id": "196",
        "city": "Tighassaline",
        "region": "5"
      },
      {
        "id": "197",
        "city": "Tighza",
        "region": "5"
      },
      {
        "id": "198",
        "city": "Timahdite",
        "region": "3"
      },
      {
        "id": "199",
        "city": "Tinejdad",
        "region": "8"
      },
      {
        "id": "200",
        "city": "Tizguite",
        "region": "3"
      },
      {
        "id": "201",
        "city": "Toulal",
        "region": "3"
      },
      {
        "id": "202",
        "city": "Tounfite",
        "region": "8"
      },
      {
        "id": "203",
        "city": "Zaouia d'Ifrane",
        "region": "3"
      },
      {
        "id": "204",
        "city": "Zaïda",
        "region": "8"
      },
      {
        "id": "205",
        "city": "Ahfir",
        "region": "2"
      },
      {
        "id": "206",
        "city": "Aklim",
        "region": "2"
      },
      {
        "id": "207",
        "city": "Al Aroui",
        "region": "2"
      },
      {
        "id": "208",
        "city": "Aïn Bni Mathar",
        "region": "2"
      },
      {
        "id": "209",
        "city": "Aïn Erreggada",
        "region": "2"
      },
      {
        "id": "210",
        "city": "Ben Taïeb",
        "region": "2"
      },
      {
        "id": "211",
        "city": "Berkane",
        "region": "2"
      },
      {
        "id": "212",
        "city": "Bni Ansar",
        "region": "2"
      },
      {
        "id": "213",
        "city": "Bni Chiker",
        "region": "2"
      },
      {
        "id": "214",
        "city": "Bni Drar",
        "region": "2"
      },
      {
        "id": "215",
        "city": "Bni Tadjite",
        "region": "2"
      },
      {
        "id": "216",
        "city": "Bouanane",
        "region": "2"
      },
      {
        "id": "217",
        "city": "Bouarfa",
        "region": "2"
      },
      {
        "id": "218",
        "city": "Bouhdila",
        "region": "2"
      },
      {
        "id": "219",
        "city": "Dar El Kebdani",
        "region": "2"
      },
      {
        "id": "220",
        "city": "Debdou",
        "region": "2"
      },
      {
        "id": "221",
        "city": "Douar Kannine",
        "region": "2"
      },
      {
        "id": "222",
        "city": "Driouch",
        "region": "2"
      },
      {
        "id": "223",
        "city": "El Aïoun Sidi Mellouk",
        "region": "2"
      },
      {
        "id": "224",
        "city": "Farkhana",
        "region": "2"
      },
      {
        "id": "225",
        "city": "Figuig",
        "region": "2"
      },
      {
        "id": "226",
        "city": "Ihddaden",
        "region": "2"
      },
      {
        "id": "227",
        "city": "Jaâdar",
        "region": "2"
      },
      {
        "id": "228",
        "city": "Jerada",
        "region": "2"
      },
      {
        "id": "229",
        "city": "Kariat Arekmane",
        "region": "2"
      },
      {
        "id": "230",
        "city": "Kassita",
        "region": "2"
      },
      {
        "id": "231",
        "city": "Kerouna",
        "region": "2"
      },
      {
        "id": "232",
        "city": "Laâtamna",
        "region": "2"
      },
      {
        "id": "233",
        "city": "Madagh",
        "region": "2"
      },
      {
        "id": "234",
        "city": "Midar",
        "region": "2"
      },
      {
        "id": "235",
        "city": "Nador",
        "region": "2"
      },
      {
        "id": "236",
        "city": "Naima",
        "region": "2"
      },
      {
        "id": "237",
        "city": "Oued Heimer",
        "region": "2"
      },
      {
        "id": "238",
        "city": "Oujda",
        "region": "2"
      },
      {
        "id": "239",
        "city": "Ras El Ma",
        "region": "2"
      },
      {
        "id": "240",
        "city": "Saïdia",
        "region": "2"
      },
      {
        "id": "241",
        "city": "Selouane",
        "region": "2"
      },
      {
        "id": "242",
        "city": "Sidi Boubker",
        "region": "2"
      },
      {
        "id": "243",
        "city": "Sidi Slimane Echcharaa",
        "region": "2"
      },
      {
        "id": "244",
        "city": "Talsint",
        "region": "2"
      },
      {
        "id": "245",
        "city": "Taourirt",
        "region": "2"
      },
      {
        "id": "246",
        "city": "Tendrara",
        "region": "2"
      },
      {
        "id": "247",
        "city": "Tiztoutine",
        "region": "2"
      },
      {
        "id": "248",
        "city": "Touima",
        "region": "2"
      },
      {
        "id": "249",
        "city": "Touissit",
        "region": "2"
      },
      {
        "id": "250",
        "city": "Zaïo",
        "region": "2"
      },
      {
        "id": "251",
        "city": "Zeghanghane",
        "region": "2"
      },
      {
        "id": "252",
        "city": "Rabat",
        "region": "4"
      },
      {
        "id": "253",
        "city": "Salé",
        "region": "4"
      },
      {
        "id": "254",
        "city": "Ain El Aouda",
        "region": "4"
      },
      {
        "id": "255",
        "city": "Harhoura",
        "region": "4"
      },
      {
        "id": "256",
        "city": "Khémisset",
        "region": "4"
      },
      {
        "id": "257",
        "city": "Oulmès",
        "region": "4"
      },
      {
        "id": "258",
        "city": "Rommani",
        "region": "4"
      },
      {
        "id": "259",
        "city": "Sidi Allal El Bahraoui",
        "region": "4"
      },
      {
        "id": "260",
        "city": "Sidi Bouknadel",
        "region": "4"
      },
      {
        "id": "261",
        "city": "Skhirate",
        "region": "4"
      },
      {
        "id": "262",
        "city": "Tamesna",
        "region": "4"
      },
      {
        "id": "263",
        "city": "Témara",
        "region": "4"
      },
      {
        "id": "264",
        "city": "Tiddas",
        "region": "4"
      },
      {
        "id": "265",
        "city": "Tiflet",
        "region": "4"
      },
      {
        "id": "266",
        "city": "Touarga",
        "region": "4"
      },
      {
        "id": "267",
        "city": "Agadir",
        "region": "9"
      },
      {
        "id": "268",
        "city": "Agdz",
        "region": "8"
      },
      {
        "id": "269",
        "city": "Agni Izimmer",
        "region": "9"
      },
      {
        "id": "270",
        "city": "Aït Melloul",
        "region": "9"
      },
      {
        "id": "271",
        "city": "Alnif",
        "region": "8"
      },
      {
        "id": "272",
        "city": "Anzi",
        "region": "9"
      },
      {
        "id": "273",
        "city": "Aoulouz",
        "region": "9"
      },
      {
        "id": "274",
        "city": "Aourir",
        "region": "9"
      },
      {
        "id": "275",
        "city": "Arazane",
        "region": "9"
      },
      {
        "id": "276",
        "city": "Aït Baha",
        "region": "9"
      },
      {
        "id": "277",
        "city": "Aït Iaâza",
        "region": "9"
      },
      {
        "id": "278",
        "city": "Aït Yalla",
        "region": "8"
      },
      {
        "id": "279",
        "city": "Ben Sergao",
        "region": "9"
      },
      {
        "id": "280",
        "city": "Biougra",
        "region": "9"
      },
      {
        "id": "281",
        "city": "Boumalne-Dadès",
        "region": "8"
      },
      {
        "id": "282",
        "city": "Dcheira El Jihadia",
        "region": "9"
      },
      {
        "id": "283",
        "city": "Drargua",
        "region": "9"
      },
      {
        "id": "284",
        "city": "El Guerdane",
        "region": "9"
      },
      {
        "id": "285",
        "city": "Harte Lyamine",
        "region": "8"
      },
      {
        "id": "286",
        "city": "Ida Ougnidif",
        "region": "9"
      },
      {
        "id": "287",
        "city": "Ifri",
        "region": "8"
      },
      {
        "id": "288",
        "city": "Igdamen",
        "region": "9"
      },
      {
        "id": "289",
        "city": "Ighil n'Oumgoun",
        "region": "8"
      },
      {
        "id": "290",
        "city": "Imassine",
        "region": "8"
      },
      {
        "id": "291",
        "city": "Inezgane",
        "region": "9"
      },
      {
        "id": "292",
        "city": "Irherm",
        "region": "9"
      },
      {
        "id": "293",
        "city": "Kelaat-M'Gouna",
        "region": "8"
      },
      {
        "id": "294",
        "city": "Lakhsas",
        "region": "9"
      },
      {
        "id": "295",
        "city": "Lakhsass",
        "region": "9"
      },
      {
        "id": "296",
        "city": "Lqliâa",
        "region": "9"
      },
      {
        "id": "297",
        "city": "M'semrir",
        "region": "8"
      },
      {
        "id": "298",
        "city": "Massa (Maroc)",
        "region": "9"
      },
      {
        "id": "299",
        "city": "Megousse",
        "region": "9"
      },
      {
        "id": "300",
        "city": "Ouarzazate",
        "region": "8"
      },
      {
        "id": "301",
        "city": "Oulad Berhil",
        "region": "9"
      },
      {
        "id": "302",
        "city": "Oulad Teïma",
        "region": "9"
      },
      {
        "id": "303",
        "city": "Sarghine",
        "region": "8"
      },
      {
        "id": "304",
        "city": "Sidi Ifni",
        "region": "10"
      },
      {
        "id": "305",
        "city": "Skoura",
        "region": "8"
      },
      {
        "id": "306",
        "city": "Tabounte",
        "region": "8"
      },
      {
        "id": "307",
        "city": "Tafraout",
        "region": "9"
      },
      {
        "id": "308",
        "city": "Taghzout",
        "region": "1"
      },
      {
        "id": "309",
        "city": "Tagzen",
        "region": "9"
      },
      {
        "id": "310",
        "city": "Taliouine",
        "region": "9"
      },
      {
        "id": "311",
        "city": "Tamegroute",
        "region": "8"
      },
      {
        "id": "312",
        "city": "Tamraght",
        "region": "9"
      },
      {
        "id": "313",
        "city": "Tanoumrite Nkob Zagora",
        "region": "8"
      },
      {
        "id": "314",
        "city": "Taourirt ait zaghar",
        "region": "8"
      },
      {
        "id": "315",
        "city": "Taroudannt",
        "region": "9"
      },
      {
        "id": "316",
        "city": "Temsia",
        "region": "9"
      },
      {
        "id": "317",
        "city": "Tifnit",
        "region": "9"
      },
      {
        "id": "318",
        "city": "Tisgdal",
        "region": "9"
      },
      {
        "id": "319",
        "city": "Tiznit",
        "region": "9"
      },
      {
        "id": "320",
        "city": "Toundoute",
        "region": "8"
      },
      {
        "id": "321",
        "city": "Zagora",
        "region": "8"
      },
      {
        "id": "322",
        "city": "Afourar",
        "region": "5"
      },
      {
        "id": "323",
        "city": "Aghbala",
        "region": "5"
      },
      {
        "id": "324",
        "city": "Azilal",
        "region": "5"
      },
      {
        "id": "325",
        "city": "Aït Majden",
        "region": "5"
      },
      {
        "id": "326",
        "city": "Beni Ayat",
        "region": "5"
      },
      {
        "id": "327",
        "city": "Béni Mellal",
        "region": "5"
      },
      {
        "id": "328",
        "city": "Bin elouidane",
        "region": "5"
      },
      {
        "id": "329",
        "city": "Bradia",
        "region": "5"
      },
      {
        "id": "330",
        "city": "Bzou",
        "region": "5"
      },
      {
        "id": "331",
        "city": "Dar Oulad Zidouh",
        "region": "5"
      },
      {
        "id": "332",
        "city": "Demnate",
        "region": "5"
      },
      {
        "id": "333",
        "city": "Dra'a",
        "region": "8"
      },
      {
        "id": "334",
        "city": "El Ksiba",
        "region": "5"
      },
      {
        "id": "335",
        "city": "Foum Jamaa",
        "region": "5"
      },
      {
        "id": "336",
        "city": "Fquih Ben Salah",
        "region": "5"
      },
      {
        "id": "337",
        "city": "Kasba Tadla",
        "region": "5"
      },
      {
        "id": "338",
        "city": "Ouaouizeght",
        "region": "5"
      },
      {
        "id": "339",
        "city": "Oulad Ayad",
        "region": "5"
      },
      {
        "id": "340",
        "city": "Oulad M'Barek",
        "region": "5"
      },
      {
        "id": "341",
        "city": "Oulad Yaich",
        "region": "5"
      },
      {
        "id": "342",
        "city": "Sidi Jaber",
        "region": "5"
      },
      {
        "id": "343",
        "city": "Souk Sebt Oulad Nemma",
        "region": "5"
      },
      {
        "id": "344",
        "city": "Zaouïat Cheikh",
        "region": "5"
      },
      {
        "id": "345",
        "city": "Tanger‎",
        "region": "1"
      },
      {
        "id": "346",
        "city": "Tétouan‎",
        "region": "1"
      },
      {
        "id": "347",
        "city": "Akchour",
        "region": "1"
      },
      {
        "id": "348",
        "city": "Assilah",
        "region": "1"
      },
      {
        "id": "349",
        "city": "Bab Berred",
        "region": "1"
      },
      {
        "id": "350",
        "city": "Bab Taza",
        "region": "1"
      },
      {
        "id": "351",
        "city": "Brikcha",
        "region": "1"
      },
      {
        "id": "352",
        "city": "Chefchaouen",
        "region": "1"
      },
      {
        "id": "353",
        "city": "Dar Bni Karrich",
        "region": "1"
      },
      {
        "id": "354",
        "city": "Dar Chaoui",
        "region": "1"
      },
      {
        "id": "355",
        "city": "Fnideq",
        "region": "1"
      },
      {
        "id": "356",
        "city": "Gueznaia",
        "region": "1"
      },
      {
        "id": "357",
        "city": "Jebha",
        "region": "1"
      },
      {
        "id": "358",
        "city": "Karia",
        "region": "3"
      },
      {
        "id": "359",
        "city": "Khémis Sahel",
        "region": "1"
      },
      {
        "id": "360",
        "city": "Ksar El Kébir",
        "region": "1"
      },
      {
        "id": "361",
        "city": "Larache",
        "region": "1"
      },
      {
        "id": "362",
        "city": "M'diq",
        "region": "1"
      },
      {
        "id": "363",
        "city": "Martil",
        "region": "1"
      },
      {
        "id": "364",
        "city": "Moqrisset",
        "region": "1"
      },
      {
        "id": "365",
        "city": "Oued Laou",
        "region": "1"
      },
      {
        "id": "366",
        "city": "Oued Rmel",
        "region": "1"
      },
      {
        "id": "367",
        "city": "Ouazzane",
        "region": "1"
      },
      {
        "id": "368",
        "city": "Point Cires",
        "region": "1"
      },
      {
        "id": "369",
        "city": "Sidi Lyamani",
        "region": "1"
      },
      {
        "id": "370",
        "city": "Sidi Mohamed ben Abdallah el-Raisuni",
        "region": "1"
      },
      {
        "id": "371",
        "city": "Zinat",
        "region": "1"
      },
      {
        "id": "372",
        "city": "Ajdir‎",
        "region": "1"
      },
      {
        "id": "373",
        "city": "Aknoul‎",
        "region": "3"
      },
      {
        "id": "374",
        "city": "Al Hoceïma‎",
        "region": "1"
      },
      {
        "id": "375",
        "city": "Aït Hichem‎",
        "region": "1"
      },
      {
        "id": "376",
        "city": "Bni Bouayach‎",
        "region": "1"
      },
      {
        "id": "377",
        "city": "Bni Hadifa‎",
        "region": "1"
      },
      {
        "id": "378",
        "city": "Ghafsai‎",
        "region": "3"
      },
      {
        "id": "379",
        "city": "Guercif‎",
        "region": "2"
      },
      {
        "id": "380",
        "city": "Imzouren‎",
        "region": "1"
      },
      {
        "id": "381",
        "city": "Inahnahen‎",
        "region": "1"
      },
      {
        "id": "382",
        "city": "Issaguen (Ketama)‎",
        "region": "1"
      },
      {
        "id": "383",
        "city": "Karia (El Jadida)‎",
        "region": "6"
      },
      {
        "id": "384",
        "city": "Karia Ba Mohamed‎",
        "region": "3"
      },
      {
        "id": "385",
        "city": "Oued Amlil‎",
        "region": "3"
      },
      {
        "id": "386",
        "city": "Oulad Zbair‎",
        "region": "3"
      },
      {
        "id": "387",
        "city": "Tahla‎",
        "region": "3"
      },
      {
        "id": "388",
        "city": "Tala Tazegwaght‎",
        "region": "1"
      },
      {
        "id": "389",
        "city": "Tamassint‎",
        "region": "1"
      },
      {
        "id": "390",
        "city": "Taounate‎",
        "region": "3"
      },
      {
        "id": "391",
        "city": "Targuist‎",
        "region": "1"
      },
      {
        "id": "392",
        "city": "Taza‎",
        "region": "3"
      },
      {
        "id": "393",
        "city": "Taïnaste‎",
        "region": "3"
      },
      {
        "id": "394",
        "city": "Thar Es-Souk‎",
        "region": "3"
      },
      {
        "id": "395",
        "city": "Tissa‎",
        "region": "3"
      },
      {
        "id": "396",
        "city": "Tizi Ouasli‎",
        "region": "3"
      },
      {
        "id": "397",
        "city": "Laayoune‎",
        "region": "11"
      },
      {
        "id": "398",
        "city": "El Marsa‎",
        "region": "11"
      },
      {
        "id": "399",
        "city": "Tarfaya‎",
        "region": "11"
      },
      {
        "id": "400",
        "city": "Boujdour‎",
        "region": "11"
      },
      {
        "id": "401",
        "city": "Awsard",
        "region": "12"
      },
      {
        "id": "402",
        "city": "Oued-Eddahab",
        "region": "12"
      },
      {
        "id": "403",
        "city": "Stehat",
        "region": "1"
      },
      {
        "id": "404",
        "city": "Aït Attab",
        "region": "5"
      }
    ]
  }

}