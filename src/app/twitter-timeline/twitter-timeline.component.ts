import { Component, OnInit, Input } from '@angular/core';
import {WindowReference} from './window-reference';

@Component({
  selector: 'app-twitter-timeline',
  templateUrl: './twitter-timeline.component.html',
  styleUrls: ['./twitter-timeline.component.scss']
})
export class TwitterTimelineComponent implements OnInit {
  twitterHandle: string=null;
  @Input() socialMedia;

  constructor() { }

  ngOnInit(){
    setTimeout(()=>{
      console.log(this.socialMedia);
      for(let media of this.socialMedia) {
        if(media.mediaType == "Twitter") {
          this.twitterHandle = media.mediaAccount;
        }
      };
      let win = WindowReference.get();
      win.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
        t = win.twttr || {};
        if (d.getElementById(id)) {return t};
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };

        return t;
      }(document, 'script', 'twitter-wjs'));

      // setTimeout(function () { twttr.widgets.load(); }, 2);
      // console.log(twttr)
      win.twttr.ready(()=>{
        win.twttr.widgets.createTimeline(
          {
            sourceType: 'profile',
            screenName: this.twitterHandle
          },
          document.getElementById("twitter-timeline"),
          {
            height: 600,
            chrome: 'noscrollbar'
          }
        );
      })
    }, 100);
  }

  getTwitterUrl(twitterHandle:string) {
    return 'https://twitter.com/' + twitterHandle;
  }


}
