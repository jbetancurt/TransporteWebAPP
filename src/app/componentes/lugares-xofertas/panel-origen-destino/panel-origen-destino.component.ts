import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LugaresXOfertas , LugaresXOfertasComponent, LugaresXOfertasService } from '../';
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
import { TiposDeLugaresXOfertas, TiposDeLugaresXOfertasService } from '../../tipos-de-lugares-xofertas';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantillasLugaresXOfertas, PlantillasLugaresXOfertasService } from '../../plantillas-lugares-xofertas';



@Component({
  selector: 'app-panel-origen-destino',
  templateUrl: './panel-origen-destino.component.html',
  styleUrls: ['./panel-origen-destino.component.scss']
})



export class PanelOrigenDestinoComponent implements OnInit   {
  lstCiudades : Ciudades[]=[];
  lstPersonas : Personas[]=[];
  lstLugaresXOfertas : LugaresXOfertas[]=[];
  panelOpenState = false;
  openorclose = false;
  mostrarErrorCamposIncompletos: boolean = false;
  nombres = "";
  
  editaroAgregar = "agregar";
  indexEditar = 0;

  descripcionPanelPorComas :  string = "";
  
  datosGuardados: LugaresXOfertas[] = [];
  datosQueLleganDePlantillaGuardados : PlantillasLugaresXOfertas[] = [];
  datosParaBorrar: LugaresXOfertas[] = [];
 // @Output() lugaresParaGuardarEnLaOferta: any[] = [];

  
  @Output() datosActualizadosLugares = new EventEmitter<LugaresXOfertas[]>();
  @Output() datosActualizadosParaBorrarLugares = new EventEmitter<LugaresXOfertas[]>();


  



  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  tituloDelPanel = "";
  @Input() idOferta = 0;
  
  @Input() idEmpresa = 0;
  @Input() DatosParaCargarDeLaPlantilla:PlantillasLugaresXOfertas[] = [];
  @Input() enumeradorTipoLugarXOferta = "";

  
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
    idLugarXOferta: new FormControl('0'),    
    idCiudad:new FormControl('',Validators.required),
    idPersona:new FormControl('',Validators.required),
    nombreLugarXOferta:new FormControl('',Validators.required),
    observacionLugarXOferta: new FormControl(''),
    telefonoLugarXOferta: new FormControl('',Validators.required),
    direccionLugarXOferta: new FormControl('',Validators.required),
    idTipoDeLugarXOferta:new FormControl(0,Validators.required),
     
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['DatosParaCargarDeLaPlantilla']) {
      if (this.DatosParaCargarDeLaPlantilla.length > 0){
        if (this.enumeradorTipoLugarXOferta != ""){
          this.datosGuardados = [];
          this.datosQueLleganDePlantillaGuardados = [];
     
          this.tiposDeLugaresXOfertasService.ConsultarPorEnum(this.enumeradorTipoLugarXOferta).subscribe({
            next : (objTiposDeLugaresXOfertas:TiposDeLugaresXOfertas) => { 
              if (objTiposDeLugaresXOfertas.idTipoDeLugarXOferta > 0){
                
                
                this.tituloDelPanel = objTiposDeLugaresXOfertas.nombreTipoDeLugarXOferta;
                this.idTipoDeLugarXOferta = objTiposDeLugaresXOfertas.idTipoDeLugarXOferta;
                
                this.listarCiudades();
                this.listarPersonas();
                this.listarPlantillasLugaresXOfertas(this.DatosParaCargarDeLaPlantilla[0].idOferta, this.idTipoDeLugarXOferta);
               
      
              }
            }
          });
        }
      }
      
    }  
  } 

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.FGAgregarLugares.get(field)?.valid && this.FGAgregarLugares.get(field)?.touched) ||
      (this.FGAgregarLugares.get(field)?.untouched)
    );
  }

  

guardarDatos() {
  if(!this.FGAgregarLugares.invalid){
    this.mostrarErrorCamposIncompletos=false;
    console.log('Formulario invalido');
    if(this.FGAgregarLugares.value.idCiudad == null || this.FGAgregarLugares.value.idPersona == null){
      alert("Debe seleccionar una Ciudad y un Contacto");
    }
    else{ 
      let LugarXOferta = new LugaresXOfertas; 
      LugarXOferta.idCiudad=this.FGAgregarLugares.value.idCiudad;
      LugarXOferta.idPersona= this.FGAgregarLugares.value.idPersona;
      LugarXOferta.idTipoDeLugarXOferta=this.idTipoDeLugarXOferta;
      
       
      LugarXOferta.nombreLugarXOferta= this.FGAgregarLugares.value.nombreLugarXOferta;  
      LugarXOferta.observacionLugarXOferta= this.FGAgregarLugares.value.observacionLugarXOferta;
      LugarXOferta.telefonoLugarXOferta= this.FGAgregarLugares.value.telefonoLugarXOferta;
      LugarXOferta.direccionLugarXOferta= this.FGAgregarLugares.value.direccionLugarXOferta;
    
      this.datosGuardados.push(LugarXOferta);
      this.dataSource.data = this.datosGuardados;
     
      this.datosActualizadosLugares.emit(this.datosGuardados);
      
  
      this.FGAgregarLugares.reset();
      
      this.refrescarResumenPanel();
    }  
  
  }
  else{
    this.mostrarErrorCamposIncompletos=true;
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
  this.datosActualizadosLugares.emit(this.datosGuardados);
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

  listarLugaresXOfertas(idOferta:number, idTipoDeLugarXOferta:number){
    this.lugaresxofertasService.ConsultarXOferta(idOferta.toString() , idTipoDeLugarXOferta.toString()).subscribe({
      next : (lstlugaresxofertas:LugaresXOfertas[]) => { 
        this.lstLugaresXOfertas=lstlugaresxofertas;
        this.datosGuardados = this.lstLugaresXOfertas;
        
        this.dataSource.data = this.datosGuardados;
        this.refrescarResumenPanel();
       
      }
    });
  }
  
  listarPlantillasLugaresXOfertas(idOfertaPlantillaLugares:number, idTipoDeLugarXOferta:number){
    this.plantillaslugaresxofertasService.ConsultarXOferta(idOfertaPlantillaLugares.toString() , idTipoDeLugarXOferta.toString()).subscribe({
      next : (lstplantillaslugaresxofertas:PlantillasLugaresXOfertas[]) => { 
        
        this.datosQueLleganDePlantillaGuardados = lstplantillaslugaresxofertas;
        console.log(this.datosQueLleganDePlantillaGuardados);
        console.log(this.datosQueLleganDePlantillaGuardados.length);
        for (let index = 0; index < this.datosQueLleganDePlantillaGuardados.length; index++) {
          let LugarXOferta = new LugaresXOfertas;
          LugarXOferta.idPersona = this.datosQueLleganDePlantillaGuardados[index].idPersona;
          LugarXOferta.idCiudad = this.datosQueLleganDePlantillaGuardados[index].idCiudad;
          LugarXOferta.idTipoDeLugarXOferta = this.datosQueLleganDePlantillaGuardados[index].idTipoDeLugarXOferta;
          LugarXOferta.nombreLugarXOferta = this.datosQueLleganDePlantillaGuardados[index].nombreLugarXOferta;
          LugarXOferta.observacionLugarXOferta = this.datosQueLleganDePlantillaGuardados[index].observacionLugarXOferta;
          LugarXOferta.telefonoLugarXOferta = this.datosQueLleganDePlantillaGuardados[index].telefonoLugarXOferta;
          LugarXOferta.direccionLugarXOferta = this.datosQueLleganDePlantillaGuardados[index].direccionLugarXOferta;
          console.log(LugarXOferta);
          this.datosGuardados.push(LugarXOferta);
        }
        
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
      
    if (this.enumeradorTipoLugarXOferta != ""){
     
      this.tiposDeLugaresXOfertasService.ConsultarPorEnum(this.enumeradorTipoLugarXOferta).subscribe({
        next : (objTiposDeLugaresXOfertas:TiposDeLugaresXOfertas) => { 
          if (objTiposDeLugaresXOfertas.idTipoDeLugarXOferta > 0){
            
            
            this.tituloDelPanel = objTiposDeLugaresXOfertas.nombreTipoDeLugarXOferta;
            this.idTipoDeLugarXOferta = objTiposDeLugaresXOfertas.idTipoDeLugarXOferta;
            
            this.listarCiudades();
            this.listarPersonas();
            this.listarLugaresXOfertas(this.idOferta, this.idTipoDeLugarXOferta);
            
  
          }
        }
      });
    }
    
  }
 
  constructor(
    private ciudadesService: CiudadesService,
    private personasService: PersonasService,
    private lugaresxofertasService: LugaresXOfertasService,
    private tiposDeLugaresXOfertasService: TiposDeLugaresXOfertasService,
    private plantillaslugaresxofertasService: PlantillasLugaresXOfertasService,
    private formBuilder: FormBuilder
    
    ) { }

    enviarDatos() : void{
      let fgLugaresXOfertas=this.FGAgregarLugares.value;
     
      
    }
  


}
