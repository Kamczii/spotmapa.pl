import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SpotService } from 'src/app/services/spot.service';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from '../../models/comment';
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() id: number;
  @Output() refreshComments = new EventEmitter();
  form: FormGroup;

  constructor(private spotService: SpotService, private auth: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      commentControl: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  ngOnInit() {
  }

  addComment() {
    let comment = new Comment();
    comment.comment = this.form.controls['commentControl'].value;
    this.spotService.addCommentBySpotId(this.id, comment).subscribe(data => {
      this.form.reset();
      this.refreshComments.emit('');
    });
  }
}
