import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SpotService } from 'src/app/services/spot.service';
import { Comment } from '../../models/comment';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  id: number;
  coms: Comment[];

  constructor(public auth: AuthService, private spotService: SpotService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getComments();
    });
  }

  getComments() {
    this.spotService.getCommentsBySpotId(this.id).subscribe(data => {
      this.coms = data;
    });
  }


}
