import { Component, OnInit, ViewChild} from '@angular/core';
import { Menu } from '../menu';
import { MenuService } from '../menu.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  menus: Menu[];
  error:boolean;
  displayedColumns: string[] = ['foodName', 'foodPrice', 'foodTime'];

  constructor(
    private ds: MenuService,
  ) {}

  ngOnInit(): void {
    this.ds.getMenus().subscribe(
      response => {
        this.menus = response as Menu[];
      },
      err => {
        console.log(err);
        this.error = true;
      }
    );
  }


}
