import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter',
})
export class ListFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string, dummy: number): any {
    return !filterText
      ? list
      : list.filter(
          (item) =>
            item.name.toLowerCase().includes(filterText.toLowerCase())
        );
  }
}
