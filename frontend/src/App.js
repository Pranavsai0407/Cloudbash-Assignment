import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

function App() {
    const [url, setUrl] = useState('');
    const [topWords, setTopWords] = useState([]);
    const [topN, setTopN] = useState(0);

    const fetchWordFrequency = async () => {
        if(!url){
          alert("Please Enter the URL!");
        }
        try {
            const response = await axios.post('http://localhost:5000/fetch-word-frequency', {
                url,
                topN
            });
            setTopWords(response.data.words);
        } catch (error) {
            console.error('Error fetching word frequencies:', error);
        }
    };

    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            minHeight: '100vh',
            background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1>Word Frequency Finder</h1>
            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ padding: '8px', margin: '10px 0', borderRadius: '5px', width: '300px' }}
            />
            <input
                type="text"
                placeholder="Enter Number of most frequent words"
                value={topN}
                onChange={(e) => setTopN(e.target.value)}
                style={{ padding: '8px', margin: '10px 0', borderRadius: '5px', width: '150px' }}
            />
            <Button
                onClick={fetchWordFrequency}
                variant="contained"
            >
                Fetch Top Words
            </Button>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <table style={{ borderCollapse: 'collapse', width: '60%', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Word</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topWords.map((wordData, index) => (
                            <tr key={index} style={{ textAlign: 'center' }}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{wordData.word}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{wordData.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
