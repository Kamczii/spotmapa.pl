import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.css']
})
export class CommentPreviewComponent implements OnInit {

  @Input() comment: Comment;

  constructor() { }

  ngOnInit() {
  }

}
