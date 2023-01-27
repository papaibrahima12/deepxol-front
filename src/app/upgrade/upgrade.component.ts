import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DossierService } from './dossier.service';


interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  createDossierForm: FormGroup;
  antecedantList: string[] = ['Hypertension', 'Diabete', 'AVC', 'Apnee de Sommeil', 'Obesite', 'Asthme'];
  antecedant: any
  selectedImgUrl: any;


  constructor(
    private _formBuilder: FormBuilder,
    private _dossierService: DossierService,
    private _matDialog: MatDialog,
    private _router: Router

    ) { }

  ngOnInit() {
    this.createDossierForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      phone: [''],
      address: [''],
      electro: [],
      diagnostic: ['', Validators.required],
      comment: [''],
      gender: [''],
      antecedant: [''],
      race: [''],
      implantationOlder: [''],
      fibrilationLoad: ['', Validators.required],
      age: [''],
      insuffisanceCardiaque: ['']
    });
  }

  uploadElectroImage(fileList: FileList): void {
    // Return if canceled
    if (!fileList.length) {
        return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const file = fileList[0];
    this.createDossierForm.get('electro').setValue(file)

    const reader = new FileReader();
    reader.onload = e => this.selectedImgUrl = reader.result;
    reader.readAsDataURL(file);

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
        return;
    }
  }
  
  addDossier(){
    if (this.createDossierForm.invalid) return;

    
    let payload = Object.assign({}, this.createDossierForm.value);
    const formData = new FormData();

    formData.append('electro', payload?.electro as undefined)
    formData.append('fullName', payload?.fullName)
    formData.append('age', payload?.age)
    formData.append('gender', payload?.gender)
    formData.append('address', payload?.address)
    formData.append('phone', payload?.phone)
    formData.append('diagnostic', payload?.diagnostic)
    formData.append('comment', payload?.comment)
    formData.append('race', payload?.race)
    formData.append('antecedant', payload?.antecedant)
    formData.append('implantationOlder', payload?.implantationOlder)
    formData.append('fibrilationLoad', payload?.fibrilationLoad)
    formData.append('insuffisanceCardiaque', payload?.insuffisanceCardiaque)

    this._dossierService.createDossier(formData).subscribe({
      next(value) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Dossier enregistre',
          timer: 1000
        })
        this._router.navigateByUrl('/#/table-list')
      },
      error(err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Quelque chose s\'est mal passé !',
          timer: 1000
        })
      },
    })
  }
}
