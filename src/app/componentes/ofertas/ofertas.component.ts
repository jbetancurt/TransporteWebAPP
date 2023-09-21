import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ofertas, OfertasService } from '../ofertas';
import { EstadosDeLasOfertas, EstadosDeLasOfertasService } from '../estados-de-las-ofertas';
import { TiposOrientacionesDeLaOferta, TiposOrientacionesDeLaOfertaService } from '../tipos-orientaciones-de-la-oferta';
import { Empresas, EmpresasService } from '../empresas';
const myDate = new Date();

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})

export class OfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idOferta = 0;
  editar:boolean=false;
  myTimeString = myDate.toTimeString().slice(0, 5);
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstEstadosDeLasOfertas:EstadosDeLasOfertas[]=[];
  lstEmpresas:Empresas[]=[];
  lstTiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta[]=[];
  lstOfertas:Ofertas[]=[];
  //lstofertas:Ofertas[]=[];
  FGAgregarOfertas : FormGroup = this.formBuilder.group({      
    idOferta: new FormControl('0'),
    idEmpresa:new FormControl(0,Validators.required),
    idTipoOrientacionDeLaOferta:new FormControl(0,Validators.required),
    idEstadoDeLaOferta:new FormControl(0,Validators.required),
    tituloOferta:new FormControl('',Validators.required),
    descripcionOferta:new FormControl('',Validators.required),
    valorTotalDeLaOferta:new FormControl(0,Validators.required),
    fechaInicialOferta:new FormControl(new Date,Validators.required),
    fechaFinalOferta:new FormControl(new Date,Validators.required),
  });
   
  cargarNombresOfertas(ofertas:Ofertas){
    this.FGAgregarOfertas.patchValue({
      idOferta:ofertas.idOferta,
      idEmpresa:ofertas.idEmpresa,
      idTipoOrientacionDeLaOferta:ofertas.idTipoOrientacionDeLaOferta,
      idEstadoDeLaOferta:ofertas.idEstadoDeLaOferta,
      tituloOferta:ofertas.tituloOferta,
      descripcionOferta:ofertas.descripcionOferta,
      valorTotalDeLaOferta:ofertas.valorTotalDeLaOferta,
      fechaInicialOferta:ofertas.fechaInicialOferta,
      fechaFinalOferta:ofertas.fechaFinalOferta
    });
  }  
  

  
  public asignarid(idOferta:number){
    this.idOferta=idOferta;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idOferta>0)
    {
      this.ofertasService.Get(this.idOferta.toString()).subscribe({
        next : (dataofertas:Ofertas) => {
          this.cargarNombresOfertas(dataofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposOrientacionesDeLaOferta();
    this.listarEstadosDeLasOfertas();
    this.listarEmpresas();
    this.listarOfertas();
  }

  constructor(
    private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
    private estadosdelasofertasService: EstadosDeLasOfertasService,
    private empresasService: EmpresasService,
    private formBuilder: FormBuilder, 
    private ofertasService: OfertasService) { }

    
    listarTiposOrientacionesDeLaOferta(){ 
      this.tiposorientacionesdelaofertaService.GetAll().subscribe({
        next : (lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]) => { 
          this.lstTiposOrientacionesDeLaOferta=lsttiposorientacionesdelaoferta;
        }
      });
    }

  
    listarEstadosDeLasOfertas(){ 
      this.estadosdelasofertasService.GetAll().subscribe({
        next : (lstestadosdelasofertas:EstadosDeLasOfertas[]) => { 
          this.lstEstadosDeLasOfertas=lstestadosdelasofertas;
        }
      });
    }

    listarEmpresas(){
      this.empresasService.GetAll().subscribe({
        next : (lstempresas:Empresas[]) => {
          this.lstEmpresas=lstempresas;
        }
      });
    }

    listarOfertas(){
      this.ofertasService.GetAll().subscribe({
        next : (lstofertas:Ofertas[]) => {
          this.lstOfertas=lstofertas;
        }
      });
    }

      


    crearOfertas(){
      let ofertas : Ofertas = new Ofertas;
      
      ofertas.idOferta=this.FGAgregarOfertas.value.idOferta;
      ofertas.idEmpresa=this.FGAgregarOfertas.value.idEmpresa;
      ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarOfertas.value.idTipoOrientacionDeLaOferta;
      ofertas.idEstadoDeLaOferta=this.FGAgregarOfertas.value.idEstadoDeLaOferta;
      ofertas.tituloOferta=this.FGAgregarOfertas.value.tituloOferta;
      ofertas.descripcionOferta=this.FGAgregarOfertas.value.descripcionOferta;
      ofertas.valorTotalDeLaOferta=this.FGAgregarOfertas.value.valorTotalDeLaOferta;
      ofertas.fechaInicialOferta=this.FGAgregarOfertas.value.fechaInicialOferta;
      ofertas.fechaFinalOferta=this.FGAgregarOfertas.value.fechaFinalOferta;
            
      console.log(ofertas);      
     //suscrubimos la guardada de los datos en la tabla ofertas
      this.ofertasService.create(ofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarOfertas(idOferta:number){
      let ofertas : Ofertas = new Ofertas;
      
  //agregamos los datos del formulario a la tabla ofertas
      ofertas.idOferta=idOferta;
      ofertas.idEmpresa=this.FGAgregarOfertas.value.idEmpresa;
      ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarOfertas.value.idTipoOrientacionDeLaOferta;
      ofertas.idEstadoDeLaOferta=this.FGAgregarOfertas.value.idEstadoDeLaOferta;
      ofertas.tituloOferta=this.FGAgregarOfertas.value.tituloOferta;
      ofertas.descripcionOferta=this.FGAgregarOfertas.value.descripcionOferta;
      ofertas.valorTotalDeLaOferta=this.FGAgregarOfertas.value.valorTotalDeLaOferta;
      ofertas.fechaInicialOferta=this.FGAgregarOfertas.value.fechaInicialOferta;
      ofertas.fechaFinalOferta=this.FGAgregarOfertas.value.fechaFinalOferta;
           
      //suscrubimos la guardada de los datos en la tabla ofertas
      this.ofertasService.Edit(ofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgOfertas=this.FGAgregarOfertas.value;
      this.ofertasService.Get(fgOfertas.idOferta).subscribe({
        next : (dataofertas:Ofertas) => {
         if(dataofertas.idOferta<=0){
          
          this.crearOfertas();
         }
         else if(dataofertas.idOferta>0){
          
          this.editarOfertas(dataofertas.idOferta);
         }
         
        }
      }); 

    }
 
}
