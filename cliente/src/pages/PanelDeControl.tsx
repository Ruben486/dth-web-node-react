import React, { useState } from 'react';

const PanelDeControl = () => {
    const [view, setView] = useState('both');

    const handleViewChange = (view) => {
        setView(view);
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Lado izquierdo</h2>
                </div>
                <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Lado derecho</h2>
                </div>
                <button onClick={() => handleViewChange('left')}>Ver lado izquierdo</button>
                <button onClick={() => handleViewChange('right')}>Ver lado derecho</button>
                <button onClick={() => handleViewChange('both')}>Ver ambos lados</button>
            </div>
            <div style={{ display: 'flex', height: '100vh', transition: 'all 3s ease', opacity: view === 'both' ? 1 : 0.5 }}>
                {(view === 'both' || view === 'left') && (
                    <div style={{ flex: 1, flexDirection: 'column', backgroundColor: 'cyan', transition: 'all 0.5s ease, opacity 0.5s ease', opacity: view === 'left' || view === 'both' ? 1 : 0 }}>
                        <section>
                            <img
                                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
                                alt="Lado izquierdo"
                            />
                            <h2>Lado izquierdo</h2>
                        </section>
                    </div>
                )}
                {(view === 'both' || view === 'right') && (
                    <div style={{ flex: 1, flexDirection: 'column', backgroundColor: 'pink', transition: 'all 0.5s ease, opacity 0.5s ease', opacity: view === 'right' || view === 'both' ? 1 : 0 }}>
                        <section>
                            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" alt="Lado derecho" />
                            <h2>Lado derecho</h2>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PanelDeControl;