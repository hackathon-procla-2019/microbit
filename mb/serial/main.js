// mb1: スティックから受け取った無線信号をシリアルでmb0(ble)に送信
radio.onReceivedNumber(function (receivedNumber) {
  serial.writeNumber(receivedNumber * 5);
  basic.showNumber(receivedNumber);
});

radio.setGroup(0);

serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate9600);
