import { Component, ElementRef, ViewChild } from '@angular/core';
import { MusicControls } from '@ionic-native/music-controls/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('audio', { static: false })
  audioElement: ElementRef<HTMLAudioElement>;

  audioUrl = './assets/200.mp3';

  hide = false;
  private playing = false;

  constructor(private musicControls: MusicControls) {}

  showHide() {
    this.hide = !this.hide;

    if (this.hide) {
      this.playing = false;
      this.destroyNotification();
    }
  }

  playStop() {
    if (this.playing) {
      this.audioElement?.nativeElement?.pause();
      this.playing = false;
      this.destroyNotification();
    } else {
      this.audioElement?.nativeElement?.play();
      this.playing = true;
      this.createNotification();
    }
  }

  createNotification() {
    this.musicControls.create({
      track       : 'Tytuł',        // optional, default : ''
      artist      : 'Muzeum',                       // optional, default : ''
      cover       : `assets/10000200.jpg`,      // optional, default : nothing
      isPlaying   : true,                         // optional, default : true
      dismissable : false,                         // optional, default : false
      // hide previous/next/close buttons:
      hasPrev   : true,      // show previous button, optional, default: true
      hasNext   : true,       // show next button, optional, default: true
      hasClose  : false,       // show close button, optional, default: false
    // iOS only, optional
      album       : '',     // optional, default: ''
      duration : this.audioElement.nativeElement.duration, // optional, default: 0
      elapsed : 0, // optional, default: 0
      hasSkipForward : false,  // show skip forward button, optional, default: false
      hasSkipBackward : false, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
      hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional
      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      ticker    : '',
      // All icons default to their built-in android equivalents
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
      });
  }

  destroyNotification() {
    this.musicControls.destroy();
  }

}
