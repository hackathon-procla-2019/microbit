bluetooth.onBluetoothConnected(function () {
  basic.showIcon(IconNames.Yes);
});
bluetooth.onBluetoothDisconnected(function () {
  basic.showIcon(IconNames.No);
});
input.onButtonPressed(Button.A, function () {
  if (num > 1) {
    num += -1;
  }
});
input.onButtonPressed(Button.B, function () {
  if (num < 8) {
    num += 1;
  }
});
let num = 0;
bluetooth.startUartService();
let soundFlag = true;
input.setAccelerometerRange(20);
num = 1;
basic.forever(function () {
  basic.pause(20);
  // Z方向の加速度を取得して、ドラムを鳴らすかの判定を行う
  if (input.acceleration(Dimension.Z) < -150 && soundFlag == true) {
    soundFlag = false;
    music.play(
      music.tonePlayable(262, music.beat(BeatFraction.Sixteenth)),
      music.PlaybackMode.UntilDone
    );
    bluetooth.uartWriteNumber(num * 5);
  } else if (input.acceleration(Dimension.Z) >= -25) {
    soundFlag = true;
  }
});
