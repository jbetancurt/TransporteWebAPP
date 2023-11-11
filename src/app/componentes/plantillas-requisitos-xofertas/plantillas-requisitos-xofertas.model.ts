export class PlantillasRequisitosXOfertas {
    idRequisitoXOferta : number=0;
    idOferta : number=0;
    idRequisito : number=0;
    observacion : string="";
   // nombrePlantillaRequisitoXOferta : string="";
}

export class PlantillasRequisitosXOfertasAdjuntos extends PlantillasRequisitosXOfertas {
    requeridoAdjunto : boolean=false;
}

