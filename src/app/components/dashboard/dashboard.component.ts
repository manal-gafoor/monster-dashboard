import { Component, ElementRef, ViewChild } from '@angular/core';
import { tabIcons } from 'src/app/models/tab-icons';
import { Data, DATA } from 'src/app/models/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('table') table!: ElementRef;
  tabIcons = tabIcons;

  processedData: Data[] = structuredClone(DATA)  // Data that will be loaded
  currentPage: number = 1;
  itemsPerPage: number = 6;

  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngAfterViewInit() {
    setTimeout(() => {
      let tableHeight = this.table.nativeElement.offsetHeight - this.table.nativeElement.children[0].offsetHeight - this.table.nativeElement.children[2].offsetHeight;
      this.itemsPerPage = Math.floor(tableHeight / 75);
      console.log("table: ", this.itemsPerPage);
    }, 0);
  }

  // Search for the specified text in store names
  onSearchStore(searchText: string): void {
    this.processedData = DATA.filter(row => {
      if (searchText) {
        return row['name'].toString().toLowerCase().startsWith(searchText.toLowerCase());
      }
      // If search text is empty, no filtering applied
      return true;
    });
    this.currentPage = 1;
  }

  // Filter data based on selected country
  onFilterCountry(e: Event): void {
    let country = (e.target as HTMLInputElement).value;
    this.processedData = DATA.filter(row => {
      if (country !== 'all') {
        return row['country'].toString().toLowerCase() === country.toLowerCase();
      }
      return true;
    });
    this.currentPage = 1;
  }

  // Sort filtered data based on selected column and direction
  sortData() {
    let sortedData = [...this.processedData].sort((a, b) => {
      const aValue = a[this.sortColumn as keyof Data];
      const bValue = b[this.sortColumn as keyof Data];
      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    // Implement pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }

  // Change sort column and direction
  changeSort(column: string) {
    if (this.sortColumn === column) {
      console.log('sortColumn === column', column);
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      console.log('sortColumn !== column', column);
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  // Go to the previous page
  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  // Change page
  goToPage(page: number) {
    this.currentPage = page;
  }

  // Get the range of page numbers to display
  pageNumbers() {
    const numbers = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      numbers.push(i);
    }
    return numbers;
  }

  // Calculate the total number of pages based on the filtered data
  totalPages(): number {
    return Math.ceil(this.processedData.length / this.itemsPerPage);
  }

  // Toggle favourite status
  toggleFavourite(i: number) {
    this.processedData[i].favourited = !this.processedData[i].favourited;
  }
}
