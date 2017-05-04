import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "Filter"
})

//scegliere un campo di cui fare il filtraggio 
//default: filtraggio: description 


export class DataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
     if (query) {
            return _.filter(array, row=>row.body.indexOf(query) > -1);
        }
        return array;
    }


   /* if(query===undefined) return array;

    return array.filter(function(good){
        return good.body.toLowerCase().includes(query.toLowerCase());

    })
    }*/
}