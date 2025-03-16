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
  data: Data[] = structuredClone(DATA);

  filteredData: Data[] = DATA;  // Data that matches the search query
  // searchText: string = '';  // Search input text
  searchColumn: string = 'name';  // The column to search in (default: name)
  currentPage: number = 1;  // Current page for pagination
  itemsPerPage: number = 5;  // Items per page for pagination

  sortColumn: string = 'name'; // Default sort by 'name'
  sortDirection: 'asc' | 'desc' = 'asc';

  // Calculate the total number of pages based on the filtered data
  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  paginatedData(searchText: string = '') {
    let filteredData = this.data.filter(row => {
      if (this.searchColumn) {
        // Apply filter to a specific column
        return row[this.searchColumn as keyof Data]
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase());
      }
      // If no column filter is selected, apply general search
      return Object.values(row)
        .some(value => value.toString().toLowerCase().includes(searchText.toLowerCase()));
    });

    // Sort filtered data based on selected column and direction
    let sortedData = [...filteredData].sort((a, b) => {
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

  // Trigger the search functionality on button click
  onSearch(searchText: string): void {
    // You can add additional logic here if needed (e.g., reset pagination on new search)
    this.filteredData = this.data.filter((item) => {
      if (this.searchColumn) {
        return item[this.searchColumn as keyof Data]
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase());
      }
      return Object.values(item)
        .some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()));
    });
    this.currentPage = 1; // Reset pagination to the first page after search
  }

  // Go to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Change page
  goToPage(page: number) {
    this.currentPage = page;
  }

  // Get the range of page numbers to display
  get pageNumbers() {
    const numbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  // Change sort column and direction
  changeSort(column: string) {
    if (this.sortColumn === column) {
      console.log('sortColumn === column', column);
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      console.log('sortColumn !== column', column);
      this.sortColumn = column;
      this.sortDirection = 'desc';
    }
  }

  // Toggle favourite status
  toggleFavourite(i: number) {
    this.data[i].favourited = !this.data[i].favourited;
  }
}
