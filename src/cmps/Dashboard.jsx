import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
    const [labels, setLabels] = useState([])
    const [counts, setCounts] = useState([])

    useEffect(() => {
        // Get all labels
        toyService.getToyLabels().then(labels => {
            setLabels(labels)
            // Get all toys and count toys per label
            toyService.query().then(toys => {
                const labelCounts = labels.map(label =>
                    toys.filter(toy => toy.labels.includes(label)).length
                )
                setCounts(labelCounts)
            })
        })
    }, [])

    const data = {
        labels,
        datasets: [
            {
                label: '# of Toys',
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(54, 162, 100, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(54, 162, 100, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <section className="my-chart">
            {labels.length > 0 && counts.length > 0 && <Doughnut data={data} />}
            {(labels.length === 0 || counts.length === 0) && <div>No chart data available</div>}
        </section>
    )
}