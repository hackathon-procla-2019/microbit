// Web Bluetooth API
// PC とmicro:bit をBluetooth で接続
// mb0 から受信した番号に対応したサウンドを鳴らす
const drumArray = [
  "",
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
  new Audio("sound/" + drumArray[number]).play();
};
const UUID_UART_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const UUID_TX_CHAR_CHARACTERISTIC = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
let myCharacteristics;

async function onStartButtonClick() {
  try {
    console.log("Bluetoothデバイス取得");
    const device = await navigator.bluetooth.requestDevice({
      filters: [
        { services: [UUID_UART_SERVICE] },
        { namePrefix: "BBC micro:bit" },
      ],
    });

    console.log("GATTサーバーに接続");
    const server = await device.gatt.connect();
    console.log("サービスの取得");
    const service = await server.getPrimaryService(UUID_UART_SERVICE);
    console.log("CHARACTERISTIC取得");
    myCharacteristics = await service.getCharacteristic(
      UUID_TX_CHAR_CHARACTERISTIC
    );
    myCharacteristics.startNotifications();
    console.log("通信開始");
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
