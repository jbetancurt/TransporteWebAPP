import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PlantillasRequisitosXOfertas , PlantillasRequisitosXOfertasAdjuntos, PlantillasRequisitosXOfertasComponent, PlantillasRequisitosXOfertasServices } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Requisitos} from '../../requisitos/requisitos.model';
import { RequisitosService} from '../../requisitos/requisitos.service';
import { RequisitosXOfertas } from '../../requisitos-xofertas';
import { firstValueFrom } from 'rxjs';

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
  @Input() DatosParaCrearPlantillaRequisitosPorOferta:RequisitosXOfertas[]=[];
  @Output() datosActualizadosRequisitos = new EventEmitter<PlantillasRequisitosXOfertas[]>();
  @Output() datosActualizadosParaBorrarRequisitos = new EventEmitter<PlantillasRequisitosXOfertas[]>();

  panelOpenState = false;
  openorclose =false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: PlantillasRequisitosXOfertas[] = [];
  datosParaBorrar:PlantillasRequisitosXOfertas[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstPlantillasRequisitosXOfertas:  PlantillasRequisitosXOfertas[] = [];
  lstRequisitos: Requisitos[] = [];
  
  displayedColumns: string[] = [ 'idRequisito','requeridoAdjunto','observacion','editar', 'borrar'];

  
  
  idRequisito : number=0;
  requeridoAdjunto: boolean=false;
  observacion : string="";
 // nombrePlantillaRequisitoXOferta : string="";
 
  
  constructor 
  (
    private formBuilder: FormBuilder,
    private plantillasrequisitosxofertasService: PlantillasRequisitosXOfertasServices,
    private requisitosService: RequisitosService
  ) { }
  
  ngOnInit() {
    if (this.DatosParaCrearPlantillaRequisitosPorOferta.length>0){
      this.lstPlantillasRequisitosXOfertas=this.DatosParaCrearPlantillaRequisitosPorOferta;
      this.cargarPlantillasRequisitosXOfertasAdatosGuardados();
      this.datosActualizadosRequisitos.emit(this.datosGuardados);
      this.listarRequisitos();
     
    }
    else{
      console.log(this.idOferta);
      this.FGAgregarRequisito.reset();
      this.listarRequisitos();
      this.listarPlantillasRequisitosXOfertas(this.idOferta);    
    }




    
    
  }

  FGAgregarRequisito : FormGroup = this.formBuilder.group({      
    idRequisitoXOferta : new FormControl('0'),
    idRequisito:new FormControl(0,Validators.required),
    requeridoAdjunto:false,
    observacion:new FormControl('',Validators.required),
   // nombrePlantillaRequisitoXOferta:new FormControl('',Validators.required),    
       
  });
  
 async refrescarResumenPanel(){    
  const requisitosdelaplantilla = await firstValueFrom(this.requisitosService.GetAll()); 
    if (this.datosGuardados.length==0){
      this.descripcionPanelPorComas="";
    }
    else{
      this.lstRequisitos= requisitosdelaplantilla;
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
      let PlantillaRequisitoXOfertaAdjunto = new PlantillasRequisitosXOfertasAdjuntos;
      PlantillaRequisitoXOfertaAdjunto.idRequisitoXOferta=0;
      PlantillaRequisitoXOfertaAdjunto.idOferta=this.idOferta;
      PlantillaRequisitoXOfertaAdjunto.idRequisito=this.FGAgregarRequisito.value.idRequisito;
      PlantillaRequisitoXOfertaAdjunto.requeridoAdjunto= this.encontrarRequeridoAdjunto(this.FGAgregarRequisito.value.idRequisito);
      PlantillaRequisitoXOfertaAdjunto.observacion=this.FGAgregarRequisito.value.observacion;
    //  PlantillaRequisitoXOfertaAdjunto.nombrePlantillaRequisitoXOferta=this.FGAgregarRequisito.value.nombrePlantillaRequisitoXOferta;

      this.datosGuardados.push(PlantillaRequisitoXOfertaAdjunto);
      this.dataSource.data = this.datosGuardados;
      this.datosActualizadosRequisitos.emit(this.datosGuardados);
      this.FGAgregarRequisito.reset();
      this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreRequisito(dato.idRequisito));
      this.refrescarResumenPanel();
    }
  }


   eliminarFila(index: number) { 
    this.datosParaBorrar.push(this.datosGuardados[index]);
    this.datosGuardados.splice(index, 1);
    this.dataSource.data = this.datosGuardados;
    this.datosActualizadosParaBorrarRequisitos.emit(this.datosParaBorrar);
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
    this.datosActualizadosRequisitos.emit(this.datosGuardados);
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
      idRequisitoXOferta:filaSeleccionada.idRequisitoXOferta,
      idRequisito:filaSeleccionada.idRequisito,
      requeridoAdjunto:this.encontrarRequeridoAdjunto(filaSeleccionada.idRequisito),  
      observacion:filaSeleccionada.observacion,
     // nombrePlantillaRequisitoXOferta:filaSeleccionada.nombrePlantillaRequisitoXOferta,
    });
  }

  listarPlantillasRequisitosXOfertas(idOferta:number){
    this.plantillasrequisitosxofertasService.ConsultarXOferta(idOferta.toString()).subscribe({
      next: (lstplantillasrequisitosxofertas: PlantillasRequisitosXOfertas[]) => {
        this.lstPlantillasRequisitosXOfertas = lstplantillasrequisitosxofertas;
        //console.log(this.lstPlantillasRequisitosXOfertas);
        this.cargarPlantillasRequisitosXOfertasAdatosGuardados();
        
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
      let PlantillaRequisitoXOfertaAdjunto = new PlantillasRequisitosXOfertasAdjuntos;
      PlantillaRequisitoXOfertaAdjunto.idRequisitoXOferta=requisito.idRequisitoXOferta;
      PlantillaRequisitoXOfertaAdjunto.idOferta=requisito.idOferta;
      PlantillaRequisitoXOfertaAdjunto.idRequisito=requisito.idRequisito;
      PlantillaRequisitoXOfertaAdjunto.requeridoAdjunto= this.encontrarRequeridoAdjunto(requisito.idRequisito);
      PlantillaRequisitoXOfertaAdjunto.observacion=requisito.observacion;
      //PlantillaRequisitoXOfertaAdjunto.nombrePlantillaRequisitoXOferta=requisito.nombrePlantillaRequisitoXOferta;
      this.datosGuardados.push(PlantillaRequisitoXOfertaAdjunto);
      this.dataSource.data = this.datosGuardados;
      this.datosGuardados.map(dato => this.encontrarNombreRequisito(dato.idRequisito));
      
    });
    this.refrescarResumenPanel();
  }

}

