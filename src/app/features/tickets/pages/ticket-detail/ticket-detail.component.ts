import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TicketService } from '../../../../core/services/ticket.service';
import { CommentService } from '../../../../core/services/comment.service';
import { Ticket } from '../../../../core/interfaces/ticket.interface';
import { Comment } from '../../../../core/interfaces/comment.interface';
import { Role } from '../../../../core/enums/role.enum';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket | null = null;
  comments: Comment[] = [];

  isLoadingTicket = false;
  isLoadingComments = false;
  isSubmittingComment = false;
  canEdit = false;

  ticketErrorMessage = '';
  commentErrorMessage = '';

  private ticketId = '';

   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.ticketId) {
      this.router.navigate(['/dashboard/tickets']);
      return;
    }
    const role = this.authService.getUserRole();
    this.canEdit = role === Role.ADMIN || role === Role.AGENT;
    this.loadTicket();
    this.loadComments();
  }

  onSubmitComment(body: string): void {
    this.isSubmittingComment = true;
    this.commentErrorMessage = '';

    this.commentService.addComment(this.ticketId, { body }).subscribe({
      next: () => {
        this.isSubmittingComment = false;
        this.loadComments();
      },
      error: (error: Error) => {
        this.isSubmittingComment = false;
        this.commentErrorMessage = error.message;
      }
    });
  }

  private loadTicket(): void {
    this.isLoadingTicket = true;
    this.ticketErrorMessage = '';

    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.isLoadingTicket = false;
      },
      error: (error: Error) => {
        this.ticketErrorMessage = error.message;
        this.isLoadingTicket = false;
      }
    });
  }

  private loadComments(): void {
    this.isLoadingComments = true;

    this.commentService.getComments(this.ticketId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoadingComments = false;
      },
      error: (error: Error) => {
        this.commentErrorMessage = error.message;
        this.isLoadingComments = false;
      }
    });
  }
}