// mb0: mb1 から受け取ったシリアル信号をBluetooth でPC に送信
bluetooth.onBluetoothConnected(function () {
  basic.showIcon(IconNames.Yes);
});

bluetooth.onBluetoothDisconnected(function () {
  basic.showIcon(IconNames.No);
});

serial.redirect(SerialPin.P1, SerialPin.P0, BaudRate.BaudRate9600);

bluetooth.startUartService();

basic.forever(function () {
  bluetooth.uartWriteLine(serial.readString());
  basic.pause(50);
});
