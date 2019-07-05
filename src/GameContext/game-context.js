import React from 'react';

const GameContext = React.createContext({
    table: [0,0,0,0,0,0,0,0,0,0],
    updateTable: () => {},
});

export default GameContext;