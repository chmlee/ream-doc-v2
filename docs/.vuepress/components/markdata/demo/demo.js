export default {
  string: `# Example
- string: value
- long string: Hello World
- quoted string: "quote"`,

  number: `# Example
- number 1: $1$
- number 2: $-2$
- number 3: $3.1415926$`,

  notNumber: `# Example
- number: $1$
- not number 1: a$2$
- not number 2: $3$b`,

  boolean: `# Example
- bool 1: \`TRUE\`
- bool 2: \`FALSE\`
- not bool 1: \`true\`
- not bool 2: FALSE `,

  list1: `# Example
- list of strings:
  * item 1
  * item 2
  * item 3
- list of numbers:
  * $1$
  * $-2$
  * $3.1415926$`,

  list2: `# Example
- list of strings:
* item 1
* item 2
* item 3`,

  list3: `# Example
- list of strings:
  * item 1

  * item 2
  * item 3`,

  annotation1: `# Example
- key 1: value
  > Annotation for string
- key 2: $1$
  > Annotation for number
- key 3: \`TRUE\`
  > Annotation for boolean`,

  annotation2: `# Example
- list:
  * value
    > Annotation for string
  * $1$
    > Annotation for number
  * \`TRUE\`
    > Annotation for boolean`,

  annotation3: `# Example
- key 1: value 1
- key 2: value 2
  > Annotation
- key 3: value 3

  > Valid annotation

- key 4: value 4`,

  entry1: `# Country
- name: Belgium
- capital: Brussels
- population: $11433256$
- euro zone: \`TRUE\``,

  entry2: `# Country
- name: Belgium
  > short for the Kingdom of Belgium
- capital: Brussels
- population: $11433256$
  > data from 2019; retrieved from World Bank
- euro zone: \`TRUE\`
  > joined in 1999`,

  entry3: `# Country
- name: Belgium

## Language
- name: Dutch

## Language
- name: French

## Language
- name: German`,

  entry4: `# Country
- name: Belgium

## Language
- name: Dutch
  > This is a Level 2 Entry

### Language
- name: French
  > This is a Level 3 Entry

### Language
- name: German
  > This is a Level 3 Entry`,

  entry5: `# Country
- name: Belgium

## Language
- name: Dutch
  > This is a Level 2 Entry

## Language
- name: French
  > This is a Level 2 Entry

### Language
- name: German
  > This is a Level 3 Entry`,

  entry6: `# Country
- name: Belgium

## City
- name: Brussels

## Language
- name: Dutch`,

  entry7: `# Country
- name: Belgium

## Language
- name: Dutch
- size: $0.59$

## Language
- size: $0.4$
- name: French

## Language
- name: German`,

  Country: '# Country',
  Home: `# Showcase
- string: Hello World
- number: $3.14159$
- boolean: \`TRUE\`
- list:
  * item 1
  * item 2
  * item 3
- annotation: see below
  > Annotate your variable here

## Child Entry
- name: child 1

## Child Entry
- name: child 2

### Grandchild Entry
- name: grandchild 1

### Grandchild Entry
- name: grandchild 2`,
  EuropeUnion: `# EU
- source: WorldBank

## Country
- name: Austria
- coastal: \`FALSE\`

### Year
- name: 2015
- gdp: $381817565893.574$
- pop: $8642699$

### Year
- name: 2016
- gdp: $395227684138.862$
- pop: $8736668$

### Year
- name: 2017
- gdp: $418316161095.683$
- pop: $8797566$

### Year
- name: 2018
- gdp: $455508255028.219$
- pop: $8840521$

### Year
- name: 2019
- gdp: $446314739528.47$
- pop: $8877067$



## Country
- name: Belgium
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $462149679343.822$
- pop: $11274196$

### Year
- name: 2016
- gdp: $475900865683.644$
- pop: $11331422$

### Year
- name: 2017
- gdp: $503788776542.824$
- pop: $11375158$

### Year
- name: 2018
- gdp: $542685915417.411$
- pop: $11427054$

### Year
- name: 2019
- gdp: $529606710418.038$
- pop: $11484055$



## Country
- name: Bulgaria
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $50630703922.0132$
- pop: $7177991$

### Year
- name: 2016
- gdp: $53785050339.3665$
- pop: $7127822$

### Year
- name: 2017
- gdp: $58950125036.0127$
- pop: $7075947$

### Year
- name: 2018
- gdp: $66200847917.924$
- pop: $7025037$

### Year
- name: 2019
- gdp: $67927179736.6915$
- pop: $6975761$



## Country
- name: Croatia
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $49530641704.2124$
- pop: $4203604$

### Year
- name: 2016
- gdp: $51596973258.8892$
- pop: $4174349$

### Year
- name: 2017
- gdp: $55319605060.5393$
- pop: $4124531$

### Year
- name: 2018
- gdp: $60991399904.4434$
- pop: $4087843$

### Year
- name: 2019
- gdp: $60415553038.8826$
- pop: $4067500$



## Country
- name: Cyprus
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $19779150116.4984$
- pop: $1160985$

### Year
- name: 2016
- gdp: $20890936462.2537$
- pop: $1170187$

### Year
- name: 2017
- gdp: $22638608224.1301$
- pop: $1179680$

### Year
- name: 2018
- gdp: $24961995748.701$
- pop: $1189265$

### Year
- name: 2019
- gdp: $24564647934.6244$
- pop: $1198575$



## Country
- name: Czechia
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $186829940545.759$
- pop: $10546059$

### Year
- name: 2016
- gdp: $195090272402.729$
- pop: $10566332$

### Year
- name: 2017
- gdp: $215913545038.43$
- pop: $10594438$

### Year
- name: 2018
- gdp: $244987409830.533$
- pop: $10629928$

### Year
- name: 2019
- gdp: $246489245494.882$
- pop: $10669709$



## Country
- name: Denmark
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $302673068765.972$
- pop: $5683483$

### Year
- name: 2016
- gdp: $313115929314.339$
- pop: $5728010$

### Year
- name: 2017
- gdp: $329417067127.817$
- pop: $5764980$

### Year
- name: 2018
- gdp: $355675329085.952$
- pop: $5793636$

### Year
- name: 2019
- gdp: $348078018463.905$
- pop: $5818553$



## Country
- name: Estonia
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $23048864242.6072$
- pop: $1315407$

### Year
- name: 2016
- gdp: $23996451497.6139$
- pop: $1315790$

### Year
- name: 2017
- gdp: $26859101053.8139$
- pop: $1317384$

### Year
- name: 2018
- gdp: $30747159197.8965$
- pop: $1321977$

### Year
- name: 2019
- gdp: $31386949981.236$
- pop: $1326590$



## Country
- name: Finland
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $234440080998.273$
- pop: $5479531$

### Year
- name: 2016
- gdp: $240607907010.383$
- pop: $5495303$

### Year
- name: 2017
- gdp: $255122545770.778$
- pop: $5508214$

### Year
- name: 2018
- gdp: $275893681355.892$
- pop: $5515525$

### Year
- name: 2019
- gdp: $268761201364.705$
- pop: $5520314$



## Country
- name: France
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $2438207896251.84$
- pop: $66548272$

### Year
- name: 2016
- gdp: $2471285607081.72$
- pop: $66724104$

### Year
- name: 2017
- gdp: $2595151045197.65$
- pop: $66864379$

### Year
- name: 2018
- gdp: $2787863958885.49$
- pop: $66965912$

### Year
- name: 2019
- gdp: $2715518274227.45$
- pop: $67059887$



## Country
- name: Germany

### Year
- name: 2015
- gdp: $3360549973888.58$
- pop: $81686611$

### Year
- name: 2016
- gdp: $3466790065011.83$
- pop: $82348669$

### Year
- name: 2017
- gdp: $3665804120835.3$
- pop: $82657002$

### Year
- name: 2018
- gdp: $3949548833952.94$
- pop: $82905782$

### Year
- name: 2019
- gdp: $3845630030823.52$
- pop: $83132799$



## Country
- name: Greece
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $196591353761.226$
- pop: $10820883$

### Year
- name: 2016
- gdp: $195222443512.937$
- pop: $10775971$

### Year
- name: 2017
- gdp: $203588424288.428$
- pop: $10754679$

### Year
- name: 2018
- gdp: $218138367444.99$
- pop: $10732882$

### Year
- name: 2019
- gdp: $209852761468.681$
- pop: $10716322$



## Country
- name: Hungary
- coastal: \`FALSE\`

### Year
- name: 2015
- gdp: $124529741437.176$
- pop: $9843028$

### Year
- name: 2016
- gdp: $127507473625.632$
- pop: $9814023$

### Year
- name: 2017
- gdp: $141510583019.556$
- pop: $9787966$

### Year
- name: 2018
- gdp: $157882912778.254$
- pop: $9775564$

### Year
- name: 2019
- gdp: $160967157503.612$
- pop: $9769949$



## Country
- name: Ireland
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $291499812103.645$
- pop: $4701957$

### Year
- name: 2016
- gdp: $300523297712.96$
- pop: $4755335$

### Year
- name: 2017
- gdp: $335663113959.724$
- pop: $4807388$

### Year
- name: 2018
- gdp: $382674360766.341$
- pop: $4867316$

### Year
- name: 2019
- gdp: $388698711348.156$
- pop: $4941444$



## Country
- name: Italy
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $1835899237320.04$
- pop: $60730582$

### Year
- name: 2016
- gdp: $1875797463583.87$
- pop: $60627498$

### Year
- name: 2017
- gdp: $1961796197354.36$
- pop: $60536709$

### Year
- name: 2018
- gdp: $2085764300862.27$
- pop: $60421760$

### Year
- name: 2019
- gdp: $2001244392041.57$
- pop: $60297396$



## Country
- name: Latvia
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $27090019662.7977$
- pop: $1977527$

### Year
- name: 2016
- gdp: $27734140217.3664$
- pop: $1959537$

### Year
- name: 2017
- gdp: $30273007510.3024$
- pop: $1942248$

### Year
- name: 2018
- gdp: $34313873284.5882$
- pop: $1927174$

### Year
- name: 2019
- gdp: $34117202555.0666$
- pop: $1912789$



## Country
- name: Lithuania
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $41392396557.6337$
- pop: $2904910$

### Year
- name: 2016
- gdp: $43021972484.8299$
- pop: $2868231$

### Year
- name: 2017
- gdp: $47750908128.259$
- pop: $2828403$

### Year
- name: 2018
- gdp: $53455170033.5194$
- pop: $2801543$

### Year
- name: 2019
- gdp: $54219315600.0854$
- pop: $2786844$



## Country
- name: Luxembourg
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $57744457954.7297$
- pop: $569604$

### Year
- name: 2016
- gdp: $60691483443.1221$
- pop: $582014$

### Year
- name: 2017
- gdp: $64181944722.7283$
- pop: $596336$

### Year
- name: 2018
- gdp: $70919958015.5247$
- pop: $607950$

### Year
- name: 2019
- gdp: $71104919108.1411$
- pop: $619896$



## Country
- name: Malta
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $10682394998.3357$
- pop: $445053$

### Year
- name: 2016
- gdp: $11444483133.7171$
- pop: $455356$

### Year
- name: 2017
- gdp: $12747857570.0407$
- pop: $467999$

### Year
- name: 2018
- gdp: $14603581712.3288$
- pop: $484630$

### Year
- name: 2019
- gdp: $14786156563.3046$
- pop: $502653$



## Country
- name: Netherlands
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $765264949780.999$
- pop: $16939923$

### Year
- name: 2016
- gdp: $783528181704.567$
- pop: $17030314$

### Year
- name: 2017
- gdp: $833869641687.06$
- pop: $17131296$

### Year
- name: 2018
- gdp: $914104847814.117$
- pop: $17231624$

### Year
- name: 2019
- gdp: $909070395160.783$
- pop: $17332850$



## Country
- name: Poland
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $477581376840.43$
- pop: $37986412$

### Year
- name: 2016
- gdp: $472037130972.913$
- pop: $37970087$

### Year
- name: 2017
- gdp: $526380811261.345$
- pop: $37974826$

### Year
- name: 2018
- gdp: $587114101392.696$
- pop: $37974750$

### Year
- name: 2019
- gdp: $592164400687.607$
- pop: $37970874$



## Country
- name: Portugal
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $199313894327.486$
- pop: $10358076$

### Year
- name: 2016
- gdp: $206286022781.894$
- pop: $10325452$

### Year
- name: 2017
- gdp: $221357874718.93$
- pop: $10300300$

### Year
- name: 2018
- gdp: $241274628877.362$
- pop: $10283822$

### Year
- name: 2019
- gdp: $237686075634.698$
- pop: $10269417$



## Country
- name: Romania
- coastal: \`FALSE\`

### Year
- name: 2015
- gdp: $177893451831.141$
- pop: $19815616$

### Year
- name: 2016
- gdp: $188494136775.719$
- pop: $19702267$

### Year
- name: 2017
- gdp: $211695422578.655$
- pop: $19587290$

### Year
- name: 2018
- gdp: $241626953521.413$
- pop: $19472545$

### Year
- name: 2019
- gdp: $250077444017.084$
- pop: $19356544$



## Country
- name: Slovakia
- coastal: \`FALSE\`

### Year
- name: 2015
- gdp: $88457167724.277$
- pop: $5423801$

### Year
- name: 2016
- gdp: $89640616270.8866$
- pop: $5430798$

### Year
- name: 2017
- gdp: $95481955557.6908$
- pop: $5439232$

### Year
- name: 2018
- gdp: $105820499976.721$
- pop: $5446771$

### Year
- name: 2019
- gdp: $105422304975.576$
- pop: $5454073$



## Country
- name: Slovenia
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $43090173061.9713$
- pop: $2063531$

### Year
- name: 2016
- gdp: $44651537259.9731$
- pop: $2065042$

### Year
- name: 2017
- gdp: $48561672400.8437$
- pop: $2066388$

### Year
- name: 2018
- gdp: $54034358544.2622$
- pop: $2073894$

### Year
- name: 2019
- gdp: $53742159516.9278$
- pop: $2087946$



## Country
- name: Spain
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $1195119269971.52$
- pop: $46444832$

### Year
- name: 2016
- gdp: $1232076017361.53$
- pop: $46484062$

### Year
- name: 2017
- gdp: $1312551705955.3$
- pop: $46593236$

### Year
- name: 2018
- gdp: $1419735245004.7$
- pop: $46797754$

### Year
- name: 2019
- gdp: $1394116310768.63$
- pop: $47076781$



## Country
- name: Sweden
- coastal: \`TRUE\`

### Year
- name: 2015
- gdp: $505103781349.757$
- pop: $9799186$

### Year
- name: 2016
- gdp: $515654671469.547$
- pop: $9923085$

### Year
- name: 2017
- gdp: $541018749769.097$
- pop: $10057698$

### Year
- name: 2018
- gdp: $555455371487.089$
- pop: $10175214$

### Year
- name: 2019
- gdp: $530832908737.862$
- pop: $10285453$`
}
