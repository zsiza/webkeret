import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appShadow]',
})
export class HighlightDirective {
  private el = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter() {
    this.shadow();
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.boxShadow = 'none';
  }
  private shadow() {
    this.el.nativeElement.style.transition = 'box-shadow 0.3s ease-in-out';
    this.el.nativeElement.style.boxShadow =
      '0px 4px 20px rgba(133, 0, 255, 0.5)';
  }
}
