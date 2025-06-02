import { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
    const [crew, setCrew] = useState([]);
    
    useEffect(() => {
        api.get('/crew')
        .then(res => setCrew(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Crew Members</h2>
            <ul>
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