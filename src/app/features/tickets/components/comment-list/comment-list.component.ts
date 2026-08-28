import { Component, Input } from '@angular/core';

import { Comment } from '../../../../core/interfaces/comment.interface';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  @Input({ required: true }) comments: Comment[] = [];
}