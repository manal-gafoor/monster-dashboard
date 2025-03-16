import { Component } from '@angular/core';
import { tabIcons } from 'src/app/models/tab-icons';
import { Data, DATA } from 'src/app/models/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tabIcons = tabIcons;

  clarifiedData: Data[] = structuredClone(DATA)  // Data that will be loaded
  currentPage: number = 1;
  itemsPerPage: number = 6;

  sortColumn: string = 'name'; // Default sort by 'name'
  sortDirection: 'asc' | 'desc' = 'asc';

  // Search for the specified text in store names
  onSearchStore(searchText: string): void {
    this.clarifiedData = DATA.filter(row => {
      if (searchText) {
        return row['name'].toString().toLowerCase().startsWith(searchText.toLowerCase());
      }
      // If 'store' is not the specified column, no filtering applied
      return true;
    });
    this.currentPage = 1;
  }

  // Filter data based on selected country
  onFilterCountry(e: Event): void {
    let country = (e.target as HTMLInputElement).value;
    this.clarifiedData = DATA.filter(row => {
      if (country !== 'all') {
        return row['country'].toString().toLowerCase() === country.toLowerCase();
      }
      return true;
    });
    this.currentPage = 1;
  }

  // Sort filtered data based on selected column and direction
  sortedData() {
    let sortedData = [...this.clarifiedData].sort((a, b) => {
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
    return Math.ceil(this.clarifiedData.length / this.itemsPerPage);
  }

  // Toggle favourite status
  toggleFavourite(i: number) {
    this.clarifiedData[i].favourited = !this.clarifiedData[i].favourited;
  }
}
