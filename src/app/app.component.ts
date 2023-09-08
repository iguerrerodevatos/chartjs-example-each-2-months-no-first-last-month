import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  delayed: boolean;
  context03: CanvasRenderingContext2D;
  @ViewChild('canvas03') canvas03: ElementRef;

  ngAfterViewInit() {
    // Dynamically generate investment data and labels
    const investmentData = this.generateInvestmentData();
    const labels = this.generateLabels(investmentData);

    // Create the investment chart on canvas03
    this.createInvestmentChart(labels, investmentData);
  }

  // Function to generate investment data for 1 year with labels every 2 months
  generateInvestmentData() {
    const data = [];
    const startDate = new Date(); // Current date
    startDate.setMonth(startDate.getMonth() - 12); // Go back 1 year

    for (let i = 0; i <= 12; i += 2) {
      const currentDate = new Date(startDate);
      currentDate.setMonth(startDate.getMonth() + i);
      const investmentValue = Math.random() * 10000 + 5000;
      data.push({
        date: currentDate.toISOString().substr(0, 7), // Format as YYYY-MM
        value: investmentValue.toFixed(2), // Limit to 2 decimal places
      });
    }

    return data;
  }

  // Function to generate labels for the x-axis (Year and Month, every two months)
  generateLabels(data) {
    const labels = [];
    for (const item of data) {
      const dateParts = item.date.split('-');
      const year = dateParts[0];
      const month = dateParts[1];
      labels.push(`${this.getMonthName(month)} ${year}`);
    }
    return labels;
  }

  // Function to get month name from month number (e.g., '01' -> 'Jan')
  getMonthName(month) {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return monthNames[parseInt(month, 10) - 1];
  }

  // Function to create the investment chart
  createInvestmentChart(labels, data) {
    this.context03 = this.canvas03.nativeElement.getContext('2d');
    const canvas03 = new Chart(this.context03, {
      type: 'line', // You can change this to 'bar' or other chart types as needed
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Investment Value',
            data: data.map((item) => parseFloat(item.value)), // Convert value to float
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Year and Month',
            },
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Investment Value',
            },
          },
        },
      },
    });
  }
}