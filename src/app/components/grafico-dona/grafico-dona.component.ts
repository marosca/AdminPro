import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html'
})
export class GraficoDonaComponent implements OnInit {
    // Doughnut
    @Input() leyenda: string;
    @Input() data: number[];
    @Input() labels: string[];
    @Input() chartType: string;

    // events
    public chartClicked(e: any): void {
      console.log(e);
    }
    public chartHovered(e: any): void {
      console.log(e);
    }
    ngOnInit() {}
}
