import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { DossierService } from './dossier.service';


@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  haveTachArter !: FormControl
  showTachArtControl$!: Observable<boolean>;

  createDossierForm: FormGroup;
  antecedantList: string[] = ['Hypertension', 'Diabete', 'AVC', 'Apnee de Sommeil', 'Obesite', 'Asthme'];
  antecedant: any;
  selectedImgUrl: any;
  selectedImgFile: File;
  selectedXmlFile: File;

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
      electro: ['', Validators.required],
      // electro_img: ['', Validators.required],
      // electro_xml: ['', Validators.required],
      diagnostic: ['', Validators.required],
      comment: [''],
      gender: [''],
      antecedant: [''],
      race: [''],
      implantationOlder: [''],
      fibrilationLoad: ['', Validators.required],
      age: [''],
      insuffisanceCardiaque: [''],
      tach_arter: [''],
      tach_arter_value: [''],
      chads_vasc: ['', Validators.required],
    });
    this.haveTachArter = this._formBuilder.control('non');
    this.initFormObservable();
  }

  private initFormObservable() {
    this.showTachArtControl$ = this.haveTachArter.valueChanges.pipe(
      map(preference => preference === 'oui'),
    );
  }

  uploadElectroImage(fileList: FileList) {
    const file = fileList[0];
    this.createDossierForm.get('electro').setValue(file);
    const reader = new FileReader();
    reader.onload = e => this.selectedImgUrl = reader.result;
    reader.readAsDataURL(file);
    }

  addDossier() {
    if (this.createDossierForm.invalid) { return; }

    const payload = Object.assign({}, this.createDossierForm.value);
    const formData = new FormData();
    formData.append('electro', payload?.electro as undefined)
    formData.append('fullName', payload?.fullName)
    // formData.append('electros[]', this.selectedImgFile)
    // formData.append('electros[]', this.selectedXmlFile)
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
    formData.append('chads_vasc', payload?.chads_vasc)
    formData.append('tach_arter', payload?.tach_arter)
    formData.append('tach_arter_value', payload?.tach_arter_value)

    this._dossierService.createDossier(formData).subscribe({
      next(value) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Dossier enregistré avec succés',
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
