import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DossierService} from '../upgrade/dossier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.scss']
})
export class UpdateComponentComponent implements OnInit {

  updateDossierForm: FormGroup;
  selectedDossier: any
  antecedantList: string[] = ['Hypertension', 'Diabete', 'AVC', 'Apnee de Sommeil', 'Obesite', 'Asthme'];
  selectedImgUrl: any;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _matDialog: MatDialog,
      private _formBuilder: FormBuilder,
      private _dossierService: DossierService,
  ) { }

  ngOnInit() {
    this.selectedDossier = this.data.dossier;
    this.updateDossierForm = this._formBuilder.group({
      electro: this.selectedDossier.electro,
      diagnostic: this.selectedDossier.diagnostic,
      antecedant: this.selectedDossier.antecedant,
      implantationOlder: this.selectedDossier.implantationOlder,
      fibrilationLoad: this.selectedDossier.fibrilationLoad,
      insuffisanceCardiaque: this.selectedDossier.insuffisanceCardiaque,
      tach_arter: this.selectedDossier.tach_arter,
      tach_arter_value: this.selectedDossier.tach_arter_value,
      chads_vasc: this.selectedDossier.chads_vasc,
    })
  }
  uploadElectroImage(fileList: FileList): void {
    if (!fileList.length) {
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const file = fileList[0];
    this.updateDossierForm.get('electro').setValue(file)

    const reader = new FileReader();
    reader.onload = e => this.selectedImgUrl = reader.result;
    reader.readAsDataURL(file);

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }
  }

  updateDossier() {
    if (this.updateDossierForm.invalid) {
      return;
    }
    const payload = Object.assign({}, this.updateDossierForm.value);
    const formDataUpdate = new FormData();

    formDataUpdate.append('diagnostic', payload?.diagnostic)
    formDataUpdate.append('antecedant', payload?.antecedant)
    formDataUpdate.append('implantationOlder', payload?.implantationOlder)
    formDataUpdate.append('fibrilationLoad', payload?.fibrilationLoad)
    formDataUpdate.append('insuffisanceCardiaque', payload?.insuffisanceCardiaque)
    formDataUpdate.append('chads_vasc', payload?.chads_vasc)
    formDataUpdate.append('tach_arter', payload?.tach_arter)
    formDataUpdate.append('tach_arter_value', payload?.tach_arter_value)

    this._dossierService.updateDossier(this.selectedDossier._id, formDataUpdate).subscribe({
      next(value) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Dossier modifié avec succès',
          timer: 10000
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
