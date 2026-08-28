import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input({ required: true }) page = 1;
  @Input({ required: true }) limit = 10;
  @Input({ required: true }) total = 0;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.max(Math.ceil(this.total / this.limit), 1);
  }

  get isFirstPage(): boolean {
    return this.page <= 1;
  }

  get isLastPage(): boolean {
    return this.page >= this.totalPages;
  }

  goToPrevious(): void {
    if (!this.isFirstPage) {
      this.pageChange.emit(this.page - 1);
    }
  }

  goToNext(): void {
    if (!this.isLastPage) {
      this.pageChange.emit(this.page + 1);
    }
  }
}