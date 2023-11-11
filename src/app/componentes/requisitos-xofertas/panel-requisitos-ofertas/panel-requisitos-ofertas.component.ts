import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { RequisitosXOfertas , RequisitosXOfertasAdjuntos, RequisitosXOfertasComponent, RequisitosXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Requisitos} from '../../requisitos/requisitos.model';
import { RequisitosService} from '../../requisitos/requisitos.service';
import { PlantillasRequisitosXOfertas, PlantillasRequisitosXOfertasAdjuntos } from '../../plantillas-requisitos-xofertas/plantillas-requisitos-xofertas.model';
import { PlantillasRequisitosXOfertasServices } from '../../plantillas-requisitos-xofertas/plantillas-requisitos-xofertas.service';

@Component({
  selector: 'app-panel-requisitos-ofertas',
  templateUrl: './panel-requisitos-ofertas.component.html',
  styleUrls: ['./panel-requisitos-ofertas.component.scss']
})

export class PanelRequisitosOfertasComponent implements OnInit {
  
  @Input() tituloDelPanel = "REQUISITOS";
  @Input() editaroAgregar = "agregar";
  @Input() indexEditar = 0;
  @Input() idOferta = 0;
  @Input() DatosParaCargarDeLaPlantilla:PlantillasRequisitosXOfertas[] = [];
  
  @Output() datosActualizadosRequisitos = new EventEmitter<RequisitosXOfertas[]>();
  @Output() datosActualizadosParaBorrarRequisitos = new EventEmitter<RequisitosXOfertas[]>();
  panelOpenState = false;
  openorclose =false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: RequisitosXOfertasAdjuntos[] = [];
  datosGuardadosPlantillasRequisitosXOfertas: PlantillasRequisitosXOfertas[] = [];
  datosParaBorrar:RequisitosXOfertasAdjuntos[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstRequisitosXOfertas:  RequisitosXOfertas[] = [];
  lstRequisitos: Requisitos[] = [];
  
  displayedColumns: string[] = [ 'idRequisito','requeridoAdjunto','observacion','editar', 'borrar'];

  
  
  idRequisito : number=0;
  requeridoAdjunto: boolean=false;
  observacion : string="";
 
  
  constructor 
  (
    private formBuilder: FormBuilder,
    private requisitosxofertasService: RequisitosXOfertasService,
    private requisitosService: RequisitosService,
    private plantillasrequisitosxofertasService: PlantillasRequisitosXOfertasServices
  ) { }
  
  ngOnInit() {
    this.FGAgregarRequisito.reset();
    this.listarRequisitos();
    this.listarRequisitosXOfertas(this.idOferta);    
    
  }

  FGAgregarRequisito : FormGroup = this.formBuilder.group({      
    idRequisitoXOferta : new FormControl('0'),
    idRequisito:new FormControl(0,Validators.required),
    requeridoAdjunto:false,
    observacion:new FormControl('')    
       
  });

   
  ngOnChanges(changes: SimpleChanges) {
    if (changes['DatosParaCargarDeLaPlantilla']) {
      if (this.DatosParaCargarDeLaPlantilla.length > 0){
        this.datosGuardados = [];
        this.datosGuardadosPlantillasRequisitosXOfertas = [];
        this.listarRequisitos();
        this.listarRequisitosXOfertas(this.idOferta); 
        this.listarPlantillasRequisitosXOfertas(this.DatosParaCargarDeLaPlantilla[0].idOferta);
        
      }
    }
  }


  refrescarResumenPanel(){    
    
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
      let RequisitoXOfertaAdjunto = new RequisitosXOfertasAdjuntos;
      RequisitoXOfertaAdjunto.idRequisitoXOferta=0;
      RequisitoXOfertaAdjunto.idOferta=this.idOferta;
      RequisitoXOfertaAdjunto.idRequisito=this.FGAgregarRequisito.value.idRequisito;
      RequisitoXOfertaAdjunto.requeridoAdjunto= this.encontrarRequeridoAdjunto(this.FGAgregarRequisito.value.idRequisito);
      RequisitoXOfertaAdjunto.observacion=this.FGAgregarRequisito.value.observacion;
      
      this.datosGuardados.push(RequisitoXOfertaAdjunto);
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
      
    });
  }

  listarRequisitosXOfertas(idOferta:number){
    this.requisitosxofertasService.ConsultarXOferta(idOferta.toString()).subscribe({
      next: (lstrequisitosxofertas: RequisitosXOfertas[]) => {
        this.lstRequisitosXOfertas = lstrequisitosxofertas;
        
        this.cargarRequisitosXOfertasAdatosGuardados();
      //  this.refrescarResumenPanel();
      }
    });
    this.refrescarResumenPanel();
    
  }

  listarPlantillasRequisitosXOfertas(idOfertaPlantillaRequisitosXOfertas:number){
    this.plantillasrequisitosxofertasService.ConsultarXOferta(idOfertaPlantillaRequisitosXOfertas.toString()).subscribe({
      next: (lstplantillasrequisitosxofertas: PlantillasRequisitosXOfertas[]) => {
        
        this.datosGuardadosPlantillasRequisitosXOfertas = lstplantillasrequisitosxofertas;
        for (let index = 0; index < this.datosGuardadosPlantillasRequisitosXOfertas.length; index++) {
          let RequisitosXOfertasAdjunto = new RequisitosXOfertasAdjuntos;
        //  RequisitosXOfertasAdjunto.idRequisitoXOferta =0;
        //  RequisitosXOfertasAdjunto.idOferta = this.idOferta;
          RequisitosXOfertasAdjunto.idRequisito = this.datosGuardadosPlantillasRequisitosXOfertas[index].idRequisito;
          RequisitosXOfertasAdjunto.observacion = this.datosGuardadosPlantillasRequisitosXOfertas[index].observacion;
          RequisitosXOfertasAdjunto.requeridoAdjunto = this.encontrarRequeridoAdjunto(this.datosGuardadosPlantillasRequisitosXOfertas[index].idRequisito);
          this.datosGuardados.push(RequisitosXOfertasAdjunto);
        }
        this.dataSource.data = this.datosGuardados;
        this.refrescarResumenPanel();
      }
    });
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



  cargarRequisitosXOfertasAdatosGuardados() {
    
    this.lstRequisitosXOfertas.forEach(requisito => {
      let RequisitoXOfertaAdjunto = new RequisitosXOfertasAdjuntos;
      RequisitoXOfertaAdjunto.idRequisitoXOferta=requisito.idRequisitoXOferta;
      RequisitoXOfertaAdjunto.idOferta=requisito.idOferta;
      RequisitoXOfertaAdjunto.idRequisito=requisito.idRequisito;
      RequisitoXOfertaAdjunto.requeridoAdjunto= this.encontrarRequeridoAdjunto(requisito.idRequisito);
      RequisitoXOfertaAdjunto.observacion=requisito.observacion;
      this.datosGuardados.push(RequisitoXOfertaAdjunto);
      this.dataSource.data = this.datosGuardados;
      this.datosGuardados.map(dato => this.encontrarNombreRequisito(dato.idRequisito));
      
    });
    this.refrescarResumenPanel();
  }

}

