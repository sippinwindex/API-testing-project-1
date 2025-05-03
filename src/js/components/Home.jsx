// src/js/components/Home.jsx
import React, { useState, useEffect } from "react";

// Correct path from src/js/components/ to src/styles/
import '../../styles/Home.css';

const Home = () => {
    // ... rest of your Home component code (useState, useEffect, fetch, return)
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://rickandmortyapi.com/api/character');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                if (data && data.results) {
                    setCharacters(data.results);
                } else {
                    throw new Error("Invalid data structure received from API");
                }
            } catch (error) {
                console.error("Fetching characters failed:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <div className="col-12 text-center"><h2>Loading characters...</h2></div>;
        }
        if (error) {
            return <div className="col-12 alert alert-danger text-center">Error: {error}</div>;
        }
        if (characters.length === 0) {
            return <div className="col-12 text-center"><p>No characters found.</p></div>;
        }
        return characters.map(character => (
            <div key={character.id} className="col-sm-6 col-md-4 col-lg-3 mb-4 character-card-wrapper">
                <div className="card h-100 shadow-sm">
                    <img
                        src={character.image}
                        className="card-img-top"
                        alt={character.name}
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{character.name}</h5>
                        <p className="card-text mb-1">
                            <span className={`fw-bold ${character.status === 'Alive' ? 'text-success' : character.status === 'Dead' ? 'text-danger' : 'text-secondary'}`}>
                                {character.status}
                            </span> - {character.species}
                        </p>
                        <p className="card-text text-muted small mb-1">
                           Origin: {character.origin.name}
                        </p>
                         <p className="card-text text-muted small mt-auto">
                           Last known location: {character.location.name}
                        </p>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Rick and Morty Characters</h1>
            <div className="row">
                {renderContent()}
            </div>
        </div>
    );
};

export default Home;