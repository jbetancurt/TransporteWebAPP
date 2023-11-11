import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PlantillasLugaresXOfertas , PlantillasLugaresXOfertasComponent, PlantillasLugaresXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Personas, PersonasService } from '../../personas';
import { Ciudades, CiudadesService } from '../../ciudades';
import { Empresas, EmpresasService } from '../../empresas';
import { Ofertas, OfertasService } from '../../ofertas';
import { LugaresXOfertas, LugaresXOfertasService } from '../../lugares-xofertas';
import { TiposDeLugaresXOfertas, TiposDeLugaresXOfertasService } from '../../tipos-de-lugares-xofertas';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-plantilla-origen-destino',
  templateUrl: './panel-plantilla-origen-destino.component.html',
  styleUrls: ['./panel-plantilla-origen-destino.component.scss']
})

export class PanelPlantillaOrigenDestinoComponent implements OnInit   {
  lstCiudades : Ciudades[]=[];
  lstPersonas : Personas[]=[];
  lstPlantillasLugaresXOfertas : PlantillasLugaresXOfertas[]=[];
  panelOpenState = false;
  openorclose = false;
  nombres = "";

  editaroAgregar = "agregar";
  indexEditar = 0;

  descripcionPanelPorComas :  string = "";
  
  datosGuardados: PlantillasLugaresXOfertas[] = [];
  datosParaBorrar: PlantillasLugaresXOfertas[] = [];
  
  @Output() datosActualizadosLugares = new EventEmitter<PlantillasLugaresXOfertas[]>();
  @Output() datosActualizadosParaBorrarLugares = new EventEmitter<PlantillasLugaresXOfertas[]>();
 
  tipoDeLugar: number=0;

  
  
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  tituloDelPanel = "";
  @Input() idOferta = 0;
  
  @Input() idEmpresa = 0;
  @Input() enumeradorTipoLugarXOferta = "";
  @Input() DatosParaCrearPlantillaOrigenPorOferta:LugaresXOfertas[]=[];
  @Input() DatosParaCrearPlantillaDestinoPorOferta:LugaresXOfertas[]=[];

 

  displayedColumns: string[] = ['idCiudad', 'idPersona','nombreLugarXOferta', 'direccionLugarXOferta', 'telefonoLugarXOferta','observacionLugarXOferta','editar', 'borrar'];
  // Define los datos de la tabla
  
  // Agrega el paginador si lo deseas
  //@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  
  idCiudad: number=0;
  idPersona: number=0; 
  //idEmpresa: number=0;
  idTipoDeLugarXOferta: number=0;
  ordenLugarXOferta: number=0;
  nombreLugarXOferta: string="";  
  observacionLugarXOferta: string="";
  telefonoLugarXOferta: string="";
  direccionLugarXOferta: string="";
  
  FGAgregarLugares : FormGroup = this.formBuilder.group({ 
    idLugarXOferta:new FormControl('0'),         
    idCiudad:new FormControl(0,Validators.required),
    idPersona:new FormControl(0,Validators.required),
    nombreLugarXOferta:new FormControl('',Validators.required),
   // nombrePlantillaLugarXOferta:new FormControl('',Validators.required),
    observacionLugarXOferta: new FormControl('',Validators.required),
    telefonoLugarXOferta: new FormControl('',Validators.required),
    direccionLugarXOferta: new FormControl('',Validators.required),
    idTipoDeLugarXOferta:new FormControl(0,Validators.required),
   // idEmpresa:new FormControl(0,Validators.required),
    
    //ordenLugarXOferta:new FormControl(0,Validators.required)
    
  });

  

guardarDatos() {
  if(this.FGAgregarLugares.value.idCiudad == null || this.FGAgregarLugares.value.idPersona == null){
    alert("Debe seleccionar una Ciudad y un Contacto");
  }
  else{ 
    let PlantillaLugarXOferta = new PlantillasLugaresXOfertas;

    PlantillaLugarXOferta.idPersona = this.FGAgregarLugares.value.idPersona;
    PlantillaLugarXOferta.idCiudad = this.FGAgregarLugares.value.idCiudad;
    PlantillaLugarXOferta.idTipoDeLugarXOferta = this.idTipoDeLugarXOferta;
    PlantillaLugarXOferta.nombreLugarXOferta = this.FGAgregarLugares.value.nombreLugarXOferta;
    //PlantillaLugarXOferta.nombrePlantillaLugarXOferta = this.FGAgregarLugares.value.nombrePlantillaLugarXOferta;
    PlantillaLugarXOferta.observacionLugarXOferta = this.FGAgregarLugares.value.observacionLugarXOferta;
    PlantillaLugarXOferta.telefonoLugarXOferta = this.FGAgregarLugares.value.telefonoLugarXOferta;
    PlantillaLugarXOferta.direccionLugarXOferta = this.FGAgregarLugares.value.direccionLugarXOferta;
     
    this.datosGuardados.push(PlantillaLugarXOferta);
    this.dataSource.data = this.datosGuardados;
    this.datosActualizadosLugares.emit(this.datosGuardados);

    this.FGAgregarLugares.reset();
    
    this.refrescarResumenPanel();
  }  
}

listarOrigenes(){
  this.datosGuardados.forEach(element => {
    if(element.idTipoDeLugarXOferta==2){
      this.datosTemporales.push(element);
    }
  });
  this.dataSource.data = this.datosTemporales;
}

listarDestinos(){
  this.datosGuardados.forEach(element => {
    if(element.idTipoDeLugarXOferta==3){
      this.datosTemporales.push(element);
    }
  });
  this.dataSource.data = this.datosTemporales;
}

eliminarFila(index: number) { 
  this.datosParaBorrar.push(this.datosGuardados[index]);
  this.datosGuardados.splice(index, 1);
  this.dataSource.data = this.datosGuardados;
  this.datosActualizadosParaBorrarLugares.emit(this.datosParaBorrar);
  this.FGAgregarLugares.reset();
  this.refrescarResumenPanel();
}

editarFila(index: number) {
  this.datosGuardados[index] = this.FGAgregarLugares.value;
  this.dataSource.data = this.datosGuardados;
  this.datosActualizadosLugares.emit(this.datosGuardados);
  this.FGAgregarLugares.reset();
  this.refrescarResumenPanel();
  this.editaroAgregar="agregar";
}

cancelarEdicion(){
  if (this.editaroAgregar="agregar"){
    this.FGAgregarLugares.reset();
    this.openorclose = !this.openorclose;
  }
  else{
    this.FGAgregarLugares.reset(); 
    this.editaroAgregar="agregar";
  }
} 


cargarDatosParaEditar(index: number) {
  
  this.editaroAgregar="editar";
  this.indexEditar=index;
  let filaSeleccionada = this.datosGuardados[index];
  this.FGAgregarLugares.patchValue({
    idLugarXOferta: filaSeleccionada.idLugarXOferta,
    idCiudad: filaSeleccionada.idCiudad,
    idPersona: filaSeleccionada.idPersona,
    idTipoDeLugarXOferta: filaSeleccionada.idTipoDeLugarXOferta,
    nombreLugarXOferta: filaSeleccionada.nombreLugarXOferta,
    //nombrePlantillaLugarXOferta: filaSeleccionada.nombrePlantillaLugarXOferta,
    observacionLugarXOferta: filaSeleccionada.observacionLugarXOferta,
    telefonoLugarXOferta: filaSeleccionada.telefonoLugarXOferta,
    direccionLugarXOferta: filaSeleccionada.direccionLugarXOferta
  });
  
}


  listarCiudades(){ 
    this.ciudadesService.GetAll().subscribe({
      next : (lstciudades:Ciudades[]) => { 
        this.lstCiudades=lstciudades;
      }
    });
  }

  encontrarNombreCiudad(idCiudad:number):string{
    let ciudad:string="";
    this.lstCiudades.forEach(element => {
      if(element.idCiudad==idCiudad){
        ciudad=element.nombreCiudad;
       
      }
    });
    return ciudad;
  }

  listarPersonas(){ 
    this.personasService.GetAll().subscribe({
      next : (lstpersonas:Personas[]) => { 
        this.lstPersonas=lstpersonas;
      }
    });
  }

  listarPlantillasLugaresXOfertas(idOferta:number, idTipoDeLugarXOferta:number){
    this.plantillaslugaresxofertasService.ConsultarXOferta(idOferta.toString() , idTipoDeLugarXOferta.toString()).subscribe({
      next : (lstplantillaslugaresxofertas:PlantillasLugaresXOfertas[]) => { 
        this.lstPlantillasLugaresXOfertas=lstplantillaslugaresxofertas;
        this.datosGuardados = this.lstPlantillasLugaresXOfertas;
        
        this.dataSource.data = this.datosGuardados;
        this.refrescarResumenPanel();
        
      }
    });
  }
  
  panelOpen(){
    this.openorclose = true
  }

  refrescarResumenPanel(){    
    this.descripcionPanelPorComas = this.datosGuardados.map(x => 
      "* " + x.nombreLugarXOferta + "(" + this.encontrarNombreCiudad(x.idCiudad) + ")").join(', ');
  
  }



  encontrarNombrePersona(idPersona:number):string{
    let persona:string="";
    this.lstPersonas.forEach(element => {
      if(element.idPersona==idPersona){
        persona=element.nombreCompletoPersona;
      }
    });
    return persona;
  }

  public editooagrego(editaroAgregar:string){
    this.editaroAgregar=editaroAgregar;
  }

  

  ngOnInit() {
    
    if (this.DatosParaCrearPlantillaOrigenPorOferta.length>0 || this.DatosParaCrearPlantillaDestinoPorOferta.length>0){
      if (this.DatosParaCrearPlantillaOrigenPorOferta.length>0){
        this.lstPlantillasLugaresXOfertas=this.DatosParaCrearPlantillaOrigenPorOferta;
        this.datosGuardados = this.lstPlantillasLugaresXOfertas;
        this.datosActualizadosLugares.emit(this.datosGuardados);
        this.dataSource.data = this.datosGuardados;
        this.tituloDelPanel = "ORIGEN";
        this.refrescarResumenPanel();
      }
      if (this.DatosParaCrearPlantillaDestinoPorOferta.length>0){
        this.lstPlantillasLugaresXOfertas=this.DatosParaCrearPlantillaDestinoPorOferta;
        this.datosGuardados = this.lstPlantillasLugaresXOfertas;
        this.datosActualizadosLugares.emit(this.datosGuardados);
        this.dataSource.data = this.datosGuardados;
        this.tituloDelPanel = "DESTINO";
        this.refrescarResumenPanel();
      }
           
      this.listarCiudades();
      this.listarPersonas();
      
    }
    else{
      if (this.enumeradorTipoLugarXOferta != ""){
      
        this.tiposDeLugaresXOfertasService.ConsultarPorEnum(this.enumeradorTipoLugarXOferta).subscribe({
          next : (objTiposDeLugaresXOfertas:TiposDeLugaresXOfertas) => { 
            if (objTiposDeLugaresXOfertas.idTipoDeLugarXOferta > 0){
              
              this.tituloDelPanel = objTiposDeLugaresXOfertas.nombreTipoDeLugarXOferta;
              this.idTipoDeLugarXOferta = objTiposDeLugaresXOfertas.idTipoDeLugarXOferta;
              this.listarCiudades();
              this.listarPersonas();
              this.listarPlantillasLugaresXOfertas(this.idOferta, this.idTipoDeLugarXOferta);
              
    
            }
          }
        });
      }
    }

  }
 
  constructor(
    private ciudadesService: CiudadesService,
    private personasService: PersonasService,
    private plantillaslugaresxofertasService: PlantillasLugaresXOfertasService,
    private tiposDeLugaresXOfertasService: TiposDeLugaresXOfertasService,
    private formBuilder: FormBuilder
    
    ) { }

    enviarDatos() : void{
      let fgPlantillasLugaresXOfertas=this.FGAgregarLugares.value;
     
      
    }
  


}
