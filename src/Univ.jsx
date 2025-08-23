import './Univ.css';
import { useState, useEffect } from 'react';

function Univ() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://universities.hipolabs.com/search?country=Korea,%20Republic%20of');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.log('Error!!!', error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className='unibox'>
            <h1>대학 목록 - Open API 예제</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={`${item.name}-${index}`}>
                        <p>
                            <a 
                                href={item.web_pages && item.web_pages[0]} 
                                target='_blank' 
                                rel="noopener noreferrer"
                            >
                                {item.name}
                            </a>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Univ