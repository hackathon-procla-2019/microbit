// Web Bluetooth API
// PC とmicro:bit をBluetooth で接続
// mb0 から受信した番号に対応したサウンドを鳴らす
const drumArray = [
  "bass.mp3",
  "snare.mp3",
  "hihat.mp3",
  "crash.mp3",
  "raid.mp3",
  "high.mp3",
  "low.mp3",
  "floor.mp3",
];

const soundPlay = (input) => {
  const number = Number(input);
  switch (true) {
    case isNaN(number):
      break;
    case number < 3:
      break;
    case number < 8 && 3 <= number:
      new Audio("sound/" + drumArray[0]).play();
      break;
    case number < 13:
      new Audio("sound/" + drumArray[1]).play();
      break;
    case number < 18:
      new Audio("sound/" + drumArray[2]).play();
      break;
    case number < 23:
      new Audio("sound/" + drumArray[3]).play();
      break;
    case number < 28:
      new Audio("sound/" + drumArray[4]).play();
      break;
    case number < 33:
      new Audio("sound/" + drumArray[5]).play();
      break;
    case number < 38:
      new Audio("sound/" + drumArray[6]).play();
      break;
    case number < 43:
      new Audio("sound/" + drumArray[7]).play();
      break;
    default:
      break;
  }
};

const UUID_UART_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const UUID_TX_CHAR_CHARACTERISTIC = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
let myCharacteristics;

async function onStartButtonClick() {
  try {
    console.log("Requesting Bluetooth Device...");
    const device = await navigator.bluetooth.requestDevice({
      filters: [
        { services: [UUID_UART_SERVICE] },
        { namePrefix: "BBC micro:bit" },
      ],
    });

    console.log("Connecting to GATT Server...");
    const server = await device.gatt.connect();
    console.log("Getting Service...");
    const service = await server.getPrimaryService(UUID_UART_SERVICE);
    console.log("Getting Characteristic...");
    myCharacteristics = await service.getCharacteristic(
      UUID_TX_CHAR_CHARACTERISTIC
    );
    myCharacteristics.startNotifications();
    console.log("> Notifications started");
    myCharacteristics.addEventListener(
      "characteristicvaluechanged",
      handleNotifications
    );
  } catch (error) {
    console.log("Argh! " + error);
  }
}

async function handleNotifications(event) {
  if (myCharacteristics) {
    try {
      const value = event.target.value;
      const inputValue = new TextDecoder().decode(value).replace(/\r?\n/g, "");
      console.log(inputValue);
      soundPlay(inputValue);
    } catch (error) {
      console.log("Argh! " + error);
    }
  }
}
