import {loadJSON} from './loaders.js';


export function loadProfile() {
    return function selectProfile(id) {
        return loadJSON('../players/profiles.json')
        .then(profile => {
            var selectedPlayer;
            profile.players.forEach(player => {
                if(player.id === id){
                    selectedPlayer = player;                
                }
            });
            return selectedPlayer;
        });
    
    }    
    
}

