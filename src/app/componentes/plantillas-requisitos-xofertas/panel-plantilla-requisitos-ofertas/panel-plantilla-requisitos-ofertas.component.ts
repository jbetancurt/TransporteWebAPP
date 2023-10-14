import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlantillasRequisitosXOfertas , PlantillasRequisitosXOfertasComponent, PlantillasRequisitosXOfertasServices } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Requisitos} from '../../requisitos/requisitos.model';
import { RequisitosService} from '../../requisitos/requisitos.service';

@Component({
  selector: 'app-panel-plantilla-requisitos-ofertas',
  templateUrl: './panel-plantilla-requisitos-ofertas.component.html',
  styleUrls: ['./panel-plantilla-requisitos-ofertas.component.scss']
})


export class PanelPlantillaRequisitosOfertasComponent implements OnInit {
  
  @Input() tituloDelPanel = "REQUISITOS";
  @Input() editaroAgregar = "agregar";
  @Input() indexEditar = 0;
  @Input() idOferta = 0;
  panelOpenState = false;
  openorclose =false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: any[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstPlantillasRequisitosXOfertas:  PlantillasRequisitosXOfertas[] = [];
  lstRequisitos: Requisitos[] = [];
  
  displayedColumns: string[] = [ 'idRequisito','requeridoAdjunto','observacion','editar', 'borrar'];

  
  
  idRequisito : number=0;
  requeridoAdjunto: boolean=false;
  observacion : string="";
 
  
  constructor 
  (
    private formBuilder: FormBuilder,
    private plantillasrequisitosxofertasService: PlantillasRequisitosXOfertasServices,
    private requisitosService: RequisitosService
  ) { }
  
  ngOnInit() {
    this.FGAgregarRequisito.reset();
    this.listarRequisitos();
    this.listarPlantillasRequisitosXOfertas(this.idOferta);    
    
  }

  FGAgregarRequisito : FormGroup = this.formBuilder.group({      
   
    idRequisito:new FormControl(0,Validators.required),
    requeridoAdjunto:false,
    observacion:new FormControl('',Validators.required)    
       
  });
  
  refrescarResumenPanel(){    
    console.log(this.datosGuardados.length);
    if (this.datosGuardados.length==0){
      this.descripcionPanelPorComas="";
    }
    else{
      this.descripcionPanelPorComas = this.datosGuardados.map(x => 
          "* " + this.encontrarNombreRequisito(x.idRequisito)).join(', ');
    }
  }

  panelOpen(){
    this.openorclose = true
  }

  guardarDatos() {
   
    if(this.FGAgregarRequisito.value.idRequisito == null){
      alert("Debe seleccionar un requisito");
    }
    else{  
      const datos = {
        idRequisito:this.FGAgregarRequisito.value.idRequisito,
        requeridoAdjunto:this.encontrarRequeridoAdjunto(this.FGAgregarRequisito.value.idRequisito),
        observacion:this.FGAgregarRequisito.value.observacion,
      };
      console.log(datos);
      this.datosGuardados.push(datos);
      this.dataSource.data = this.datosGuardados;
      this.FGAgregarRequisito.reset();
      this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreRequisito(dato.idRequisito));
      this.refrescarResumenPanel();
    }
  }


   eliminarFila(index: number) { 
    this.datosGuardados.splice(index, 1);
    this.dataSource.data = this.datosGuardados;
    this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreRequisito(dato.idRequisito));
    this.refrescarResumenPanel();
    this.FGAgregarRequisito.reset();
    
  }

  cancelarEdicion(){
    if (this.editaroAgregar="agregar"){
      this.FGAgregarRequisito.reset();
      this.openorclose = !this.openorclose;
    }
    else{
      this.FGAgregarRequisito.reset(); 
      this.editaroAgregar="agregar";
    }
    
    
  }

  editarFila(index: number) {
    this.datosGuardados[index] = this.FGAgregarRequisito.value;
    this.dataSource.data = this.datosGuardados;
    this.FGAgregarRequisito.reset();
    this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreRequisito(dato.idRequisito));
    this.editaroAgregar="agregar";
    this.refrescarResumenPanel();

  }

  cargarDatosParaEditar(index: number) {
    this.editaroAgregar="editar";
    this.indexEditar=index;
    let filaSeleccionada = this.datosGuardados[index];
    
    this.listarRequisitos();
    
    this.FGAgregarRequisito.patchValue({
      idRequisito:filaSeleccionada.idRequisito,
      requeridoAdjunto:this.encontrarRequeridoAdjunto(filaSeleccionada.idRequisito),  
      observacion:filaSeleccionada.observacion
    });
  }

  listarPlantillasRequisitosXOfertas(idOferta:number){
    this.plantillasrequisitosxofertasService.ConsultarXOferta(idOferta.toString()).subscribe({
      next: (lstplantillasrequisitosxofertas: PlantillasRequisitosXOfertas[]) => {
        this.lstPlantillasRequisitosXOfertas = lstplantillasrequisitosxofertas;
        //console.log(this.lstPlantillasRequisitosXOfertas);
        this.cargarPlantillasRequisitosXOfertasAdatosGuardados();
      //  this.refrescarResumenPanel();
      }
    });
    this.refrescarResumenPanel();
    
  }

  encontrarRequeridoAdjunto(idRequisito:number):boolean{
    let requeridoAdjunto = false;
    this.lstRequisitos.forEach(element => {
      if(element.idRequisito==idRequisito){
        requeridoAdjunto=element.requeridoAdjunto;
      }
    });
    return requeridoAdjunto;
  }

  
  encontrarNombreRequisito(idRequisito: number): string {
    let nombreRequisito = "";
    this.lstRequisitos.forEach(element => {
      if (element.idRequisito == idRequisito) {
        nombreRequisito = element.nombreRequisito;
      }
    });
    return nombreRequisito;
  }


  listarRequisitos(){ 
    this.requisitosService.GetAll().subscribe({
      next : (lstrequisitos:Requisitos[]) => { 
        this.lstRequisitos=lstrequisitos;
      }
    });
  }  



  public editooagrego(editaroAgregar:string){
    this.editaroAgregar=editaroAgregar;
  }



  cargarPlantillasRequisitosXOfertasAdatosGuardados() {
    
    this.lstPlantillasRequisitosXOfertas.forEach(requisito => {
      const datos = {
        idOferta: requisito.idOferta, 
        idRequisito: requisito.idRequisito,
        requeridoAdjunto:this.encontrarRequeridoAdjunto(requisito.idRequisito),
        observacion: requisito.observacion
      };
      this.datosGuardados.push(datos);
      this.dataSource.data = this.datosGuardados;
      this.datosGuardados.map(dato => this.encontrarNombreRequisito(dato.idRequisito));
      
    });
    this.refrescarResumenPanel();
  }

}

