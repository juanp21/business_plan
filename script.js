const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
        mode: 'index'
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Timeline'
            }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Client Count'
            },
            min: 0,
            max: 900
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                afterBody: function(tooltipItems) {
                    const dataIndex = tooltipItems[0].dataIndex;
                    const clients = tooltipItems[0].raw;
                    const revenuePerClient = [2700, 6900, 13500, 14500][Math.min(dataIndex, 3)];
                    const grossRevenue = (clients * revenuePerClient / 1000).toFixed(1);
                    const netRevenue = (clients * revenuePerClient * 0.29 / 1000).toFixed(1);
                    return [
                        `Gross Revenue: $${grossRevenue}K`,
                        `Net Revenue: $${netRevenue}K`
                    ];
                }
            }
        }
    }
};

const labels = ['Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027', 'Q1 2028', 'Q2 2028', 'Q3 2028', 'Q4 2028'];

const conservativeData = [1, 8, 15, 25, 40, 60, 85, 125, 199, 280, 390, 480, 583];
const aggressiveData = [1, 12, 25, 45, 70, 100, 125, 180, 280, 420, 580, 720, 850];

// Check if charts exist before creating them
if (document.getElementById('conservativeChart')) {
    // Conservative Chart with Network Effects Shading
    const conservativeCtx = document.getElementById('conservativeChart').getContext('2d');
    new Chart(conservativeCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Network Effects Area',
                    data: [null, null, null, null, null, null, null, null, 199, 280, 390, 480, 583],
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderColor: 'transparent',
                    fill: 'origin',
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    order: 2
                },
                {
                    label: 'Client Count',
                    data: conservativeData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    tension: 0.4,
                    fill: false,
                    order: 1
                }
            ]
        },
        options: chartOptions
    });
}

if (document.getElementById('aggressiveChart')) {
    // Aggressive Chart with Network Effects Shading
    const aggressiveCtx = document.getElementById('aggressiveChart').getContext('2d');
    new Chart(aggressiveCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Network Effects Area',
                    data: [null, null, null, null, null, null, 125, 180, 280, 420, 580, 720, 850],
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    borderColor: 'transparent',
                    fill: 'origin',
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    order: 2
                },
                {
                    label: 'Client Count',
                    data: aggressiveData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    tension: 0.4,
                    fill: false,
                    order: 1
                }
            ]
        },
        options: chartOptions
    });
}