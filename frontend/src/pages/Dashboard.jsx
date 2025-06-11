import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
    const [crew, setCrew] = useState([]);
    
    useEffect(() => {
        api.get('/crew')
        .then(res => setCrew(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Crew Members</h2>
            <ul className="crew-list">
                {crew.map(member => (
                    <li key={member.id}>
                        {member.name} - {member.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;