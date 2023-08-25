// right_stick: スティックの振りを検知, 指定した値を無線でmb1に送信
radio.setGroup(0);
let soundFlag = true;
input.setAccelerometerRange(20);
basic.forever(function () {
  basic.pause(20);
  // Z方向の加速度を取得して、ドラムを鳴らすかの判定を行う
  if (input.acceleration(Dimension.Z) < -150 && soundFlag == true) {
    soundFlag = false;
    music.play(
      music.tonePlayable(262, music.beat(BeatFraction.Sixteenth)),
      music.PlaybackMode.UntilDone
    );
    radio.sendNumber(1);
  } else if (input.acceleration(Dimension.Z) >= -25) {
    soundFlag = true;
  }
});
