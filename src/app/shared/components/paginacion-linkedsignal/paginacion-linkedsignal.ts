import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Input,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { KeyColumns } from '@models/utils/columns.table';

@Component({
  selector: 'paginacion-linkedsignal',
  imports: [CommonModule],
  templateUrl: './paginacion-linkedsignal.html',
  styleUrl: './paginacion-linkedsignal.css',
})
export class PaginacionLinkedsignal<T> {
  titulo= input("")
  lista = input<T[]>();
  @Input() columns!: KeyColumns<T>[];
  updateItem = output<T>()
  deleteItem = output<T>()

  readonly itemsPerPage = signal(6);

  currentPage = linkedSignal<T[] | undefined, number>({
    source: () => this.lista() ?? undefined,
    computation: (source, previus) => {
      if (!source) return 0;
      if (previus && previus.value * this.itemsPerPage() < source.length) {
        console.log(source);
        return previus.value;
      }

      return 0;
    },
  });

  readonly paginatedLista = computed(() => {
    const alumnos = this.lista();
    if (!alumnos) return [];
    const start = this.currentPage() * this.itemsPerPage();
    return alumnos.slice(start, start + this.itemsPerPage());
  });

  readonly totalPage = computed(() => {
    const alumnos = this.lista();
    if (!alumnos) return 0;
    return Math.ceil(alumnos.length / this.itemsPerPage());
  });

  readonly pageNumbers = computed(() => {
    const total = this.totalPage();
    return Array.from({ length: total }, (_, i) => i);
  });

  nextPage() {
    if (this.currentPage() < this.totalPage() - 1) {
      this.currentPage.update((p) => p + 1);
    }
  }

  previusPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update((p) => p - 1);
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }

  editar(arg0: T) {
    this.updateItem.emit(arg0)
  }

  eliminar(arg0: T) {
    this.deleteItem.emit(arg0)
  }
}
