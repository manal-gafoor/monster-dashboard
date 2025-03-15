import { Component } from '@angular/core';
import { tabIcons } from 'src/app/models/tab-icons';
import { Data, data } from 'src/app/models/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tabIcons = tabIcons;
  data: Data[] = data;

   // Pagination variables
   currentPage: number = 1;
   pageSize: number = 5;
   totalItems: number = this.data.length;
 
   // Filter & Sort variables
  filterText: string = '';  // Search text
  filterColumn: string = ''; // Filter by specific column
  sortColumn: string = 'id'; // Default sort by 'id'
  sortDirection: 'asc' | 'desc' = 'asc';

  // Get the current page of data with filtering and sorting
  get paginatedData() {
    let filteredData = this.data.filter(row => {
      // If a column filter is selected, apply it
      if (this.filterColumn) {
        return row[this.filterColumn as keyof Data].toString().toLowerCase().includes(this.filterText.toLowerCase());
      }
      // If no column filter, apply general search across all columns
      return Object.values(row).some(value => value.toString().toLowerCase().includes(this.filterText.toLowerCase()));
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
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return sortedData.slice(startIndex, endIndex);
  }

  // Change page
  goToPage(page: number) {
    this.currentPage = page;
  }

  // Get the total number of pages
  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
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
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  // Toggle favourite status
  toggleFavourite(i: number) {
    this.data[i].favourited = !this.data[i].favourited;
  }
}
