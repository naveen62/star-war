import React from 'react';
import Character from './Character';
import uniqid from 'uniqid'


const CharacterList = props => (
    <div className='characters_container'>
        {props.characters.map((character) => <Character key={uniqid()}  {...character} />)}
    </div>
)

export default CharacterList;