import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { SpotService } from 'src/app/services/spot.service';

@Component({
  selector: 'app-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.css']
})
export class CommentPreviewComponent implements OnInit {

  @Input() comment: Comment;
  @Output() refreshComments = new EventEmitter();
  canEdit: boolean = false;
  constructor(private auth: AuthService, private spotService: SpotService) { }

  ngOnInit() {
    console.log(this.comment.author.user_id+" "+this.auth.getUserId())
    if(this.comment.author.user_id==this.auth.getUserId())
      this.canEdit = true;
  }

  delete(){
    if (confirm('Czy na pewno chcesz usunąć komentarz?')) {
      this.spotService.deleteComment(this.comment.comment_id).subscribe(data => this.refreshComments.emit(''))
    }
  }
}
