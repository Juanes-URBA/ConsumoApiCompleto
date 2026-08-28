import { Component, Input } from '@angular/core';

import { Comment } from '../../../../core/interfaces/comment.interface';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  @Input({ required: true }) comment!: Comment;
}