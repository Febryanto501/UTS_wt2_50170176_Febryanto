import { Component, OnInit, Inject } from '@angular/core';
import { Menu } from '../menu';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';




@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})


export class MenuFormComponent implements OnInit {

  menu: Menu = {
    _id: '',
    foodName: '',
    foodPrice: '',
    foodTime: '',
    foodDetail: '',
  };

  id = null;
  error = false;
  update = true;



  constructor(
    private _snackBar: MatSnackBar,
    private ds: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,

  ) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // jika ada parameter id di URL
      if (params.get('id')) {
        this.id = params.get('id');

        this.ds.getMenu(this.id).subscribe(
          response => {
            this.menu = response as Menu;
          },
          err => {
            console.log(err);
            this.error = true;
          }
        );
      } else {
        this.update = false;
      }
    });
  }

  postMenu() {
    this.ds.postMenu(this.menu).subscribe(response => {
      // tampilkan notifikasi
      this.openSnackBar("Menu Added", null)
      this.router.navigate(['/main']);
    });
  }

  deleteMenu() {
    this.ds.deleteMenu(this.menu).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Menu Deleted", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateMenu() {
    this.ds.updateMenu(this.menu).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Menu Updated", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }



}



